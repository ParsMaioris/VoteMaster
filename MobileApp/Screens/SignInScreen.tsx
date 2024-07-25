import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, Image, Linking} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {useAppDispatch, useAppSelector} from '../Redux/Hooks'
import {fetchUserName, selectUserName} from '../Redux/UserSlice'

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

    const handleSignIn = async () =>
    {
        if (!isUserIdValid(userId))
        {
            setErrorMessage('Please enter a valid User ID.')
            return
        }

        const resultAction = await dispatch(fetchUserName(userId))

        if (fetchUserName.fulfilled.match(resultAction) && isFetchUserNameFulfilled(resultAction))
        {
            const {id, name} = resultAction.payload
            setErrorMessage('')
            navigateToLandingPage({id, name})
        }
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
        <View style={styles.container}>
            <Logo />
            <Title />
            <Subtitle />
            <UserIdInput value={userId} onChange={setUserId} />
            <SignInButton onPress={handleSignIn} />
            {status === 'loading' && <Text>Loading...</Text>}
            {errorMessage && <ErrorMessage message={errorMessage} />}
        </View>
    )
}

const Logo: React.FC = () => (
    <Image source={require('../assets/logo.png')} style={styles.logo} />
)

const Title: React.FC = () => (
    <Text style={styles.title}>Welcome to VoteMaster</Text>
)

const Subtitle: React.FC = () => (
    <Text style={styles.subtitle}>
        Powered by{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://directdemocracy.global')}>
            Direct Democracy Corporation
        </Text>
    </Text>
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
    />
)

type SignInButtonProps = {
    onPress: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({onPress}) => (
    <Button title="Sign In" onPress={onPress} />
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
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    link: {
        color: '#4169E1',
        textDecorationLine: 'none',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
})

export default SignInScreen