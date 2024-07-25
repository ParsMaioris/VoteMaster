import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import {RootState} from './Store'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface VoteState
{
    status: 'idle' | 'loading' | 'failed'
    error: string | null
}

const initialState: VoteState = {
    status: 'idle',
    error: null,
}

interface VotePayload
{
    userId: string
    userName: string
    referendumId: string
    referendumTitle: string
    voteChoice: boolean
}

export const submitVote = createAsyncThunk(
    'vote/submitVote',
    async (payload: VotePayload, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/Vote/add`, payload)
            if (response.status === 200)
            {
                return response.data
            } else
            {
                return rejectWithValue(response.status)
            }
        } catch (error)
        {
            return rejectWithValue('Failed to submit vote')
        }
    }
)

const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(submitVote.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(submitVote.fulfilled, (state) =>
            {
                state.status = 'idle'
            })
            .addCase(submitVote.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectVoteStatus = (state: RootState) => state.vote.status
export const selectVoteError = (state: RootState) => state.vote.error

export default voteSlice.reducer