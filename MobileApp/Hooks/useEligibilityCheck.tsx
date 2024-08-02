import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {checkEligibility, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {AppDispatch} from '../Redux/Store'
import {referendums} from '../Mocks/MockReferendums'

const useEligibilityCheck = (userId: string) =>
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
            let eligible = false

            try
            {
                setLoading(true)

                for (const referendum of referendums)
                {
                    const eligibilityKey = `${userId}-${referendum.id}`

                    if (eligibilityMap[eligibilityKey] == undefined)
                    {
                        const eligibilityCheckResult = await dispatch(checkEligibility({
                            userId,
                            userName: 'currentUserName',
                            referendumId: referendum.id,
                            referendumTitle: referendum.title,
                        })).unwrap()

                        if (eligibilityCheckResult.isEligible)
                        {
                            eligible = true
                        }
                    } else if (eligibilityMap[eligibilityKey])
                    {
                        eligible = true
                    }
                }

                setIsEligibleForAny(eligible)
            } catch (error: any)
            {
                setFetchError(error.message)
            } finally
            {
                setLoading(false)
            }
        }

        fetchEligibility()
    }, [dispatch, userId, referendums, eligibilityMap])

    return {isEligibleForAny, loading, fetchError, status, eligibilityMap}
}

export default useEligibilityCheck