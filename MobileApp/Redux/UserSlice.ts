import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootState} from './Store'
import api from '../Infra/Api'
import {set} from 'date-fns'

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

export const addUser = createAsyncThunk(
    'user/addUser',
    async ({name, passwordHash, email}: {name: string; passwordHash: string; email: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/usermanager/add`, {name, passwordHash, email})
            return response.data.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post('/usermanager/delete', {userId})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async ({userId, newPasswordHash}: {userId: string; newPasswordHash: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post('/usermanager/update/password', {userId, newPasswordHash})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateEmail = createAsyncThunk(
    'user/updateEmail',
    async ({userId, newEmail}: {userId: string; newEmail: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post('/usermanager/update/email', {userId, newEmail})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateUserName = createAsyncThunk(
    'user/updateUserName',
    async ({userId, newName}: {userId: string; newName: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post('/usermanager/update/name', {userId, newName})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const signInUser = createAsyncThunk(
    'user/signInUser',
    async ({email, passwordHash}: {email: string; passwordHash: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/usermanager/signin`, {email, passwordHash})

            saveTokenToStorage(response.data.data.token)
            return response.data.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
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
            .addCase(addUser.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addUser.fulfilled, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'idle'
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
            // Delete User
            .addCase(deleteUser.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state: UserState, action: PayloadAction<string>) =>
            {
                state.status = 'idle'
                state.users = state.users.filter((user) => user.id !== action.payload)
            })
            .addCase(deleteUser.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
            // Update Password
            .addCase(updatePassword.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updatePassword.fulfilled, (state: UserState) =>
            {
                state.status = 'idle'
            })
            .addCase(updatePassword.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
            // Update Email
            .addCase(updateEmail.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateEmail.fulfilled, (state: UserState) =>
            {
                state.status = 'idle'
            })
            .addCase(updateEmail.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
            // Update User Name
            .addCase(updateUserName.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateUserName.fulfilled, (state: UserState) =>
            {
                state.status = 'idle'
            })
            .addCase(updateUserName.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
            // Sign In User
            .addCase(signInUser.pending, (state: UserState) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(signInUser.fulfilled, (state: UserState, action: PayloadAction<boolean>) =>
            {
                state.status = 'idle'
                if (action.payload)
                {
                    // Handle successful sign-in, e.g., update state
                } else
                {
                    state.error = 'Invalid email or password'
                }
            })
            .addCase(signInUser.rejected, (state: UserState, action: PayloadAction<any>) =>
            {
                state.status = 'failed'
                state.error = action.payload
            })
    },
})

export const {resetUserState, setUser} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name
export const selectUserId = (state: RootState) => state.user.id

export default userSlice.reducer