import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './Store'
import api from '../Infra/Api'

export interface Referendum
{
    referendumId: string
    title: string
    description: string
    image: string | number
    key?: string
    publicationDate?: string
    endTime?: string
}

interface ReferendumState
{
    referendums: Referendum[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ReferendumState = {
    referendums: [],
    status: 'idle',
    error: null,
}

export const getReferendumById = createAsyncThunk(
    'referendum/getReferendumById',
    async (id: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Referendum/${id}`)
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const getAllReferendumDetails = createAsyncThunk(
    'referendum/getAllReferendumDetails',
    async (_, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get('/Referendum/all')
            return response.data.data
        } catch (error)
        {
            return rejectWithValue(error)
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
                state.status = 'idle'
            })
            .addCase(getReferendumById.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(getAllReferendumDetails.pending, (state) =>
            {
                state.status = 'loading'
            })
            .addCase(getAllReferendumDetails.fulfilled, (state, action: PayloadAction<Referendum[]>) =>
            {
                const getImageSource = (imagePath: string) =>
                {
                    switch (imagePath)
                    {
                        case '../assets/infrastructureimage.png':
                            return require('../assets/infrastructureimage.png')
                        case '../assets/educationimage.png':
                            return require('../assets/educationimage.png')
                        case '../assets/healthcareimage.png':
                            return require('../assets/healthcareimage.png')
                        default:
                            return {uri: imagePath}
                    }
                }

                state.referendums = action.payload.map(referendum => ({
                    ...referendum,
                    image: getImageSource(referendum.image as string)
                }))
                state.status = 'succeeded'
            })
            .addCase(getAllReferendumDetails.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const selectReferendums = (state: RootState) => state.referendum.referendums
export const selectReferendumStatus = (state: RootState) => state.referendum.status
export const selectReferendumError = (state: RootState) => state.referendum.error
export const selectReferendumById = (state: RootState, id: string) =>
    state.referendum.referendums.find((referendum) => referendum.referendumId === id)
export const resetReferendumState = referendumSlice.actions.resetReferendumState

export default referendumSlice.reducer