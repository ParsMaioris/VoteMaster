import {useState} from 'react'
import {useAsyncStorage} from '../Hooks/useAsyncStorage'
import {useFormInput} from '../Hooks/useFormInput'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {Keyboard} from 'react-native'
import CryptoJS from 'crypto-js'
import api from '../Infra/Api'
import {useResetActions} from './useResetActions'

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

export const useSigningHandler = (initialEmail: string, initialPassword: string, navigation: SignInScreenNavigationProp) =>
{
    const {email, setEmail, password, setPassword, errorMessage, setErrorMessage} = useFormInput(initialEmail, initialPassword)
    const {saveUserToStorage, removeUserFromStorage} = useAsyncStorage()
    const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle')
    useResetActions(removeUserFromStorage)

    const handleSignIn = async () =>
    {
        Keyboard.dismiss()

        if (!email || !password)
        {
            setErrorMessage('Please enter a valid email and password.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try
        {
            const passwordHash = CryptoJS.SHA256(password).toString()
            const signInResponse = await api.post('/usermanager/signin', {email, passwordHash})
            const {userId, token} = signInResponse.data.data

            await saveUserToStorage({id: userId, name: '', token, passwordHash, email})

            const fetchUsersResponse = await api.get('/user')
            const users = fetchUsersResponse.data.data

            const currentUser = users.find((user: any) => user.id === userId)

            if (currentUser)
            {
                await saveUserToStorage({id: currentUser.id, name: currentUser.name, token, passwordHash, email})
                setStatus('succeeded')
                navigateToLandingPage(currentUser)
            } else
            {
                setErrorMessage('User not found.')
                setStatus('failed')
            }
        } catch (error)
        {
            setErrorMessage('Invalid email or password.')
            setStatus('failed')
        }
    }

    const navigateToLandingPage = (userData: any) =>
    {
        navigation.reset({
            index: 0,
            routes: [{name: 'LandingPage', params: {userId: userData.id, userName: userData.name}}],
        })
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        handleSignIn,
        status,
        setErrorMessage,
    }
}