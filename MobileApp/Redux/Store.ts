import {configureStore} from '@reduxjs/toolkit'
import userSlice from './UserSlice'
import voteSlice from './VoteSlice'
import referendumSlice from './ReferendumSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        vote: voteSlice,
        referendum: referendumSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store