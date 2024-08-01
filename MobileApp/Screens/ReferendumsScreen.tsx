import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Modal, Dimensions} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {AppDispatch, RootState} from '../Redux/Store'
import {checkEligibility, selectEligibility, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import {Referendum} from '../DTOs/Referendums'
import {referendums} from '../Mocks/MockReferendums'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import BottomNavigation from '../Components/BottomNavigation'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Referendums'>
}

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const eligibilityMap = useSelector(selectEligibility)
    const status = useSelector(selectEligibilityStatus) as 'idle' | 'loading' | 'succeeded' | 'failed'
    const userId = useSelector((state: RootState) => state.user.id)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedReferendum, setSelectedReferendum] = useState<Referendum | null>(null)
    const [isEligibleForAny, setIsEligibleForAny] = useState(false)
    const [fetchError, setFetchError] = useState<string | null>(null)

    useEffect(() =>
    {
        setLoading(true)
        const fetchEligibility = async () =>
        {
            let eligible = false
            try
            {
                for (const referendum of referendums)
                {
                    const result = await dispatch(checkEligibility({
                        userId: userId,
                        userName: 'currentUserName',
                        referendumId: referendum.id,
                        referendumTitle: referendum.title,
                    })).unwrap()
                    if (result.isEligible) eligible = true
                }
                setIsEligibleForAny(eligible)
            } catch (err: any)
            {
                setFetchError(err)
            }
            setLoading(false)
        }
        fetchEligibility()
    }, [dispatch, userId])

    if (loading || status === 'loading')
    {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
                <View style={styles.bottomNavigationWrapper}>
                    <BottomNavigation />
                </View>
            </View>
        )
    }

    if (fetchError)
    {
        return <View style={[styles.container, {flex: 1}]}>
            <Text style={[styles.errorText, {flexGrow: 1}]}>{fetchError}</Text>
            <View style={styles.bottomNavigationWrapper}>
                <BottomNavigation />
            </View>
        </View>
    }

    const handleOpenModal = (referendum: Referendum) =>
    {
        setSelectedReferendum(referendum)
        setModalVisible(true)
    }

    const handleCloseModal = () =>
    {
        setModalVisible(false)
        setSelectedReferendum(null)
    }

    const renderItem = ({item, index}: {item: Referendum; index: number}) =>
    {
        const eligibilityKey = `${userId}-${item.id}`
        const isEligible = eligibilityMap[eligibilityKey]

        if (!isEligible)
        {
            return null
        }

        return (
            <Animatable.View animation="fadeInUp" duration={800} delay={index * 100} style={styles.card}>
                <TouchableOpacity onPress={() => handleOpenModal(item)} style={styles.cardContent}>
                    <Animatable.Image
                        animation="fadeIn"
                        delay={index * 200}
                        source={{uri: item.image}}
                        style={styles.image}
                    />
                    <Animatable.Text animation="fadeIn" delay={index * 300} style={styles.title}>
                        {item.title}
                    </Animatable.Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    {status === 'loading' ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                    ) : (
                        <>
                            {isEligible ? (
                                <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                    <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.id)}>
                                        <Text style={styles.buttonText}>Vote</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            ) : (
                                <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                    <TouchableOpacity style={styles.requestButton} onPress={() => handleRequestToVote(item.id)}>
                                        <Text style={styles.buttonText}>Request</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            )}
                            <Animatable.View animation="fadeIn" delay={index * 600} style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.id)}>
                                    <Text style={styles.buttonText}>Info</Text>
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
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                    <View style={styles.bottomNavigationWrapper}>
                        <BottomNavigation />
                    </View>
                </View>
            ) : (
                isEligibleForAny ? (
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                        <FlatList
                            data={referendums}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContainer}
                            numColumns={2}
                        />
                    </Animatable.View>
                ) : (
                    <Animatable.View animation="fadeInDown" duration={1000} style={styles.notEligibleContainer}>
                        <Text style={styles.notEligibleText}>It looks like there are no referendums available for you right now. Enjoy a well-deserved break and check back soon!</Text>
                    </Animatable.View>
                )
            )}
            {selectedReferendum && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedReferendum.title}</Text>
                            <Image source={{uri: selectedReferendum.image}} style={styles.modalImage} />
                            <Text style={styles.modalDescription}>{selectedReferendum.description}</Text>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <View style={styles.bottomNavigationWrapper}>
                <BottomNavigation />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F0F4F8',
    },
    bottomNavigationWrapper: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#1D1D1F',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
    },
    cardContent: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
        overflow: 'hidden',
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
        backgroundColor: '#004AAD',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#004AAD',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    requestButton: {
        backgroundColor: '#FFA000',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#FFA000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    learnButton: {
        backgroundColor: '#70757A',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#70757A',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
        width: Dimensions.get('window').width * 0.8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 15,
    },
    modalDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    notEligibleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    notEligibleText: {
        fontSize: 18,
        color: '#444',
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 40
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ReferendumsScreen