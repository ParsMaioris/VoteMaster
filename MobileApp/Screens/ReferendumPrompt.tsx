import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'

type ReferendumPromptScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReferendumPrompt'>
type ReferendumPromptScreenRouteProp = RouteProp<RootStackParamList, 'ReferendumPrompt'>

type Props = {
    navigation: ReferendumPromptScreenNavigationProp
    route: ReferendumPromptScreenRouteProp
}

const ReferendumPrompt: React.FC<Props> = ({navigation, route}) =>
{
    const {referendumId} = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Referendum Prompt</Text>
            <Text style={styles.description}>You are about to vote on Referendum ID: {referendumId}</Text>
            <TouchableOpacity
                style={styles.voteButton}
                onPress={() =>
                {
                    // Handle the voting process here
                    console.log('Vote confirmed for Referendum ID:', referendumId)
                    navigation.goBack()
                }}
            >
                <Text style={styles.buttonText}>Confirm Vote</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 40,
        textAlign: 'center',
    },
    voteButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
})

export default ReferendumPrompt