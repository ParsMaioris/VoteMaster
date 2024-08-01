import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './Store'
import api from './Api'

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
            const response = await api.post('/Vote/add', payload)
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const fetchVotesByUserId = createAsyncThunk(
    'vote/fetchVotesByUserId',
    async (userId, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Vote/user/${userId}`)
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
        resetVoteState(state)
        {
            state.votes = []
            state.status = 'idle'
            state.error = null
        }
    },
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
export const resetVoteState = voteSlice.actions.resetVoteState

export default voteSlice.reducer