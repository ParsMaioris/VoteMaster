import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectUserId, selectUserName} from '../Redux/UserSlice'
import {submitVote} from '../Redux/VoteSlice'
import {AppDispatch, RootState} from '../Redux/Store'
import {selectReferendumById} from '../Redux/ReferendumSlice'

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
    const referendumTitle = referendum?.title as string

    const handleVote = (voteChoice: boolean) =>
    {
        if (userId)
        {
            dispatch(submitVote({userId, userName, referendumId, referendumTitle, voteChoice}))
        }
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
})

export default VotePrompt