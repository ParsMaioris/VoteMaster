import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './Store'

interface EligibilityState
{
    userReferendums: Record<string, string[]>
    userRequests: Record<string, string[]>
}

const initialState: EligibilityState = {
    userReferendums: {
        '7a42f6fa-2fb7-4e1d-adcd-421743ac6ff0':
            ['7d918783-073f-4b99-bc38-0ee9a7762943', '7d918783-073f-4b99-bc38-0ee9a7762940']
    },
    userRequests: {},
}

const eligibilitySlice = createSlice({
    name: 'eligibility',
    initialState,
    reducers: {
        addReferendumToUser: (state, action: PayloadAction<{userId: string, referendumId: string}>) =>
        {
            const {userId, referendumId} = action.payload
            if (!state.userReferendums[userId])
            {
                state.userReferendums[userId] = []
            }
            if (!state.userReferendums[userId].includes(referendumId))
            {
                state.userReferendums[userId].push(referendumId)
            }
        },
        removeReferendumFromUser: (state, action: PayloadAction<{userId: string, referendumId: string}>) =>
        {
            const {userId, referendumId} = action.payload
            if (state.userReferendums[userId])
            {
                state.userReferendums[userId] = state.userReferendums[userId].filter(id => id !== referendumId)
            }
        },
        addUserRequest: (state, action: PayloadAction<{userId: string, referendumId: string}>) =>
        {
            const {userId, referendumId} = action.payload
            if (!state.userRequests[userId])
            {
                state.userRequests[userId] = []
            }
            if (!state.userRequests[userId].includes(referendumId))
            {
                state.userRequests[userId].push(referendumId)
            }
        },
    },
})

export const {addReferendumToUser, removeReferendumFromUser, addUserRequest} = eligibilitySlice.actions

export default eligibilitySlice.reducer

export const selectUserReferendums = (state: RootState, userId: string) => state.eligibility.userReferendums[userId] || []
export const selectUserRequests = (state: RootState, userId: string) => state.eligibility.userRequests[userId] || []