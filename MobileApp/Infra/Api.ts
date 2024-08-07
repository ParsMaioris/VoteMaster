import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const api = axios.create({
    baseURL: Constants.expoConfig?.extra?.apiUrl,
})

api.interceptors.request.use(
    async (config) =>
    {
        try
        {
            const user = await AsyncStorage.getItem('user')
            if (user)
            {
                const {token} = JSON.parse(user)
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
    (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: Array<{resolve: (token: string | null) => void, reject: (error: any) => void}> = []

const processQueue = (error: any, token: string | null = null) =>
{
    failedQueue.forEach(({resolve, reject}) =>
    {
        if (error)
        {
            reject(error)
        } else
        {
            resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error) =>
    {
        const originalRequest = error.config

        if (originalRequest._retry)
        {
            return Promise.reject(error)
        }

        if (!isRefreshing)
        {
            isRefreshing = true
            originalRequest._retry = true

            try
            {
                const token = await signInUser()
                processQueue(null, token)
                return api(originalRequest)
            } catch (err)
            {
                processQueue(err, null)
                return Promise.reject(err)
            } finally
            {
                isRefreshing = false
            }
        }

        return new Promise((resolve, reject) =>
        {
            failedQueue.push({resolve, reject})
        }).then((token) =>
        {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return api(originalRequest)
        }).catch((err) => Promise.reject(err))
    }
)

const signInUser = async (): Promise<string | null> =>
{
    try
    {
        const user = await AsyncStorage.getItem('user')
        if (!user)
        {
            return null
        }

        const {email, passwordHash} = JSON.parse(user)
        if (!email || !passwordHash)
        {
            return null
        }

        const response = await api.post('/UserManager/signin', {
            email,
            passwordHash,
        })

        const {token} = response.data.data
        const parsedUser = JSON.parse(user)
        parsedUser.token = token

        await AsyncStorage.setItem('user', JSON.stringify(parsedUser))

        return token
    } catch (error)
    {
        console.error('Error signing in user:', error)
        return null
    }
}

export default api