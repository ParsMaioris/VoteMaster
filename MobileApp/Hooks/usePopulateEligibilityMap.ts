import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../Redux/Store'
import {getAllReferendumDetails} from '../Redux/ReferendumSlice'
import {checkEligibility, fetchUserEligibleReferendums, selectEligibility} from '../Redux/EligibilitySlice'
import {setUser} from '../Redux/UserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const usePopulateEligibilityMap = () =>
{
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const userId = useSelector((state: RootState) => state.user.id)
    const referendums = useSelector((state: RootState) => state.referendum.referendums)
    const referendumStatus = useSelector((state: RootState) => state.referendum.status)
    const eligibilityMap = useSelector(selectEligibility)

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
                    console.error('Failed to fetch user data from AsyncStorage', error)
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
    }, [referendumStatus, dispatch, userId, referendums])

    return loading
}

export default usePopulateEligibilityMap