import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserEligibleReferendums, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {AppDispatch, RootState} from '../Redux/Store'
import {getAllReferendumDetails, selectReferendums, selectReferendumStatus} from '../Redux/ReferendumSlice'

const useEligibilityCheck = (userId: string, userName: string) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const eligibilityStatus = useSelector(selectEligibilityStatus) as 'idle' | 'loading' | 'succeeded' | 'failed'
    const referendumStatus = useSelector(selectReferendumStatus) as 'idle' | 'loading' | 'succeeded' | 'failed'
    const [isEligibleForAny, setIsEligibleForAny] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const referendums = useSelector(selectReferendums)

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                setLoading(true)

                if (referendumStatus === 'idle')
                {
                    await dispatch(getAllReferendumDetails()).unwrap()
                }

                if (eligibilityStatus === 'idle')
                {
                    await dispatch(fetchUserEligibleReferendums({userId, userName})).unwrap()
                }
            } catch (error: any)
            {
                setFetchError(error.message || 'An error occurred')
            } finally
            {
                setLoading(false)
            }
        }

        fetchData()
    }, [dispatch, userId, userName, referendumStatus, eligibilityStatus, eligibilityMap])

    useEffect(() =>
    {
        const checkEligibilityInMap = () =>
        {
            let eligible = false

            for (const referendum of referendums)
            {
                const eligibilityKey = `${userId}-${referendum.referendumId}`
                if (eligibilityMap[eligibilityKey])
                {
                    eligible = true
                    break
                }
            }

            setIsEligibleForAny(eligible)
        }

        if (eligibilityStatus === 'succeeded' && referendumStatus === 'succeeded')
        {
            checkEligibilityInMap()
        }
    }, [eligibilityMap, eligibilityStatus, referendumStatus, userId, referendums])

    return {isEligibleForAny, loading, fetchError, eligibilityStatus, referendumStatus, eligibilityMap}
}

export default useEligibilityCheck