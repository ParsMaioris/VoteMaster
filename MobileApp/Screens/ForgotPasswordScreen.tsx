import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {LinearGradient} from 'expo-linear-gradient'

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>

type Props = {
    navigation: ForgotPasswordScreenNavigationProp
}

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) =>
{
    const handleEmailPress = async () =>
    {
        const email = 'mailto:contact@directdemocracy.global'
        try
        {
            const supported = await Linking.canOpenURL(email)
            if (supported)
            {
                await Linking.openURL(email)
            } else
            {
                Alert.alert('Email not supported', 'Your device does not support opening email links.')
            }
        } catch (error)
        {
            console.error('Failed to open email link', error)
            Alert.alert('Error', 'An error occurred while trying to open the email link.')
        }
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.message}>
                If you have forgotten your password, please reach out to us directly at:
            </Text>
            <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.email}>contact@directdemocracy.global</Text>
            </TouchableOpacity>
            <Text style={styles.reason}>
                For security reasons and to ensure your data is protected, we handle password recovery
                through direct communication.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back to Sign In</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    email: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007BFF',
        textAlign: 'center',
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
    reason: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    backButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
})

export default ForgotPasswordScreen