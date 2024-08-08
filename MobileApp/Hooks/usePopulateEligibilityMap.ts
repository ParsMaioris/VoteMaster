import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../Redux/Store'
import {getAllReferendumDetails, selectReferendumStatus, selectReferendumError} from '../Redux/ReferendumSlice'
import {checkEligibility, selectEligibility, selectEligibilityStatus, selectEligibilityError} from '../Redux/EligibilitySlice'
import {setUser} from '../Redux/UserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const usePopulateEligibilityMap = () =>
{
    const [loading, setLoading] = useState(true)
    const [userError, setUserError] = useState<string | null>(null)
    const dispatch = useDispatch()
    const userId = useSelector((state: RootState) => state.user.id)
    const referendums = useSelector((state: RootState) => state.referendum.referendums)
    const referendumStatus = useSelector(selectReferendumStatus)
    const referendumError = useSelector(selectReferendumError)
    const eligibilityMap = useSelector(selectEligibility)
    const eligibilityStatus = useSelector(selectEligibilityStatus)
    const eligibilityError = useSelector(selectEligibilityError)

    useEffect(() =>
    {
        const fetchUserAndReferendums = async () =>
        {
            let id = userId
            if (!id)
            {
                try
                {
                    const userData = await AsyncStorage.getItem('user')
                    if (userData)
                    {
                        const parsedUser = JSON.parse(userData)
                        dispatch(setUser(parsedUser))
                        id = parsedUser.id
                    }
                } catch (error)
                {
                    setUserError('Failed to fetch user data from local storage')
                    return
                }
            }

            if (id)
            {
                await dispatch(getAllReferendumDetails())
            }
        }
        fetchUserAndReferendums()
    }, [dispatch, userId])

    useEffect(() =>
    {
        const checkAllReferendums = async () =>
        {
            if (referendumStatus === 'succeeded' && userId)
            {
                const promises = referendums.map(referendum =>
                {
                    const eligibilityKey = `${userId}-${referendum.referendumId}`
                    if (eligibilityMap[eligibilityKey] === undefined)
                    {
                        const payload = {
                            userId,
                            userName: 'currentUserName',
                            referendumId: referendum.referendumId,
                            referendumTitle: referendum.title
                        }
                        return dispatch(checkEligibility(payload))
                    }
                    return null
                }).filter(promise => promise !== null)

                await Promise.all(promises)
                setLoading(false)
            }
        }

        checkAllReferendums()
    }, [referendumStatus, dispatch, userId, referendums, eligibilityMap])

    return {loading, userError, referendumStatus, referendumError, eligibilityStatus, eligibilityError}
}

export default usePopulateEligibilityMap