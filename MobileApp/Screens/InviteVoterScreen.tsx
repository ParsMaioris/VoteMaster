import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {getOwnedReferendums} from '../Redux/OwnerSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'
import VotersScreen from './VotersScreen'
import * as Animatable from 'react-native-animatable'

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
        navigation.navigate('ProposeReferendumForm')
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
                <Animatable.View animation="fadeIn" duration={800} style={styles.messageContainer}>
                    <Animatable.Text animation="fadeInDown" style={styles.messageText}>
                        No Referendums Created
                    </Animatable.Text>
                    <Text style={styles.subMessageText}>
                        Propose a referendum. Once approved, you can invite users to vote on it.
                    </Text>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={800} style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleCreateReferendum}>
                        <Text style={styles.buttonText}>Propose Referendum</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        )
    }

    return <VotersScreen />
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
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
})

export default InviteParticipantScreen