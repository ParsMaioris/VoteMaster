import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const SplashScreen: React.FC = () =>
{
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.headerText}>VoteMaster</Text>
            <Text style={styles.contextText}>Powered by</Text>
            <Text style={styles.boldText}>Direct Democracy Corporation</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F7',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
    },
    contextText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
    },
    boldText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#003366',
        textAlign: 'center',
    },
})

export default SplashScreen