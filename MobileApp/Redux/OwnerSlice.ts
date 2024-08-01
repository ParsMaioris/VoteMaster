import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './Store'
import api from './Api'

interface Owner
{
    id: string
    name: string
    status: 'idle' | 'loading' | 'failed'
    error: string | null
    ownedReferendumIds: string[]
    ownsReferendumResult: boolean | null
}

const initialState: Owner = {
    id: '',
    name: '',
    status: 'idle',
    error: null,
    ownedReferendumIds: [],
    ownsReferendumResult: null,
}

export const addOwnerReferendum = createAsyncThunk(
    'owner/addOwnerReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post(`/Owner/${id}/addReferendum`, {id: referendumId})
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const removeReferendum = createAsyncThunk(
    'owner/removeReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post(`/Owner/${id}/removeReferendum`, {id: referendumId})
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const ownsReferendum = createAsyncThunk(
    'owner/ownsReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.post(`/Owner/${id}/ownsReferendum`, {id: referendumId})
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

export const getOwnedReferendums = createAsyncThunk(
    'owner/getOwnedReferendums',
    async (id, {rejectWithValue}) =>
    {
        try
        {
            const response = await api.get(`/Owner/${id}/getOwnedReferendums`)
            return response.data
        } catch (error)
        {
            return rejectWithValue(error)
        }
    }
)

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        resetOwenrState(state)
        {
            state.id = ''
            state.name = ''
            state.status = 'idle'
            state.error = null
            state.ownedReferendumIds = []
            state.ownsReferendumResult = null
        },
        setOwner(state, action: PayloadAction<{id: string; name: string}>)
        {
            state.id = action.payload.id
            state.name = action.payload.name
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(addOwnerReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(addOwnerReferendum.fulfilled, (state) =>
            {
                state.status = 'idle'
            })
            .addCase(addOwnerReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(removeReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
            })
            .addCase(removeReferendum.fulfilled, (state) =>
            {
                state.status = 'idle'
            })
            .addCase(removeReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(ownsReferendum.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
                state.ownsReferendumResult = null
            })
            .addCase(ownsReferendum.fulfilled, (state, action) =>
            {
                state.status = 'idle'
                state.ownsReferendumResult = action.payload
            })
            .addCase(ownsReferendum.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(getOwnedReferendums.pending, (state) =>
            {
                state.status = 'loading'
                state.error = null
                state.ownedReferendumIds = []
            })
            .addCase(getOwnedReferendums.fulfilled, (state, action) =>
            {
                state.status = 'idle'
                state.ownedReferendumIds = action.payload
            })
            .addCase(getOwnedReferendums.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const {resetOwenrState, setOwner} = ownerSlice.actions

export const selectOwnerId = (state: RootState) => state.owner.id
export const selectOwnerName = (state: RootState) => state.owner.name
export const selectOwnedReferendumIds = (state: RootState) => state.owner.ownedReferendumIds
export const selectOwnsReferendumResult = (state: RootState) => state.owner.ownsReferendumResult
export const selectOwnerStatus = (state: RootState) => state.owner.status
export const selectOwnerError = (state: RootState) => state.owner.error

export default ownerSlice.reducer