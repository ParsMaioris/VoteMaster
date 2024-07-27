import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {getOwnedReferendums} from '../Redux/OwnerSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'
import VotersScreen from './VotersScreen'

const InviteParticipantScreen: React.FC = () =>
{
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const dispatch = useDispatch<AppDispatch>()
    const {ownedReferendumIds, status, error} = useSelector((state: RootState) => state.owner)
    const ownerId = useSelector((state: RootState) => state.user.id)

    useEffect(() =>
    {
        dispatch(getOwnedReferendums(ownerId))
    }, [dispatch, ownerId])

    const handleCreateReferendum = () =>
    {
        navigation.navigate('Referendums')
    }

    if (status === 'loading')
    {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    if (error)
    {
        return <Text style={styles.errorText}>{error}</Text>
    }

    if (ownedReferendumIds.length === 0)
    {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>No Referendums Created</Text>
                    <Text style={styles.subMessageText}>Create a referendum to invite participants.</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleCreateReferendum}>
                    <Text style={styles.buttonText}>Create Referendum</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Invite Participants</Text>
            <VotersScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#1D1D1F',
    },
    messageContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1D1D1F',
        textAlign: 'center',
        marginBottom: 10,
    },
    subMessageText: {
        fontSize: 16,
        color: '#1D1D1F',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1D1D1F',
        marginTop: 20,
        marginBottom: 3,
        textAlign: 'center',
    },
})

export default InviteParticipantScreen