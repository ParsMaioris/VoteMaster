import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {LandingPageProps} from '../Infra/Navigation'

const LandingPage: React.FC<LandingPageProps> = ({route, navigation}) =>
{
    const {userName} = route.params

    const handleSignOut = () =>
    {
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        })
    }

    const handleViewReferendums = () =>
    {
        navigation.navigate('Referendums')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to VoteMaster, {userName}!</Text>
            <View style={styles.buttonContainer}>
                <Button title="View Referendums" onPress={handleViewReferendums} color="#007BFF" />
                <Button title="Sign Out" onPress={handleSignOut} color="#DC3545" />
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
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        width: '40%',
    },
})

export default LandingPage