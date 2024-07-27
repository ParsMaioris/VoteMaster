import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'
import {addReferendumToUser as addReferendum, removeReferendumFromUser as removeReferendum, addUserRequest} from '../Redux/EligibilitySlice'

const useEligibility = () =>
{
    const dispatch = useDispatch()
    const eligibility = useSelector((state: RootState) => state.eligibility)

    const getReferendumsByUserId = (userId: string): string[] =>
    {
        return eligibility.userReferendums[userId] || []
    }

    const isUserEligibleForReferendum = (userId: string, referendumId: string): boolean =>
    {
        const referendums = getReferendumsByUserId(userId)
        return referendums.includes(referendumId)
    }

    const addReferendumToUser = (userId: string, referendumId: string): void =>
    {
        dispatch(addReferendum({userId, referendumId}))
    }

    const removeReferendumFromUser = (userId: string, referendumId: string): void =>
    {
        dispatch(removeReferendum({userId, referendumId}))
    }

    const addUserRequestForReferendum = (userId: string, referendumId: string): void =>
    {
        dispatch(addUserRequest({userId, referendumId}))
    }

    const isReferendumPendingForUser = (userId: string, referendumId: string): boolean =>
    {
        return eligibility.userRequests[userId]?.includes(referendumId) ?? false
    }

    return {
        getReferendumsByUserId,
        isUserEligibleForReferendum,
        addReferendumToUser,
        removeReferendumFromUser,
        addUserRequestForReferendum,
        isReferendumPendingForUser,
    }
}

export default useEligibility