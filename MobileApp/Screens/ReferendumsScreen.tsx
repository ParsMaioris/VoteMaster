import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'

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
        id: '1',
        title: 'Infrastructure Referendum',
        description: 'Vote on a proposed tax reform that aims to fund public infrastructure improvements and social welfare programs.',
        image: 'https://images.pexels.com/photos/6931306/pexels-photo-6931306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '2',
        title: 'Education Referendum',
        description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
        image: 'https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '3',
        title: 'Healthcare Referendum',
        description: 'Cast your vote on a proposal designed to overhaul prescription drug policy, addressing price negotiations, drug importation, cost caps, pricing transparency, and annual price increase control.',
        image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
]

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const renderItem = ({item}: {item: Referendum}) => (
        <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.id)}>
                    <Text style={styles.buttonText}>Vote Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.id)}>
                    <Text style={styles.buttonText}>Learn More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const handleVote = (id: string) =>
    {
        // Handle vote action
        console.log('Vote for referendum:', id)
    }

    const handleLearnMore = (id: string) =>
    {
        // Navigate to detailed referendum page
        navigation.navigate('ReferendumDetail', {referendumId: id})
    }

    return (
        <FlatList
            data={referendums}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#f0f0f5',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 21,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    description: {
        fontSize: 17,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    voteButton: {
        flex: 1,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginRight: 5,
    },
    learnButton: {
        flex: 1,
        backgroundColor: '#6C757D',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
})

export default ReferendumsScreen