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
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle-outline" size={100} color="#007BFF" style={styles.profileIcon} />
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>User Information</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.info}>{userName}</Text>
                </View>
                {/* Additional user information can go here */}
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <Text style={styles.activityItem}>Voted on Infrastructure Referendum</Text>
                <Text style={styles.activityItem}>Created a new referendum</Text>
                {/* Additional recent activities can go here */}
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
        backgroundColor: '#f7f7f7',
    },
    header: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    profileIcon: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
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
    activityItem: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC3545',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    signOutButtonText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#fff',
    },
})

export default ProfileScreen