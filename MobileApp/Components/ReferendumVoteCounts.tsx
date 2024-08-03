import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import
{
    fetchYesVotesByReferendum,
    fetchNoVotesByReferendum,
    fetchTotalVotesByReferendum,
    selectYesVotes,
    selectNoVotes,
    selectTotalVotes,
    selectVoteStatus,
    selectVoteError,
} from '../Redux/VoteSlice'
import {AppDispatch} from '../Redux/Store'

interface ReferendumVoteCountsProps
{
    referendumId: string
}

const ReferendumVoteCounts: React.FC<ReferendumVoteCountsProps> = ({referendumId}) =>
{
    const dispatch = useDispatch<AppDispatch>()

    const yesVotes = useSelector(selectYesVotes)
    const noVotes = useSelector(selectNoVotes)
    const totalVotes = useSelector(selectTotalVotes)
    const status = useSelector(selectVoteStatus)
    const error = useSelector(selectVoteError)

    useEffect(() =>
    {
        dispatch(fetchYesVotesByReferendum(referendumId))
        dispatch(fetchNoVotesByReferendum(referendumId))
        dispatch(fetchTotalVotesByReferendum(referendumId))
    }, [dispatch, referendumId])

    if (status === 'loading')
    {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        )
    }

    if (error)
    {
        return <Text style={styles.errorText}>Error: {error}</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.voteContainer}>
                <View style={styles.voteItem}>
                    <Text style={styles.label}>Yes</Text>
                    <Text style={styles.voteCount}>{yesVotes}</Text>
                </View>
                <View style={styles.voteItem}>
                    <Text style={styles.label}>No</Text>
                    <Text style={styles.voteCount}>{noVotes}</Text>
                </View>
                <View style={styles.voteItem}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.voteCount}>{totalVotes}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f5', // Subtle and neutral background color
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        margin: 10,
        alignItems: 'center',
    },
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap', // Allow items to wrap to the next line if needed
    },
    voteItem: {
        alignItems: 'center',
        padding: 10,
        minWidth: '30%', // Ensure each item takes at least 30% of the container width
        marginVertical: 5, // Add vertical margin to separate items in case they wrap
    },
    label: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center', // Center align text within each vote item
    },
    voteCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 4,
        textAlign: 'center', // Center align text within each vote item
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ReferendumVoteCounts