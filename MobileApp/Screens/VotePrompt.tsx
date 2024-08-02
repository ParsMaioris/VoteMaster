import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectUserId, selectUserName} from '../Redux/UserSlice'
import {submitVote, fetchVotesByUserId, selectVotesByUserId} from '../Redux/VoteSlice'
import {AppDispatch, RootState} from '../Redux/Store'
import {selectReferendumById} from '../Redux/ReferendumSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'

interface VotePromptProps
{
    referendumId: string
}

const VotePrompt: React.FC<VotePromptProps> = ({referendumId}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const userId = useSelector(selectUserId)
    const userName = useSelector(selectUserName)
    const referendum = useSelector((state: RootState) => selectReferendumById(state, referendumId))
    const votes = useSelector(selectVotesByUserId)
    const referendumTitle = referendum?.title as string
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const isExpired = referendum && new Date(referendum.endTime!) < new Date()


    useEffect(() =>
    {
        if (userId)
        {
            dispatch(fetchVotesByUserId(userId)).then(() => setLoading(false))
        }
    }, [dispatch, userId])

    const hasVoted = votes.some(vote => vote.referendumId === referendumId)

    const handleVote = (voteChoice: boolean) =>
    {
        if (userId)
        {
            setSubmitting(true)
            dispatch(submitVote({userId, userName, referendumId, referendumTitle, voteChoice}))
                .unwrap()
                .then(() =>
                {
                    setMessage('Your vote has been successfully submitted.')
                    setTimeout(() =>
                    {
                        setSubmitting(false)
                        navigation.goBack()
                    }, 2000)
                })
                .catch(() =>
                {
                    setMessage('There was an error submitting your vote. Please try again.')
                    setSubmitting(false)
                })
        }
    }

    if (isExpired)
        return (null)

    if (loading || submitting)
    {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
        )
    }

    if (hasVoted)
    {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>You have already voted for this referendum.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>Do you support this referendum?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleVote(true)}>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleVote(false)}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        color: 'green',
        textAlign: 'center',
        marginTop: 20,
    },
})

export default VotePrompt