import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal, ActivityIndicator} from 'react-native'
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
import {Snackbar} from 'react-native-paper'

const ManageAccountPage: React.FC = () =>
{
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const userId = useSelector((state: RootState) => state.user.id)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const handleSignOut = () =>
    {
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        })
    }

    const handleDeleteAccount = async () =>
    {
        try
        {
            setModalVisible(false)
            setLoading(true)

            await new Promise(resolve => setTimeout(resolve, 500))

            const id = userId
            await dispatch(deleteUser(id))

            dispatch(resetUserState())
            dispatch(resetEligibility())
            dispatch(resetReferendumState())
            dispatch(resetVoteState())

            await AsyncStorage.clear()
            setSnackbarMessage('Your account has been successfully deleted.')
            setSnackbarVisible(true)

            setTimeout(() =>
            {
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}],
                })
            }, 3000)
        } catch (error)
        {
            setSnackbarMessage('There was an error deleting your account. Please try again.')
            setSnackbarVisible(true)
            setLoading(false)
        }
    }

    const confirmDeleteAccount = () =>
    {
        setModalVisible(true)
    }

    const cancelDelete = () =>
    {
        setModalVisible(false)
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
                    <TouchableOpacity style={[styles.button, styles.deleteAccountButton]} onPress={confirmDeleteAccount}>
                        <Ionicons name="trash-outline" size={24} color="white" style={styles.icon} />
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() =>
                {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeaderText}>Confirm Account Deletion</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to delete your account? This action is irreversible and will result in the permanent loss of all your data and votes.
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelDelete}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleDeleteAccount}>
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#C62828" />
                </View>
            )}

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                {snackbarMessage}
            </Snackbar>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#888888',
    },
    confirmButton: {
        backgroundColor: '#C62828',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default ManageAccountPage