import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'
import {RootStackParamList} from '../Infra/Navigation'
import useEligibility from '../Hooks/useEligibility'
import {selectUserId} from '../Redux/UserSlice'

interface Referendum
{
    id: string
    title: string
    description: string
    image: string
}

type ReferendumsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Referendums'>

type Props = {
    navigation: ReferendumsScreenNavigationProp
}

const referendums: Referendum[] = [
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762943',
        title: 'Infrastructure Referendum',
        description: 'Vote on a proposed tax reform that aims to fund public infrastructure improvements and social welfare programs.',
        image: 'https://images.pexels.com/photos/6931306/pexels-photo-6931306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: 'a68d20bb-483b-4f34-889e-94e9054007f7',
        title: 'Education Referendum',
        description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
        image: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '7d918783-073f-4b99-bc38-0ee9a7762940',
        title: 'Healthcare Referendum',
        description: 'Cast your vote on a proposal designed to overhaul prescription drug policy, addressing price negotiations, drug importation, cost caps, pricing transparency, and annual price increase control.',
        image: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
]

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const userId = useSelector(selectUserId)
    const {
        isUserEligibleForReferendum,
        addUserRequestForReferendum,
        isReferendumPendingForUser,
    } = useEligibility()

    const handleVote = (id: string) =>
    {
        navigation.navigate('ReferendumPrompt', {referendumId: id})
    }

    const handleLearnMore = (id: string) =>
    {
        navigation.navigate('ReferendumDetail', {referendumId: id})
    }

    const handleRequestVote = (id: string) =>
    {
        addUserRequestForReferendum(userId, id)
    }

    const eligibleReferendums = referendums.filter(item => isUserEligibleForReferendum(userId, item.id))
    const otherReferendums = referendums.filter(item => !isUserEligibleForReferendum(userId, item.id))

    const renderItem = ({item}: {item: Referendum}) =>
    {
        const isEligibleToVote = isUserEligibleForReferendum(userId, item.id)
        const isPendingApproval = isReferendumPendingForUser(userId, item.id)

        return (
            <View style={styles.card}>
                <Image source={{uri: item.image}} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.buttonContainer}>
                    {isEligibleToVote ? (
                        <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.id)}>
                            <Text style={styles.buttonText}>Vote Now</Text>
                        </TouchableOpacity>
                    ) : isPendingApproval ? (
                        <TouchableOpacity style={styles.pendingButton} disabled>
                            <Text style={styles.buttonText}>Pending</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.requestButton} onPress={() => handleRequestVote(item.id)}>
                            <Text style={styles.buttonText}>Request to Vote</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.id)}>
                        <Text style={styles.buttonText}>Learn More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={[...eligibleReferendums, ...otherReferendums]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#F0F2F5',
    },
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#3A3A3C',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    voteButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 5,
        shadowColor: '#007AFF',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    requestButton: {
        flex: 1,
        backgroundColor: '#0056D2',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 5,
        shadowColor: '#0056D2',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    pendingButton: {
        flex: 1,
        backgroundColor: '#8E8E93',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 5,
        shadowColor: '#8E8E93',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    learnButton: {
        flex: 1,
        backgroundColor: '#34C759',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 5,
        shadowColor: '#34C759',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default ReferendumsScreen