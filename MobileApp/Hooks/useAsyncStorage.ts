import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = () =>
{
    const saveUserToStorage = async (user: any) =>
    {
        try
        {
            await AsyncStorage.setItem('user', JSON.stringify(user))
        } catch (e)
        {
        }
    }

    const removeUserFromStorage = async () =>
    {
        try
        {
            await AsyncStorage.removeItem('user')
        } catch (e)
        {
        }
    }

    return {
        saveUserToStorage,
        removeUserFromStorage,
    }
}