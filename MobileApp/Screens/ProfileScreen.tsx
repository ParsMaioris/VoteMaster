import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {resetUserState} from '../Redux/UserSlice'
import {fetchVotesByUserId, resetVoteState} from '../Redux/VoteSlice'
import {getReferendumById, resetReferendumState, selectReferendums} from '../Redux/ReferendumSlice'
import {Ionicons} from '@expo/vector-icons'
import useReferendumHelper from '../Hooks/useReferendumHelper'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import BottomNavigation from '../Components/BottomNavigation' // Adjust the import path as needed
import {checkEligibility, resetEligibility, selectEligibility} from '../Redux/EligibilitySlice'
import {getOwnedReferendums, resetOwenrState as resetOwnerState} from '../Redux/OwnerSlice'
import {useFocusEffect} from '@react-navigation/native'

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const userName = useSelector((state: RootState) => state.user.name)
    const userId = useSelector((state: RootState) => state.user.id)
    const votes = useSelector((state: RootState) => state.vote.votes)
    const [loadingActivity, setLoadingActivity] = useState(true)
    const [loadingReferendums, setLoadingReferendums] = useState(true)
    const ownedReferendums = useReferendumHelper()
    const [fetchError, setFetchError] = useState<string | null>(null)
    const eligibilityMap = useSelector(selectEligibility)
    const referendums = useSelector(selectReferendums)


    useFocusEffect(
        useCallback(() =>
        {
            const fetchEligibility = async () =>
            {
                try
                {
                    for (const referendum of referendums)
                    {
                        const eligibilityKey = `${userId}-${referendum.referendumId}`

                        if (eligibilityMap[eligibilityKey] == undefined)
                        {
                            await dispatch(checkEligibility({
                                userId: userId,
                                userName: 'currentUserName',
                                referendumId: referendum.referendumId,
                                referendumTitle: referendum.title,
                            })).unwrap()
                        }
                    }
                } catch (err: any)
                {
                    setFetchError(err)
                }
            }

            const fetchVotes = async () =>
            {
                try
                {
                    if (userId)
                    {
                        await dispatch(fetchVotesByUserId(userId)).unwrap()
                    }
                } catch (err: any)
                {
                    setFetchError(err)
                }
            }

            const fetchData = async () =>
            {
                setFetchError(null)
                try
                {
                    setLoadingActivity(true)
                    await fetchVotes()
                    setLoadingActivity(false)

                    setLoadingReferendums(true)
                    await dispatch(getOwnedReferendums(userId)).unwrap()
                    await fetchEligibility()
                    setLoadingReferendums(false)
                } catch (err: any)
                {
                    setFetchError(err.message)
                    setLoadingActivity(false)
                    setLoadingReferendums(false)
                }
            }

            fetchData()
        }, [userId, dispatch])
    )

    const handleManageAccount = () =>
    {
        navigation.navigate("ManageAccount")
    }

    const renderVoteActivity = () =>
    {
        if (loadingActivity)
        {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            )
        }
        if (votes.length === 0)
        {
            return (
                <Text style={styles.noActivity}>No recent activity</Text>
            )
        }
        return votes.map((vote) =>
        {
            const referendum = referendums.find((ref) => ref.referendumId === vote.referendumId)
            return (
                <Animatable.View animation="fadeInUp" duration={800} delay={300} key={vote.id} style={styles.activityItemContainer}>
                    <Text style={styles.activityItem}>
                        Voted on {referendum ? referendum.title : 'Unknown Referendum'}
                    </Text>
                </Animatable.View>
            )
        })
    }

    const renderUserReferendums = () =>
    {
        if (loadingReferendums)
        {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            )
        }
        if (ownedReferendums.length === 0)
        {
            return (
                <Text style={styles.noActivity}>No referendums found. The ability to take ownership of referendums will be available in a future update.</Text>
            )
        }
        return ownedReferendums.map((ref, index) => (
            <Animatable.View animation="fadeInUp" duration={800} delay={index * 100 + 400} key={ref.referendumId} style={styles.referendumItemContainer}>
                <Text style={styles.referendumItem}>
                    {ref.title}
                </Text>
            </Animatable.View>
        ))
    }

    const renderSections = () =>
    {
        return (
            <>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    {renderVoteActivity()}
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>User Referendums</Text>
                    {renderUserReferendums()}
                </View>
            </>
        )
    }

    if (fetchError)
    {
        return <Text style={styles.errorText}>{fetchError}</Text>
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.profileContainer}>
                        <Ionicons name="person-circle-outline" size={100} color="#007BFF" style={styles.profileIcon} />
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
                    <TouchableOpacity style={styles.manageAccountButton} onPress={handleManageAccount}>
                        <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                        <Text style={styles.manageAccountButtonText}>Manage Account</Text>
                    </TouchableOpacity>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>User Information</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Name:</Text>
                            <Text style={styles.info}>{userName}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Unique ID:</Text>
                            <Text style={styles.info}>{userId.slice(-12)}</Text>
                        </View>
                    </View>
                    {renderSections()}

                </ScrollView>
            </Animatable.View>
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
    },
    bottomNavigationWrapper: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    contentContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#1D1D1F',
    },
    header: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileIcon: {
        marginBottom: 5,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
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
    activityItemContainer: {
        marginBottom: 5,
    },
    activityItem: {
        fontSize: 16,
        color: '#555',
    },
    referendumItemContainer: {
        marginBottom: 5,
    },
    referendumItem: {
        fontSize: 16,
        color: '#555',
    },
    noActivity: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 10,
    },
    manageAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    manageAccountButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
})

export default ProfileScreen 