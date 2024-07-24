import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'
import {LandingPageProps} from '../Infra/Navigation'

const LandingPage: React.FC<LandingPageProps> = ({navigation}) =>
{
    const userName = useSelector((state: RootState) => state.user.name)

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

    const handleProfile = () =>
    {
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to VoteMaster</Text>
            <View style={styles.buttonContainer}>
                <Button title="Profile" onPress={handleProfile} color="#007BFF" />
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
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
})

export default LandingPage