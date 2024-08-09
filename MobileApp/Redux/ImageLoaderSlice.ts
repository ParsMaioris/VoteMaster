import {createSlice} from '@reduxjs/toolkit'

interface ImageLoaderState
{
    loadedImages: Record<string, boolean>
}

const initialState: ImageLoaderState = {
    loadedImages: {},
}

const imageLoaderSlice = createSlice({
    name: 'imageLoader',
    initialState,
    reducers: {
        markImageAsLoaded: (state, action) =>
        {
            const {source} = action.payload
            state.loadedImages[source] = true
        },
    },
})

export const {markImageAsLoaded} = imageLoaderSlice.actions
export default imageLoaderSlice.reducer