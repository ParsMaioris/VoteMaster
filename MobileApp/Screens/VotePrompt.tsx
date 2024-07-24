import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectUserId} from '../Redux/UserSlice'
import {submitVote} from '../Redux/VoteSlice'
import {AppDispatch} from '../Redux/Store'

interface VotePromptProps
{
    referendumId: string
}

const VotePrompt: React.FC<VotePromptProps> = ({referendumId}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const userId = useSelector(selectUserId)

    const handleVote = (vote: 'yes' | 'no') =>
    {
        if (userId)
        {
            dispatch(submitVote({userId, referendumId, vote}))
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>Do you support this referendum?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleVote('yes')}>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleVote('no')}>
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
})

export default VotePrompt