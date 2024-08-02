import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const api = axios.create({
    baseURL: Constants.expoConfig?.extra?.apiUrl
})

api.interceptors.request.use(
    async (config) =>
    {
        try
        {
            const user = await AsyncStorage.getItem('user')
            if (user)
            {
                const parsedUser = JSON.parse(user)
                const {token} = parsedUser
                if (token)
                {
                    config.headers.Authorization = `Bearer ${token}`
                }
            }
        } catch (error)
        {
            console.error('Error retrieving token from AsyncStorage:', error)
        }
        return config
    },
    (error) =>
    {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) =>
    {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response)
        {
            if (error.response.status === 404)
            {
                errorMessage = 'Resource not found.'
            } else if (error.response.status === 500)
            {
                errorMessage = 'Internal server error.'
            } else
            {
                errorMessage = `Error: ${error.response.status}`
            }
        } else if (error.request)
        {
            errorMessage = 'Network error. Please try again.'
        } else
        {
            errorMessage = 'Error in setting up the request.'
        }
        return Promise.reject(errorMessage)
    }
)

const signInUser = async () =>
{
    try
    {
        const user = await AsyncStorage.getItem('user')
        if (!user)
        {
            console.log('User not found in AsyncStorage.')
            return
        }

        const {email, passwordHash} = JSON.parse(user)
        if (!email || !passwordHash)
        {
            console.log('Email or password hash missing in user object.')
            return
        }

        const response = await api.post('/UserManager/signin', {
            email,
            passwordHash
        })

        const {token} = response.data.data
        const parsedUser = JSON.parse(user)
        parsedUser.token = token

        await AsyncStorage.setItem('user', JSON.stringify(parsedUser))
        console.log('Token refreshed successfully.')
    } catch (error)
    {
        console.error('Error signing in user:', error)
    }
}

const startTokenRefresh = () =>
{
    console.log('Starting token refresh process...')

    // Refresh the token immediately when the app starts
    signInUser()

    // Refresh the token every 10 minutes
    setInterval(() =>
    {
        signInUser()
    }, 10 * 60 * 1000) // 10 minutes in milliseconds
}

// Start the token refresh process
startTokenRefresh()

export default api