import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootState} from './Store'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface UserState
{
    id: string
    name: string
    status: 'idle' | 'loading' | 'failed'
    error: string | null
}

const initialState: UserState = {
    id: '',
    name: '',
    status: 'idle',
    error: null,
}

const saveUserToStorage = async (id: string, name: string) =>
{
    try
    {
        await AsyncStorage.setItem('user', JSON.stringify({id, name}))
    } catch (e)
    {
        console.error('Failed to save user to storage', e)
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
                saveUserToStorage(data.id, data.name)
                return {id: data.id, name: data.name, status: response.status}
            } else
            {
                return rejectWithValue(response.statusText)
            }
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to fetch user')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to fetch user')
            }
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserName(state)
        {
            state.name = ''
            state.id = ''
            AsyncStorage.removeItem('user')
        },
        setUser(state, action: PayloadAction<{id: string, name: string}>)
        {
            state.id = action.payload.id
            state.name = action.payload.name
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
            })
    },
})

export const {clearUserName, setUser} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name
export const selectUserId = (state: RootState) => state.user.id

export default userSlice.reducer