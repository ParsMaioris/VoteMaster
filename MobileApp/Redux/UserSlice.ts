import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
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

export const fetchUserName = createAsyncThunk(
    'user/fetchUserName',
    async (userId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/user/${userId}`)
            if (response.status === 200)
            {
                return {id: response.data.result.id, name: response.data.result.name, status: response.status}
            } else
            {
                return rejectWithValue(response.status)
            }
        } catch (error)
        {
            return rejectWithValue('Failed to fetch user')
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
        },
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

export const {clearUserName} = userSlice.actions

export const selectUserName = (state: RootState) => state.user.name
export const selectUserId = (state: RootState) => state.user.id

export default userSlice.reducer