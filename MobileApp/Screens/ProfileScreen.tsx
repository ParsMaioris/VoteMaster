import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {resetUserState} from '../Redux/UserSlice'
import {fetchVotesByUserId, resetVoteState} from '../Redux/VoteSlice'
import {getReferendumById, resetReferendumState} from '../Redux/ReferendumSlice'
import {Ionicons} from '@expo/vector-icons'
import useReferendumHelper from '../Hooks/useReferendumHelper'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import BottomNavigation from '../Components/BottomNavigation' // Adjust the import path as needed
import {resetEligibility} from '../Redux/EligibilitySlice'
import {getOwnedReferendums, resetOwenrState} from '../Redux/OwnerSlice'
import {useFocusEffect} from '@react-navigation/native'

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const userName = useSelector((state: RootState) => state.user.name)
    const userId = useSelector((state: RootState) => state.user.id)
    const votes = useSelector((state: RootState) => state.vote.votes)
    const referendums = useSelector((state: RootState) => state.referendum.referendumMap)
    const [loading, setLoading] = useState(true)
    const ownedReferendums = useReferendumHelper()

    useFocusEffect(
        useCallback(() =>
        {
            const fetchData = async () =>
            {
                if (userId)
                {
                    setLoading(true)
                    await dispatch(fetchVotesByUserId(userId))
                    const votes = await dispatch(fetchVotesByUserId(userId)).unwrap()
                    const votePromises = votes.map((vote) => 
                    {
                        return dispatch(getReferendumById(vote.referendumId))
                    })
                    await Promise.all(votePromises)
                    setLoading(false)
                }
            }

            dispatch(getOwnedReferendums(userId))
            fetchData()
        }, [userId, dispatch])
    )

    const handleSignOut = () =>
    {
        dispatch(resetUserState())
        dispatch(resetEligibility())
        dispatch(resetOwenrState())
        dispatch(resetReferendumState())
        dispatch(resetVoteState())

        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        })
    }

    const renderVoteActivity = () =>
    {
        return votes.map((vote) =>
        {
            const referendum = referendums[vote.referendumId]
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
        return ownedReferendums.map((ref, index) => (
            <Animatable.View animation="fadeInUp" duration={800} delay={index * 100 + 400} key={ref.id} style={styles.referendumItemContainer}>
                <Text style={styles.referendumItem}>
                    {ref.title}
                </Text>
            </Animatable.View>
        ))
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007BFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            ) : (
                <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                            {votes.length > 0 ? (
                                renderVoteActivity()
                            ) : (
                                <Text style={styles.noActivity}>No recent activity</Text>
                            )}
                        </View>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>User Referendums</Text>
                            {renderUserReferendums().length > 0 ? (
                                renderUserReferendums()
                            ) : (
                                <Text style={styles.noActivity}>No referendums found</Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                            <Ionicons name="log-out-outline" size={20} color="#fff" />
                            <Text style={styles.signOutButtonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Animatable.View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DC3545',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    signOutButtonText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
})

export default ProfileScreen