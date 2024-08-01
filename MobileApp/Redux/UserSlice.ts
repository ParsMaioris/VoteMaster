import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootState} from './Store'
import api from './Api'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface UserState
{
    users: any[],
    id: string,
    name: string
    status: 'idle' | 'loading' | 'failed'
    error: string | null
}

const initialState: UserState = {
    users: [],
    id: '',
    name: '',
    status: 'idle',
    error: null,
}

const saveTokenToStorage = async (token: string) =>
{
    try
    {
        await AsyncStorage.setItem('token', token)
    } catch (e)
    {
        console.error('Failed to save token to storage', e)
    }
}

export const fetchUserName = createAsyncThunk(
    'user/fetchUserName',
    async (userId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/user/${userId}`)
            if (response.status === 200)
            {
                const data = response.data.data
                saveTokenToStorage(data)
                return {id: data.id, name: data.name, status: response.status}
            } else
            {
                return rejectWithValue(response)
            }
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response?.data.message)
            {
                const errorMessage = error.response.data.message
                const errorDetail = error.response.data.detail

                return rejectWithValue(errorMessage || errorDetail || error)
            } else
            {
                return rejectWithValue('Failed to fetch user')
            }
        }
    }
)

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get('/user')
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const inviteUserToReferendum = createAsyncThunk(
    'user/inviteUserToReferendum',
    async ({userId, referendumId}: {userId: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/Owner/inviteUser`, {userId, referendumId})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState(state)
        {
            state.id = ''
            state.name = ''
            state.status = 'idle'
            state.error = null
        },
        setUser(state, action: PayloadAction<{id: string, name: string}>)
        {
            state.id = action.payload.id
            state.name = action.payload.name
        },
        setUserName(state, action: PayloadAction<string>)
        {
            state.name = action.payload
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchUserName.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchUserName.fulfilled, (state, action: PayloadAction<{id: string; name: string}>) =>
            {
                state.name = action.payload.name
                state.id = action.payload.id
                state.status = 'idle'
            })
            .addCase(fetchUserName.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            }).addCase(fetchUsers.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) =>
            {
                state.status = 'idle'
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(inviteUserToReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(inviteUserToReferendum.fulfilled, (state) =>
            {
                state.status = 'idle'
            })
            .addCase(inviteUserToReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const {resetUserState, setUser, setUserName} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name
export const selectUserId = (state: RootState) => state.user.id

export default userSlice.reducer