import React, {useState} from 'react'
import {View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {useAppDispatch, useAppSelector} from '../Redux/Hooks'
import {addUser} from '../Redux/UserSlice'
import {LinearGradient} from 'expo-linear-gradient'
import CryptoJS from 'crypto-js'

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Registration'>

type Props = {
    navigation: RegistrationScreenNavigationProp
}

const RegistrationScreen: React.FC<Props> = ({navigation}) =>
{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()
    const {status} = useAppSelector((state) => state.user)

    const validateEmail = (email: string) =>
    {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const validatePassword = (password: string) =>
    {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/
        return re.test(password)
    }

    const handleRegister = async () =>
    {
        if (!name || !email || !password)
        {
            setErrorMessage('Please fill in all fields.')
            return
        }

        if (!validateEmail(email))
        {
            setErrorMessage('Please enter a valid email address.')
            return
        }

        if (!validatePassword(password))
        {
            setErrorMessage('Password must be at least 5 characters long and include a number, an uppercase letter, and a lowercase letter.')
            return
        }

        const passwordHash = CryptoJS.SHA256(password).toString()
        const resultAction = await dispatch(addUser({name, passwordHash, email}))

        if (addUser.fulfilled.match(resultAction))
        {
            setErrorMessage('')
            navigation.navigate('SignIn', {initialEmail: email, initialPassword: password})
        } else
        {
            const payload = resultAction.payload as {message: string}
            setErrorMessage(payload.message)
        }
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Logo />
            <Title />
            <NameInput value={name} onChange={setName} />
            <EmailInput value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} />
            <RegisterButton onPress={handleRegister} />
            {status === 'loading' && <ActivityIndicator size="large" color="#007BFF" style={{marginBottom: 10}} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.link}>Already have an account? Sign In</Text>
            </TouchableOpacity>
            <Footer />
        </LinearGradient>
    )
}

const Logo: React.FC = () => (
    <Image source={require('../assets/logo.png')} style={styles.logo} />
)

const Title: React.FC = () => (
    <Text style={styles.title}>Register</Text>
)

const Footer: React.FC = () => (
    <View style={styles.footer}>
        <Text style={styles.appName}>VoteMaster</Text>
        <Text style={styles.subtitle}>
            Powered by Direct Democracy Corporation
        </Text>
    </View>
)

type NameInputProps = {
    value: string
    onChange: (text: string) => void
}

const NameInput: React.FC<NameInputProps> = ({value, onChange}) => (
    <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={value}
        onChangeText={onChange}
        autoCapitalize="words"
        keyboardType="default"
    />
)

type EmailInputProps = {
    value: string
    onChange: (text: string) => void
}

const EmailInput: React.FC<EmailInputProps> = ({value, onChange}) => (
    <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        keyboardType="email-address"
    />
)

type PasswordInputProps = {
    value: string
    onChange: (text: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, onChange}) => (
    <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        secureTextEntry
    />
)

type RegisterButtonProps = {
    onPress: () => void
}

const RegisterButton: React.FC<RegisterButtonProps> = ({onPress}) => (
    <TouchableOpacity style={styles.registerButton} onPress={onPress}>
        <Text style={styles.registerButtonText}>Register</Text>
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
        color: '#2C2C2E',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
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
    registerButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerButtonText: {
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
        marginBottom: 10,
    },
    link: {
        color: '#007BFF',
        fontWeight: '600',
    },
})

export default RegistrationScreen