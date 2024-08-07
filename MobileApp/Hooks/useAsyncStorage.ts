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
            console.error('Failed to save user to storage', e)
        }
    }

    const removeUserFromStorage = async () =>
    {
        try
        {
            await AsyncStorage.removeItem('user')
            console.log('User removed from storage')
        } catch (e)
        {
            console.error('Failed to remove user from storage', e)
        }
    }

    return {
        saveUserToStorage,
        removeUserFromStorage,
    }
}