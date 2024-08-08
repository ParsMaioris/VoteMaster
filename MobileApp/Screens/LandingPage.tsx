import React, {useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {LandingPageProps} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import BottomNavigation from '../Components/BottomNavigation'
import usePopulateEligibilityMap from '../Hooks/usePopulateEligibilityMap'
import LottieView from 'lottie-react-native'

const LandingPage: React.FC<LandingPageProps> = ({navigation}) =>
{
    const {loading, userError, referendumStatus, eligibilityStatus} = usePopulateEligibilityMap()

    useEffect(() =>
    {
        if (userError || referendumStatus === 'failed' || eligibilityStatus === 'failed')
        {
            navigation.navigate('ErrorScreen')
        }
    }, [userError, referendumStatus, eligibilityStatus, navigation])

    const handleProposeReferendum = () =>
    {
        navigation.navigate('ProposeReferendumForm')
    }

    const handleInviteVoter = () =>
    {
        navigation.navigate('InviteVoter')
    }

    if (loading)
    {
        return (
            <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
                <View style={styles.loaderContainer}>
                    <LottieView
                        source={require('../assets/loading-animation.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </View>
            </LinearGradient>
        )
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.headerText}>VoteMaster</Text>
                <Text style={styles.contextText}>Prototype for a Better Democracy</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.proposeButton]} onPress={handleProposeReferendum}>
                        <Ionicons name="create-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Propose Referendum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.inviteButton]} onPress={handleInviteVoter}>
                        <Ionicons name="person-add-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Add Participant</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.tagline}>Designing the Future of Governance</Text>
            </View>
            <View style={styles.bottomNavigationWrapper}>
                <BottomNavigation />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottomNavigationWrapper: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 25,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 8,
    },
    contextText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginVertical: 12,
        borderRadius: 30,
        width: '90%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    proposeButton: {
        backgroundColor: '#007BFF',
    },
    inviteButton: {
        backgroundColor: '#007BFF',
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
        color: '#0056b3',
        textAlign: 'center',
        position: 'absolute',
        bottom: '15%',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    lottie: {
        width: 200,
        height: 200,
    },
})

export default LandingPage