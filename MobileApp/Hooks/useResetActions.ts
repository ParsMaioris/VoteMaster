import {useEffect} from 'react'
import {useAppDispatch} from '../Redux/Hooks'
import {resetEligibility} from '../Redux/EligibilitySlice'
import {resetReferendumState} from '../Redux/ReferendumSlice'
import {resetVoteState} from '../Redux/VoteSlice'

export const useResetActions = (removeUserFromStorage: () => void) =>
{
    const dispatch = useAppDispatch()

    useEffect(() =>
    {
        dispatch(resetEligibility())
        dispatch(resetReferendumState())
        dispatch(resetVoteState())
        removeUserFromStorage()
    }, [])
}