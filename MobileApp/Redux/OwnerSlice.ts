import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootState} from './Store'

const apiUrl = Constants.expoConfig?.extra?.apiUrl

interface Owner
{
    id: string
    name: string
    status: 'idle' | 'loading' | 'failed'
    error: string | null
    ownedReferendums: string[]
    ownsReferendumResult: boolean | null
}

const initialState: Owner = {
    id: '',
    name: '',
    status: 'idle',
    error: null,
    ownedReferendums: [],
    ownsReferendumResult: null,
}

export const addOwnerReferendum = createAsyncThunk(
    'owner/addOwnerReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/Owner/${id}/addReferendum`, {id: referendumId})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const removeReferendum = createAsyncThunk(
    'owner/removeReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/Owner/${id}/removeReferendum`, {id: referendumId})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const ownsReferendum = createAsyncThunk(
    'owner/ownsReferendum',
    async ({id, referendumId}: {id: string; referendumId: string}, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/Owner/${id}/ownsReferendum`, {id: referendumId})
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const getOwnedReferendums = createAsyncThunk(
    'owner/getOwnedReferendums',
    async (id: string, {rejectWithValue}) =>
    {
        try
        {
            const response = await axios.get(`${apiUrl}/Owner/${id}/getOwnedReferendums`)
            return response.data
        } catch (error: any)
        {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        clearOwnerState(state)
        {
            state.id = ''
            state.name = ''
            state.status = 'idle'
            state.error = null
            state.ownedReferendums = []
            state.ownsReferendumResult = null
            AsyncStorage.removeItem('owner')
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
                state.ownedReferendums = []
            })
            .addCase(getOwnedReferendums.fulfilled, (state, action) =>
            {
                state.status = 'idle'
                state.ownedReferendums = action.payload
            })
            .addCase(getOwnedReferendums.rejected, (state, action) =>
            {
                state.status = 'failed'
                state.error = action.payload as string
            })
    },
})

export const {clearOwnerState, setOwner} = ownerSlice.actions

export const selectOwnerId = (state: RootState) => state.owner.id
export const selectOwnerName = (state: RootState) => state.owner.name
export const selectOwnedReferendums = (state: RootState) => state.owner.ownedReferendums
export const selectOwnsReferendumResult = (state: RootState) => state.owner.ownsReferendumResult
export const selectOwnerStatus = (state: RootState) => state.owner.status
export const selectOwnerError = (state: RootState) => state.owner.error

export default ownerSlice.reducer