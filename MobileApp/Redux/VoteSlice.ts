import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import {RootState} from './Store'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface Vote
{
    id: string
    userId: string
    referendumId: string
    voteChoice: boolean
}

interface VoteState
{
    status: 'idle' | 'loading' | 'failed'
    error: string | null
    votes: Vote[]
}

const initialState: VoteState = {
    status: 'idle',
    error: null,
    votes: [],
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
                return rejectWithValue(response.statusText)
            }
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to submit vote')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to submit vote')
            }
        }
    }
)

export const fetchVotesByUserId = createAsyncThunk(
    'vote/fetchVotesByUserId',
    async (userId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/Vote/user/${userId}`)
            if (response.status === 200)
            {
                return response.data
            } else
            {
                return rejectWithValue(response.statusText)
            }
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to fetch votes')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to fetch votes')
            }
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
            .addCase(fetchVotesByUserId.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchVotesByUserId.fulfilled, (state, action: PayloadAction<Vote[]>) =>
            {
                state.status = 'idle'
                state.votes = action.payload
            })
            .addCase(fetchVotesByUserId.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectVoteStatus = (state: RootState) => state.vote.status
export const selectVoteError = (state: RootState) => state.vote.error
export const selectVotesByUserId = (state: RootState) => state.vote.votes

export default voteSlice.reducer