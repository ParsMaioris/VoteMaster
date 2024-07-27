import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {clearUserName} from '../Redux/UserSlice'
import {fetchVotesByUserId} from '../Redux/VoteSlice'
import {getReferendumById} from '../Redux/ReferendumSlice'
import {Ionicons} from '@expo/vector-icons'
import useReferendumHelper from '../Hooks/useReferendumHelper'

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const userName = useSelector((state: RootState) => state.user.name)
    const userId = useSelector((state: RootState) => state.user.id)
    const votes = useSelector((state: RootState) => state.vote.votes)
    const referendums = useSelector((state: RootState) => state.referendum.referendumMap)
    const [loading, setLoading] = useState(true)
    const ownedReferendums = useReferendumHelper()

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            if (userId)
            {
                await dispatch(fetchVotesByUserId(userId))
                const votePromises = votes.map(vote => dispatch(getReferendumById(vote.referendumId)))
                await Promise.all(votePromises)
                setLoading(false)
            }
        }
        fetchData()
    }, [dispatch, userId, votes])

    const handleSignOut = () =>
    {
        dispatch(clearUserName())
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
                <View key={vote.id} style={styles.activityItemContainer}>
                    <Text style={styles.activityItem}>
                        Voted on {referendum ? referendum.title : 'Unknown Referendum'}
                    </Text>
                </View>
            )
        })
    }

    const renderUserReferendums = () =>
    {
        return ownedReferendums.map(ref => (
            <View key={ref.id} style={styles.referendumItemContainer}>
                <Text style={styles.referendumItem}>
                    {ref.title}
                </Text>
            </View>
        ))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
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
                <Text style={styles.sectionTitle}>User Referendums</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007BFF" />
                ) : renderUserReferendums().length > 0 ? (
                    renderUserReferendums()
                ) : (
                    <Text style={styles.noActivity}>No referendums found</Text>
                )}
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007BFF" />
                ) : votes.length > 0 ? (
                    renderVoteActivity()
                ) : (
                    <Text style={styles.noActivity}>No recent activity</Text>
                )}
            </View>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F7',
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#007BFF',
        padding: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    profileIcon: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
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
        padding: 15,
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