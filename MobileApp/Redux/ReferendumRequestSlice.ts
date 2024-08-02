import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import Constants from 'expo-constants'
import {RootState} from './Store'
import api from '../Infra/Api'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface ReferendumRequest
{
    id: string
    userId: string
    question: string
    details: string
    referendumDate: string
}

interface ReferendumRequestState
{
    status: 'idle' | 'loading' | 'failed'
    error: string | null
    requests: ReferendumRequest[]
}

const initialState: ReferendumRequestState = {
    status: 'idle',
    error: null,
    requests: [],
}

interface ReferendumRequestPayload
{
    userId: string
    question: string
    details: string
    referendumDate: string
}

export const submitReferendumRequest = createAsyncThunk(
    'referendumRequest/submitReferendumRequest',
    async (payload: ReferendumRequestPayload, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post('/ReferendumRequest/create', payload)
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const fetchReferendumRequestsByUserId = createAsyncThunk(
    'referendumRequest/fetchReferendumRequestsByUserId',
    async (userId, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/ReferendumRequest/user/${userId}`)
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

const referendumRequestSlice = createSlice({
    name: 'referendumRequest',
    initialState,
    reducers: {
        resetReferendumRequestState(state)
        {
            state.requests = []
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(submitReferendumRequest.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(submitReferendumRequest.fulfilled, (state) =>
            {
                state.status = 'idle'
            })
            .addCase(submitReferendumRequest.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(fetchReferendumRequestsByUserId.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchReferendumRequestsByUserId.fulfilled, (state, action: PayloadAction<ReferendumRequest[]>) =>
            {
                state.status = 'idle'
                state.requests = action.payload
            })
            .addCase(fetchReferendumRequestsByUserId.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectReferendumRequestStatus = (state: RootState) => state.referendumRequest.status
export const selectReferendumRequestError = (state: RootState) => state.referendumRequest.error
export const selectReferendumRequestsByUserId = (state: RootState) => state.referendumRequest.requests
export const {resetReferendumRequestState} = referendumRequestSlice.actions

export default referendumRequestSlice.reducer