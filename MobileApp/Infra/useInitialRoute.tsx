import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootStackParamList} from './Navigation'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../Redux/UserSlice'
import {getAllReferendumDetails, selectReferendumStatus} from '../Redux/ReferendumSlice'

const useInitialRoute = () =>
{
    const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null)
    const dispatch = useDispatch()
    const status = useSelector(selectReferendumStatus)

    useEffect(() =>
    {
        const checkUserSession = async () =>
        {
            try
            {
                const userData = await AsyncStorage.getItem('user')
                if (userData)
                {
                    const parsedUser = JSON.parse(userData)
                    dispatch(setUser(parsedUser))
                    setInitialRouteName('LandingPage')
                } else
                {
                    setInitialRouteName('SignIn')
                }

                if (status === 'idle')
                {
                    dispatch(getAllReferendumDetails())
                } else if (status === 'failed')
                {
                    setInitialRouteName('ErrorScreen')
                }
            } catch (e)
            {
                setInitialRouteName('SignIn')
            }
        }

        checkUserSession()
    }, [dispatch])

    return initialRouteName
}

export default useInitialRoute