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
            const token = await AsyncStorage.getItem('token')
            if (token)
            {
                config.headers.Authorization = `Bearer ${token}`
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

export default api