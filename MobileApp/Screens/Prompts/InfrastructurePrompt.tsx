import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const InfrastructurePrompt: React.FC = () =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Infrastructure Referendum</Text>
            <Text style={styles.description}>Details about the infrastructure referendum and the voting prompt...</Text>
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
        textAlign: 'center',
    },
})

export default InfrastructurePrompt