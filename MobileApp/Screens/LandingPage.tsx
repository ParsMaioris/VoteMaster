import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {LandingPageProps} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'

const LandingPage: React.FC<LandingPageProps> = ({navigation}) =>
{
    const handleViewReferendums = () =>
    {
        navigation.navigate('Referendums')
    }

    const handleProfile = () =>
    {
        navigation.navigate('Profile')
    }

    const handleProposeReferendum = () =>
    {
        // Navigate to propose referendum screen
        // navigation.navigate('ProposeReferendum');
    }

    const handleInviteVoter = () =>
    {
        navigation.navigate('InviteVoter')
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.headerText}>VoteMaster</Text>
            <Text style={styles.contextText}>Prototype for a Better Democracy</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleProfile}>
                    <Ionicons name="person-circle-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleViewReferendums}>
                    <Ionicons name="document-text-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>View Referendums</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleProposeReferendum}>
                    <Ionicons name="create-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Propose Referendum</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleInviteVoter}>
                    <Ionicons name="person-add-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Invite Voter</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.tagline}>Designing the Future of Governance</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F7',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
    },
    contextText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 30,
        width: '90%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
    tagline: {
        fontSize: 18,
        fontWeight: '300',
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 30,
    },
})

export default LandingPage