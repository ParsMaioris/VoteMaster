import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {LinearGradient} from 'expo-linear-gradient'
import {Ionicons} from '@expo/vector-icons'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {deleteUser, resetUserState} from '../Redux/UserSlice'
import {resetEligibility} from '../Redux/EligibilitySlice'
import {resetReferendumState} from '../Redux/ReferendumSlice'
import {resetVoteState} from '../Redux/VoteSlice'
import {AppDispatch, RootState} from '../Redux/Store'
import {RootStackParamList} from '../Infra/Navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ManageAccountPage: React.FC = () =>
{
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const userId = useSelector((state: RootState) => state.user.id)

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

    const handleSignOut = () =>
    {
        dispatch(resetEligibility())
        dispatch(resetUserState())
        dispatch(resetReferendumState())
        dispatch(resetVoteState())
        removeUserFromStorage().then(() =>
        {
            navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
            })
        })
    }

    const handleDeleteAccount = () =>
    {
        const id = userId
        dispatch(resetEligibility())
        dispatch(resetReferendumState())
        dispatch(resetVoteState())

        dispatch(deleteUser(id)).then(() =>
        {
            removeUserFromStorage()
            navigation.reset({
                index: 0,
                routes: [{name: 'SignIn'}],
            })
        })
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>Manage Account</Text>
                <Text style={styles.contextText}>Manage Your Account Access</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
                        <Ionicons name="log-out-outline" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteAccountButton]} onPress={handleDeleteAccount}>
                        <Ionicons name="trash-outline" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.bottomNavigationWrapper}>
                <BottomNavigation />
            </View> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottomNavigationWrapper: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 25,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 8,
    },
    contextText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginVertical: 12,
        borderRadius: 30,
        width: '90%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    signOutButton: {
        backgroundColor: '#EF5350',
    },
    deleteAccountButton: {
        backgroundColor: '#C62828',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
    icon: {
        marginRight: 10,
    },
})

export default ManageAccountPage