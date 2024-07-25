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
            key: 'infrastructure'
        },
        'a68d20bb-483b-4f34-889e-94e9054007f7': {
            id: 'a68d20bb-483b-4f34-889e-94e9054007f7',
            title: 'Education Referendum',
            key: 'education'
        },
        '7d918783-073f-4b99-bc38-0ee9a7762940': {
            id: '7d918783-073f-4b99-bc38-0ee9a7762940',
            title: 'Healthcare Referendum',
            key: 'healthcare'
        }
    },
    status: 'idle',
    error: null,
}

export const fetchReferendums = createAsyncThunk(
    'referendum/fetchReferendums',
    async (_, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/api/Referendums`)
            if (response.status === 200)
            {
                return response.data
            } else
            {
                return rejectWithValue(response.status)
            }
        } catch (error)
        {
            return rejectWithValue('Failed to fetch referendums')
        }
    }
)

const referendumSlice = createSlice({
    name: 'referendum',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchReferendums.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchReferendums.fulfilled, (state, action: PayloadAction<Referendum[]>) =>
            {
                state.referendums = action.payload
                state.status = 'idle'
            })
            .addCase(fetchReferendums.rejected, (state, action) =>
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

export default referendumSlice.reducer