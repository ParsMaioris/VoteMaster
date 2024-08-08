import {configureStore} from '@reduxjs/toolkit'
import userSlice from './UserSlice'
import voteSlice from './VoteSlice'
import referendumSlice from './ReferendumSlice'
import ownerSlice from './OwnerSlice'
import EligibilitySlice from './EligibilitySlice'
import referendumRequestSlice from './ReferendumRequestSlice'
import errorHandlingMiddleware from '../Infra/ErrorHandlingMiddleware'
import gracefulLoggingMiddleware from '../Infra/gracefulLoggingMiddleware'

const store = configureStore({
    reducer: {
        user: userSlice,
        vote: voteSlice,
        referendum: referendumSlice,
        owner: ownerSlice,
        eligibility: EligibilitySlice,
        referendumRequest: referendumRequestSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorHandlingMiddleware, gracefulLoggingMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store