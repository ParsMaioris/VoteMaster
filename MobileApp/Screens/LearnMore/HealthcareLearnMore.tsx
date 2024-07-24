import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const HealthcareLearnMore: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Healthcare Referendum</Text>
        <Text style={styles.description}>Learn more about the Healthcare Referendum...</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666',
        textAlign: 'center',
    },
})

export default HealthcareLearnMore