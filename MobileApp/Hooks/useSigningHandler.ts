import {useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../Redux/Hooks'
import {signInUser, fetchUsers, setUser} from '../Redux/UserSlice'
import CryptoJS from 'crypto-js'
import {useAsyncStorage} from '../Hooks/useAsyncStorage'
import {useResetActions} from '../Hooks/useResetActions'
import {useFormInput} from '../Hooks/useFormInput'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

export const useSigningHandler = (initialEmail: string, initialPassword: string, navigation: SignInScreenNavigationProp) =>
{
    const {email, setEmail, password, setPassword, errorMessage, setErrorMessage} = useFormInput(initialEmail, initialPassword)
    const {saveUserToStorage, removeUserFromStorage} = useAsyncStorage()
    const dispatch = useAppDispatch()
    const {status} = useAppSelector((state) => state.user)

    useResetActions(removeUserFromStorage)

    const handleSignIn = async () =>
    {
        if (!email || !password)
        {
            setErrorMessage('Please enter a valid email and password.')
            return
        }

        const passwordHash = CryptoJS.SHA256(password).toString()
        const resultAction = await dispatch(signInUser({email, passwordHash}))

        if (signInUser.fulfilled.match(resultAction) && resultAction.payload)
        {
            const {userId, token} = resultAction.payload
            await saveUserToStorage({id: userId, name: '', token, passwordHash, email})
            const allUsers = await dispatch(fetchUsers())
            const currentUser = allUsers.payload.find((user: any) => user.id === userId)

            if (currentUser)
            {
                saveUserToStorage({id: currentUser.id, name: currentUser.name, token, passwordHash, email})
                dispatch(setUser(currentUser))
                setErrorMessage('')
                navigateToLandingPage(currentUser)
            } else
            {
                setErrorMessage('User not found.')
            }
        } else
        {
            setErrorMessage('Invalid email or password.')
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