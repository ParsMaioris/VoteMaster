import {useEffect} from 'react'
import {useAppDispatch} from '../Redux/Hooks'
import {resetEligibility} from '../Redux/EligibilitySlice'
import {resetReferendumState} from '../Redux/ReferendumSlice'
import {resetVoteState} from '../Redux/VoteSlice'
import {resetUserState} from '../Redux/UserSlice'
import {resetOwenrState} from '../Redux/OwnerSlice'
import {resetReferendumRequestState} from '../Redux/ReferendumRequestSlice'

export const useResetActions = (removeUserFromStorage: () => void) =>
{
    const dispatch = useAppDispatch()

    useEffect(() =>
    {
        dispatch(resetEligibility())
        dispatch(resetReferendumState())
        dispatch(resetVoteState())
        dispatch(resetUserState())
        dispatch(resetOwenrState())
        dispatch(resetReferendumRequestState())
        removeUserFromStorage()
    }, [])
}