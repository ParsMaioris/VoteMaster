import React from 'react'
import {View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {LinearGradient} from 'expo-linear-gradient'
import {useSigningHandler} from '../Hooks/useSigningHandler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

type Props = {
    navigation: SignInScreenNavigationProp
    route: {
        params: {
            initialEmail?: string
            initialPassword?: string
        }
    }
}

const SignInScreen: React.FC<Props> = ({navigation, route}) =>
{
    const {initialEmail = '', initialPassword = ''} = route.params || {}
    const {email, setEmail, password, setPassword, errorMessage, handleSignIn, status} = useSigningHandler(initialEmail, initialPassword, navigation)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContainer}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={true}
                    onScrollBeginDrag={Keyboard.dismiss}
                    keyboardShouldPersistTaps='always'
                >
                    <Logo />
                    <Title />
                    <EmailInput value={email} onChange={setEmail} />
                    <PasswordInput value={password} onChange={setPassword} />
                    <SignInButton onPress={handleSignIn} loading={status === 'loading'} />
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <TouchableOpacity onPress={() =>
                    {
                        Keyboard.dismiss()
                        setEmail('')
                        setPassword('')
                        navigation.navigate('ForgotPassword')
                    }}>
                        <Text style={styles.link}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                    {
                        Keyboard.dismiss()
                        setEmail('')
                        setPassword('')
                        navigation.navigate('Registration')
                    }}>
                        <Text style={styles.link}>Don't have an account? Register here</Text>
                    </TouchableOpacity>
                    <Footer />
                </KeyboardAwareScrollView>
            </LinearGradient>
        </TouchableWithoutFeedback>
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
        <Text style={styles.subtitle}>Powered by Direct Democracy Corporation</Text>
    </View>
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

type SignInButtonProps = {
    onPress: () => void
    loading: boolean
}

const SignInButton: React.FC<SignInButtonProps> = ({onPress, loading}) => (
    <TouchableOpacity style={styles.signInButton} onPress={onPress} disabled={loading}>
        <View style={styles.signInButtonContent}>
            {loading && <ActivityIndicator size="small" color="#fff" style={styles.loader} />}
            <Text style={[styles.signInButtonText, loading && styles.textWithLoader]}>Sign In</Text>
        </View>
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
    },
    scrollContainer: {
        flexGrow: 1,
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
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
    },
    footer: {
        marginTop: 50,
        alignItems: 'center',
    },
    appName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C2C2E',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    link: {
        color: '#007BFF',
        fontWeight: '600',
        marginTop: 10,
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
    error: {
        color: '#FF3B30',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    signInButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    textWithLoader: {
        marginLeft: 10,
    },
    loader: {
        marginRight: 2,
    },
})

export default SignInScreen