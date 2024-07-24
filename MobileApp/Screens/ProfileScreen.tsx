import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../Redux/Store'
import {clearUserName} from '../Redux/UserSlice'
import {Ionicons} from '@expo/vector-icons'

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) =>
{
    const dispatch = useDispatch()
    const userName = useSelector((state: RootState) => state.user.name)

    const handleSignOut = () =>
    {
        dispatch(clearUserName())
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>User Name:</Text>
                <Text style={styles.info}>{userName}</Text>
            </View>
            <View style={styles.recentActivityContainer}>
                <Text style={styles.recentActivityTitle}>Recent Activity</Text>
                <Text style={styles.recentActivityText}>You voted on Infrastructure Referendum</Text>
                <Text style={styles.recentActivityText}>You created a new referendum</Text>
                {/* Add more recent activities here */}
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
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
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginRight: 10,
    },
    info: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    recentActivityContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    recentActivityTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    recentActivityText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC3545',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        width: '40%',
    },
    signOutButtonText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#fff',
    },
})

export default ProfileScreen