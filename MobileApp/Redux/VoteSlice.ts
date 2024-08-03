import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './Store'
import api from '../Infra/Api'

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
    yesVotes: number
    noVotes: number
    totalVotes: number
}

const initialState: VoteState = {
    status: 'idle',
    error: null,
    votes: [],
    yesVotes: 0,
    noVotes: 0,
    totalVotes: 0,
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
    async (userId: string, {rejectWithValue}) =>
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

export const fetchYesVotesByReferendum = createAsyncThunk(
    'vote/fetchYesVotesByReferendum',
    async (referendumId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Vote/referendum/${referendumId}/yes`)
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const fetchNoVotesByReferendum = createAsyncThunk(
    'vote/fetchNoVotesByReferendum',
    async (referendumId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Vote/referendum/${referendumId}/no`)
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const fetchTotalVotesByReferendum = createAsyncThunk(
    'vote/fetchTotalVotesByReferendum',
    async (referendumId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Vote/referendum/${referendumId}/total`)
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
            state.yesVotes = 0
            state.noVotes = 0
            state.totalVotes = 0
        },
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
            .addCase(fetchYesVotesByReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchYesVotesByReferendum.fulfilled, (state, action: PayloadAction<number>) =>
            {
                state.status = 'idle'
                state.yesVotes = action.payload
            })
            .addCase(fetchYesVotesByReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(fetchNoVotesByReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchNoVotesByReferendum.fulfilled, (state, action: PayloadAction<number>) =>
            {
                state.status = 'idle'
                state.noVotes = action.payload
            })
            .addCase(fetchNoVotesByReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(fetchTotalVotesByReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchTotalVotesByReferendum.fulfilled, (state, action: PayloadAction<number>) =>
            {
                state.status = 'idle'
                state.totalVotes = action.payload
            })
            .addCase(fetchTotalVotesByReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectVoteStatus = (state: RootState) => state.vote.status
export const selectVoteError = (state: RootState) => state.vote.error
export const selectVotesByUserId = (state: RootState) => state.vote.votes
export const selectYesVotes = (state: RootState) => state.vote.yesVotes
export const selectNoVotes = (state: RootState) => state.vote.noVotes
export const selectTotalVotes = (state: RootState) => state.vote.totalVotes
export const resetVoteState = voteSlice.actions.resetVoteState

export default voteSlice.reducer