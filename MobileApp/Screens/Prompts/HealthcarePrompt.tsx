import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const HealthcarePrompt: React.FC = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Healthcare Referendum</Text>
            <Text style={styles.description}>Details about the healthcare referendum and the voting prompt...</Text>
            <TouchableOpacity style={styles.voteButton} onPress={() => { /* Handle vote confirmation here */}}>
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

export default HealthcarePrompt