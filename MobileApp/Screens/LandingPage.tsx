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

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to VoteMaster, {userName}!</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
})

export default LandingPage