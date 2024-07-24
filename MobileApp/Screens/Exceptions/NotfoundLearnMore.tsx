import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const NotFoundLearnMore: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Unknown Referendum</Text>
        <Text style={styles.description}>This referendum does not have a learn more section yet.</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
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

export default NotFoundLearnMore