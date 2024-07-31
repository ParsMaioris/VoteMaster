import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import {RootState} from './Store'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface Referendum
{
    id: string
    title: string
    key: string
}

interface ReferendumState
{
    referendums: Referendum[]
    referendumMap: {[key: string]: Referendum}
    status: 'idle' | 'loading' | 'failed'
    error: string | null
}

const initialState: ReferendumState = {
    referendums: [],
    referendumMap: {
        '7d918783-073f-4b99-bc38-0ee9a7762943': {
            id: '7d918783-073f-4b99-bc38-0ee9a7762943',
            title: 'Infrastructure Referendum',
            key: 'infrastructure',
        },
        'a68d20bb-483b-4f34-889e-94e9054007f7': {
            id: 'a68d20bb-483b-4f34-889e-94e9054007f7',
            title: 'Education Referendum',
            key: 'education',
        },
        '7d918783-073f-4b99-bc38-0ee9a7762940': {
            id: '7d918783-073f-4b99-bc38-0ee9a7762940',
            title: 'Healthcare Referendum',
            key: 'healthcare',
        },
    },
    status: 'idle',
    error: null,
}

export const getReferendumById = createAsyncThunk(
    'referendum/getReferendumById',
    async (id: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/Referendum/${id}`)
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
                return rejectWithValue(error.response.data.detail || 'Failed to fetch referendum')
            } else if (axios.isAxiosError(error) && error.request)
            {
                return rejectWithValue('No response from server')
            } else
            {
                return rejectWithValue('Failed to fetch referendum')
            }
        }
    }
)

const referendumSlice = createSlice({
    name: 'referendum',
    initialState,
    reducers: {
        resetReferendumState(state)
        {
            state.referendums = []
            state.referendumMap = {}
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(getReferendumById.pending, (state) =>
            {
                state.status = 'loading'
            })
            .addCase(getReferendumById.fulfilled, (state, action: PayloadAction<Referendum>) =>
            {
                const referendum = action.payload
                state.referendumMap[referendum.id] = referendum
                state.status = 'idle'
            })
            .addCase(getReferendumById.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectReferendums = (state: RootState) => state.referendum.referendums
export const selectReferendumStatus = (state: RootState) => state.referendum.status
export const selectReferendumError = (state: RootState) => state.referendum.error
export const selectReferendumById = (state: RootState, id: string) => state.referendum.referendumMap[id]
export const resetReferendumState = referendumSlice.actions.resetReferendumState

export default referendumSlice.reducer