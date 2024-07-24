import {configureStore} from '@reduxjs/toolkit'
import userSlice from './UserSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store