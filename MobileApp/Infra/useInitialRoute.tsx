import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootStackParamList} from './Navigation'

const useInitialRoute = () =>
{
    const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null)

    useEffect(() =>
    {
        const checkUserSession = async () =>
        {
            try
            {
                const userData = await AsyncStorage.getItem('user')
                if (userData)
                {
                    setInitialRouteName('LandingPage')
                } else
                {
                    setInitialRouteName('SignIn')
                }
            } catch (e)
            {
                console.error('Failed to load user session', e)
                setInitialRouteName('SignIn')
            }
        }

        checkUserSession()
    }, [])

    return initialRouteName
}

export default useInitialRoute