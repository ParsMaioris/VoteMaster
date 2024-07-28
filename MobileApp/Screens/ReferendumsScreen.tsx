import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {AppDispatch, RootState} from '../Redux/Store'
import {checkEligibility, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {Referendum} from '../DTOs/Referendums'
import {referendums} from '../Mocks/MockReferendums'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Referendums'>
}

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const status = useSelector(selectEligibilityStatus)
    const userId = useSelector((state: RootState) => state.user.id)
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        const fetchEligibility = async () =>
        {
            for (const referendum of referendums)
            {
                await dispatch(checkEligibility({
                    userId: userId,
                    userName: 'currentUserName',
                    referendumId: referendum.id,
                    referendumTitle: referendum.title,
                }))
            }
            setLoading(false)
        }
        fetchEligibility()
    }, [dispatch, userId])

    const renderItem = ({item, index}: {item: Referendum; index: number}) =>
    {
        const eligibilityKey = `${userId}-${item.id}`
        const isEligible = eligibilityMap[eligibilityKey]

        return (
            <Animatable.View animation="fadeInUp" duration={800} delay={index * 100} style={styles.card}>
                <Animatable.Image
                    animation="fadeIn"
                    delay={index * 200}
                    source={{uri: item.image}}
                    style={styles.image}
                />
                <Animatable.Text animation="fadeIn" delay={index * 300} style={styles.title}>
                    {item.title}
                </Animatable.Text>
                <Animatable.Text animation="fadeIn" delay={index * 400} style={styles.description}>
                    {item.description}
                </Animatable.Text>
                <View style={styles.buttonContainer}>
                    {status === 'loading' ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                    ) : (
                        <>
                            {isEligible ? (
                                <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                    <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.id)}>
                                        <Text style={styles.buttonText}>Vote Now</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            ) : (
                                <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                    <TouchableOpacity style={styles.requestButton} onPress={() => handleRequestToVote(item.id)}>
                                        <Text style={styles.buttonText}>Request to Vote</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            )}
                            <Animatable.View animation="fadeIn" delay={index * 600} style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.id)}>
                                    <Text style={styles.buttonText}>Learn More</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </>
                    )}
                </View>
            </Animatable.View>
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
        <LinearGradient colors={['#edf4ff', '#f7f9fc']} style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                    <FlatList
                        data={referendums}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                </Animatable.View>
            )}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    listContainer: {
        paddingBottom: 20,
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
    card: {
        backgroundColor: '#ffffff',
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
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    voteButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 10,
        shadowColor: '#007AFF',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    requestButton: {
        backgroundColor: '#FF9500',
        paddingVertical: 14,
        borderRadius: 10,
        shadowColor: '#FF9500',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    learnButton: {
        backgroundColor: '#34C759',
        paddingVertical: 14,
        borderRadius: 10,
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