import {configureStore} from '@reduxjs/toolkit'
import userSlice from './UserSlice'
import voteSlice from './VoteSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        vote: voteSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store