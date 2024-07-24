import React, {useState} from 'react'
import {View, TextInput, Button, Text, StyleSheet, Image, Linking} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {signInUser} from '../Api/apiService'

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

type Props = {
    navigation: SignInScreenNavigationProp
}

const SignInScreen: React.FC<Props> = ({navigation}) =>
{
    const [userId, setUserId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignIn = async () =>
    {
        const isValid = validateUserId(userId)
        if (!isValid)
        {
            setErrorMessage('Please enter a valid User ID.')
            return
        }

        try
        {
            const userData = await signInUser(userId)
            setErrorMessage('') // Clear the error message on successful sign-in
            navigateToLandingPage(userData)
        } catch (error)
        {
            setErrorMessage('An error occurred. Please check your User ID and try again.')
        }
    }

    const validateUserId = (id: string): boolean =>
    {
        // Add any validation logic here (e.g., check format or length)
        return id.trim().length > 0
    }

    const navigateToLandingPage = (userData: any) =>
    {
        navigation.navigate('LandingPage', {userId: userData.id, userName: userData.name})
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome to VoteMaster</Text>
            <Text style={styles.subtitle}>
                Powered by{' '}
                <Text style={styles.link} onPress={() => Linking.openURL('https://www.directdemocracycorporation.com')}>
                    Direct Democracy Corporation
                </Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                value={userId}
                onChangeText={setUserId}
                autoCapitalize="none"
            />
            <Button title="Sign In" onPress={handleSignIn} />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </View>
    )
}

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