import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootStackParamList} from './Navigation'
import {useDispatch} from 'react-redux'
import {setUser} from '../Redux/UserSlice'

const useInitialRoute = () =>
{
    const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null)
    const dispatch = useDispatch()

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
                    setInitialRouteName('Registration')
                }
            } catch (e)
            {
                setInitialRouteName('ErrorScreen')
            }
        }

        checkUserSession()
    }, [dispatch])

    return initialRouteName
}

export default useInitialRoute