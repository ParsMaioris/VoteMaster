import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {RootState} from './Store'
import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface EligibilityState
{
    userReferendums: Record<string, string[]>
    eligibilityMap: {[key: string]: boolean}
    userRequests: Record<string, string[]>
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: EligibilityState = {
    userReferendums: {
        '7a42f6fa-2fb7-4e1d-adcd-421743ac6ff0': [
            '7d918783-073f-4b99-bc38-0ee9a7762943',
            '7d918783-073f-4b99-bc38-0ee9a7762940'
        ]
    },
    eligibilityMap: {},
    userRequests: {},
    status: 'idle',
    error: null,
}

interface EligibilityPayload
{
    userId: string
    userName: string
    referendumId: string
    referendumTitle: string
}

export const addEligibility = createAsyncThunk(
    'eligibility/addEligibility',
    async (payload: EligibilityPayload, {rejectWithValue}) =>
    {
        console.log('addEligibility', payload)

        try
        {
            const response = await axios.post(`${apiUrl}/eligibility/add`, payload)
            return response.data
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to add eligibility')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to add eligibility')
            }
        }
    }
)

export const removeEligibility = createAsyncThunk(
    'eligibility/removeEligibility',
    async (payload: EligibilityPayload, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/eligibility/remove`, payload)
            return response.data
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to remove eligibility')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to remove eligibility')
            }
        }
    }
)

interface CheckEligibilityPayload
{
    userId: string
    userName: string
    referendumId: string
    referendumTitle: string
}

export const checkEligibility = createAsyncThunk(
    'eligibility/checkEligibility',
    async (payload: CheckEligibilityPayload, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/eligibility/check`, {
                params: payload
            })
            return {...payload, isEligible: response.data.data}
        } catch (error: any)
        {
            if (axios.isAxiosError(error) && error.response)
            {
                return rejectWithValue(error.response.data.detail || 'Failed to check eligibility')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to check eligibility')
            }
        }
    }
)

const eligibilitySlice = createSlice({
    name: 'eligibility',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(addEligibility.fulfilled, (state, action: PayloadAction<EligibilityPayload>) =>
            {
                const {userId, referendumId} = action.payload
                if (!state.userReferendums[userId])
                {
                    state.userReferendums[userId] = []
                }
                if (!state.userReferendums[userId].includes(referendumId))
                {
                    state.userReferendums[userId].push(referendumId)
                }
            })
            .addCase(removeEligibility.fulfilled, (state, action: PayloadAction<EligibilityPayload>) =>
            {
                const {userId, referendumId} = action.payload
                if (state.userReferendums[userId])
                {
                    state.userReferendums[userId] = state.userReferendums[userId].filter(id => id !== referendumId)
                }
            })
            .addCase(checkEligibility.pending, (state) =>
            {
                state.status = 'loading'
            })
            .addCase(checkEligibility.fulfilled, (state, action) =>
            {
                state.status = 'succeeded'
                const {userId, referendumId, isEligible} = action.payload
                state.eligibilityMap[`${userId}-${referendumId}`] = isEligible
            })
            .addCase(checkEligibility.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    }
})

export default eligibilitySlice.reducer

export const selectUserReferendums = (state: RootState, userId: string) => state.eligibility.userReferendums[userId] || []
export const selectUserRequests = (state: RootState, userId: string) => state.eligibility.userRequests[userId] || []
export const selectEligibilityStatus = (state: RootState) => state.eligibility.status
export const selectEligibilityError = (state: RootState) => state.eligibility.error
export const selectEligibility = (state: RootState) => state.eligibility.eligibilityMap