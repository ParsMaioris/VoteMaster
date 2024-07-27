import React, {useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {AppDispatch, RootState} from '../Redux/Store'
import {checkEligibility, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {Referendum} from '../DTOs/Referendums'
import {referendums} from '../Mocks/MockReferendums'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Referendums'>
}

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const status = useSelector(selectEligibilityStatus)
    const userId = useSelector((state: RootState) => state.user.id)

    useEffect(() =>
    {
        referendums.forEach((referendum) =>
        {
            dispatch(
                checkEligibility({
                    userId: userId,
                    userName: 'currentUserName',
                    referendumId: referendum.id,
                    referendumTitle: referendum.title,
                })
            )
        })
    }, [dispatch])

    const renderItem = ({item}: {item: Referendum}) =>
    {
        const eligibilityKey = `${userId}-${item.id}`
        const isEligible = eligibilityMap[eligibilityKey]

        return (
            <View style={styles.card}>
                <Image source={{uri: item.image}} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.buttonContainer}>
                    {status === 'loading' ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                    ) : (
                        <>
                            {isEligible ? (
                                <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.id)}>
                                    <Text style={styles.buttonText}>Vote Now</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.requestButton} onPress={() => handleRequestToVote(item.id)}>
                                    <Text style={styles.buttonText}>Request to Vote</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.id)}>
                                <Text style={styles.buttonText}>Learn More</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        )
    }

    const handleVote = (id: string) =>
    {
        navigation.navigate('ReferendumPrompt', {referendumId: id})
    }

    const handleLearnMore = (id: string) =>
    {
        navigation.navigate('ReferendumDetail', {referendumId: id})
    }

    const handleRequestToVote = (id: string) =>
    {
        // handle the request to vote action
    }

    return (
        <FlatList
            data={referendums}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F7',
    },
    card: {
        backgroundColor: '##F5F5F7',
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    voteButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        marginRight: 5,
        shadowColor: '#007AFF',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    requestButton: {
        flex: 1,
        backgroundColor: '#FF9500',
        paddingVertical: 14,
        borderRadius: 10,
        marginRight: 5,
        shadowColor: '#FF9500',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    learnButton: {
        flex: 1,
        backgroundColor: '#34C759',
        paddingVertical: 14,
        borderRadius: 10,
        marginLeft: 5,
        shadowColor: '#34C759',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default ReferendumsScreen