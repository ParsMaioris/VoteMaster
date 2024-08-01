import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios, {AxiosError} from 'axios'
import Constants from 'expo-constants'
import {RootState} from './Store'

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
            const response = await axios.post(`${apiUrl}/ReferendumRequest/create`, payload)
            if (response.status === 200)
            {
                return response.data
            } else
            {
                return rejectWithValue(response.statusText)
            }
        } catch (error: AxiosError | any)
        {
            console.log(error)

            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to submit referendum request')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to submit referendum request')
            }
        }
    }
)

export const fetchReferendumRequestsByUserId = createAsyncThunk(
    'referendumRequest/fetchReferendumRequestsByUserId',
    async (userId: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/ReferendumRequest/user/${userId}`)
            if (response.status === 200)
            {
                return response.data.data
            } else
            {
                return rejectWithValue(response.statusText)
            }
        } catch (error: AxiosError | any)
        {
            let errorMessage = 'An unexpected error occurred.'
            if (axios.isAxiosError(error) && error.response)
            {
                if (error.response.status === 404)
                {
                    errorMessage = 'Referendum requests not found.'
                } else if (error.response.status === 500)
                {
                    errorMessage = 'Internal server error.'
                } else
                {
                    errorMessage = `Error: ${error.response.status}`
                }
            } else if (axios.isAxiosError(error) && error.request)
            {
                errorMessage = 'Network error. Please try again.'
            } else
            {
                errorMessage = 'Error in setting up the request.'
            }
            return rejectWithValue(errorMessage)
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