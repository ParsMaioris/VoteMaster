import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../Redux/Store'
import {clearUserName} from '../Redux/UserSlice'

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) =>
{
    const dispatch = useDispatch()
    const userName = useSelector((state: RootState) => state.user.name)
    const userId = useSelector((state: RootState) => state.user.id)

    const handleSignOut = () =>
    {
        dispatch(clearUserName())
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.label}>User ID: {userId}</Text>
            <Text style={styles.label}>User Name: {userName}</Text>
            <Button title="Sign Out" onPress={handleSignOut} color="#DC3545" />
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
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
})

export default ProfileScreen