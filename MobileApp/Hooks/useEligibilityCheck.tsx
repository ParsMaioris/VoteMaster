import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserEligibleReferendums, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {AppDispatch} from '../Redux/Store'
import {referendums} from '../Mocks/MockReferendums'

const useEligibilityCheck = (userId: string, userName: string) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const status = useSelector(selectEligibilityStatus) as 'idle' | 'loading' | 'succeeded' | 'failed'
    const [isEligibleForAny, setIsEligibleForAny] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)

    useEffect(() =>
    {
        const fetchEligibility = async () =>
        {
            try
            {
                setLoading(true)
                await dispatch(fetchUserEligibleReferendums({userId, userName})).unwrap()
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
        const checkEligibilityInMap = () =>
        {
            let eligible = false

            for (const referendum of referendums)
            {
                const eligibilityKey = `${userId}-${referendum.id}`
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