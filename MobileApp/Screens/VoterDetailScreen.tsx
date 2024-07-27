import React, {useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {getOwnedReferendums} from '../Redux/OwnerSlice'
import {inviteUserToReferendum} from '../Redux/UserSlice'
import {VoterDetailRouteProp} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'

const VoterDetailScreen: React.FC<VoterDetailRouteProp> = ({route}) =>
{
    const {id, name} = route.params
    const voter = {id, name}
    const dispatch = useDispatch<AppDispatch>()
    const {ownedReferendumIds, status, error} = useSelector((state: RootState) => state.owner)
    const allReferendums = useSelector((state: RootState) => state.referendum.referendumMap)
    const ownedReferendums = ownedReferendumIds.map(id => allReferendums[id])
    const ownerId = useSelector((state: RootState) => state.user.id)

    useEffect(() =>
    {
        dispatch(getOwnedReferendums(ownerId))
    }, [dispatch, ownerId])

    const handleInvite = (referendumId: string) =>
    {
        dispatch(inviteUserToReferendum({userId: voter.id, referendumId}))
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Invite {voter.name} to a Referendum</Text>
            <FlatList
                data={ownedReferendums}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.referendumContainer} onPress={() => handleInvite(item.id)}>
                        <View style={styles.referendumInfo}>
                            <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                            <Text style={styles.referendumText}>{item.title}</Text>
                        </View>
                        <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1D1D1F',
        marginBottom: 20,
        textAlign: 'center',
    },
    referendumContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    referendumInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    referendumText: {
        fontSize: 18,
        color: '#1D1D1F',
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
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
})

export default VoterDetailScreen