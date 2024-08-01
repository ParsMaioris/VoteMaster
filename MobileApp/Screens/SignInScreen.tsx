import React, {useState} from 'react'
import {View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {useAppDispatch, useAppSelector} from '../Redux/Hooks'
import {fetchUserName, fetchUsers, setUserName} from '../Redux/UserSlice'
import {LinearGradient} from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

type Props = {
    navigation: SignInScreenNavigationProp
}

const SignInScreen: React.FC<Props> = ({navigation}) =>
{
    const [userId, setUserId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()
    const {status} = useAppSelector((state) => state.user)

    const saveUserToStorage = async (id: string, name: string) =>
    {
        try
        {
            await AsyncStorage.setItem('user', JSON.stringify({id, name}))
        } catch (e)
        {
            console.error('Failed to save user to storage', e)
        }
    }

    const handleSignIn = async () =>
    {
        if (!isUserIdValid(userId))
        {
            setErrorMessage('Please enter a valid User ID.')
            return
        }

        const resultAction = await dispatch(fetchUserName(userId))
        const allUsers = await dispatch(fetchUsers())
        const currentUser = allUsers.payload.find((user) => user.id === userId)

        if (currentUser)
        {
            saveUserToStorage(currentUser.id, currentUser.name)
        }

        dispatch(setUserName(currentUser.name))

        if (fetchUserName.fulfilled.match(resultAction) && isFetchUserNameFulfilled(resultAction))
        {
            const {id, name} = resultAction.payload
            setErrorMessage('')
            navigateToLandingPage({id, name})
        } else
        {
            setErrorMessage(resultAction.payload as string)
        }
    }

    const isFetchUserNameFulfilled = (
        action: ReturnType<typeof fetchUserName.fulfilled>
    ): action is ReturnType<typeof fetchUserName.fulfilled> & {payload: {id: any; name: any; status: number}} =>
    {
        return action.payload !== undefined && 'name' in action.payload
    }

    const isUserIdValid = (id: string): boolean =>
    {
        const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        return guidRegex.test(id.trim())
    }

    const navigateToLandingPage = (userData: any) =>
    {
        navigation.reset({
            index: 0,
            routes: [{name: 'LandingPage', params: {userId: userData.id, userName: userData.name}}],
        })
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Logo />
            <Title />
            <UserIdInput value={userId} onChange={setUserId} />
            <SignInButton onPress={handleSignIn} />
            {status === 'loading' && <ActivityIndicator size="large" color="#007BFF" />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <Footer />
        </LinearGradient>
    )
}

const Logo: React.FC = () => (
    <Image source={require('../assets/logo.png')} style={styles.logo} />
)

const Title: React.FC = () => (
    <Text style={styles.title}>Welcome</Text>
)

const Footer: React.FC = () => (
    <View style={styles.footer}>
        <Text style={styles.appName}>VoteMaster</Text>
        <Text style={styles.subtitle}>
            Powered by Direct Democracy Corporation
        </Text>
    </View>
)

type UserIdInputProps = {
    value: string
    onChange: (text: string) => void
}

const UserIdInput: React.FC<UserIdInputProps> = ({value, onChange}) => (
    <TextInput
        style={styles.input}
        placeholder="Enter User ID"
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        keyboardType="default"
    />
)

type SignInButtonProps = {
    onPress: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({onPress}) => (
    <TouchableOpacity style={styles.signInButton} onPress={onPress}>
        <Text style={styles.signInButtonText}>Sign In</Text>
    </TouchableOpacity>
)

type ErrorMessageProps = {
    message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => (
    <Text style={styles.error}>{message}</Text>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    appName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007BFF',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    link: {
        color: '#007BFF',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    signInButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    error: {
        color: '#FF3B30',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
})

export default SignInScreen