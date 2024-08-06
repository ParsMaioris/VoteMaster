import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserEligibleReferendums, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {AppDispatch, RootState} from '../Redux/Store'
import {getAllReferendumDetails, selectReferendums} from '../Redux/ReferendumSlice'

const useEligibilityCheck = (userId: string, userName: string) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const status = useSelector(selectEligibilityStatus) as 'idle' | 'loading' | 'succeeded' | 'failed'
    const [isEligibleForAny, setIsEligibleForAny] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const referendums = useSelector(selectReferendums)

    useEffect(() =>
    {
        const fetchEligibility = async () =>
        {
            try
            {
                setLoading(true)
                if (Object.keys(eligibilityMap).length === 0)
                {
                    await dispatch(fetchUserEligibleReferendums({userId, userName})).unwrap()
                }
            } catch (error: any)
            {
                setFetchError(error)
            } finally
            {
                setLoading(false)
            }
        }

        fetchEligibility()
    }, [dispatch, userId, userName])

    useEffect(() =>
    {
        const checkEligibilityInMap = async () =>
        {
            let eligible = false

            if (referendums.length === 0)
            {
                await dispatch(getAllReferendumDetails())
            }

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

        if (status === 'succeeded')
        {
            checkEligibilityInMap()
        }
    }, [eligibilityMap, status, userId])

    return {isEligibleForAny, loading, fetchError, status, eligibilityMap}
}

export default useEligibilityCheck