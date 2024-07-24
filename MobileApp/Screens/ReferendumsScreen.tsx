import React from 'react'
import {View, Text, Image, Button, StyleSheet, FlatList} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation' // Adjust the import path according to your project structure

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
        image: 'https://images.pexels.com/photos/1904076/pexels-photo-1904076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: '2',
        title: 'Education Referendum',
        description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
        image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: '3',
        title: 'Healthcare Referendum',
        description: 'Cast your vote on a proposal designed to overhaul prescription drug policy, addressing price negotiations, drug importation, cost caps, pricing transparency, and annual price increase control.',
        image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
]

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const renderItem = ({item}: {item: Referendum}) => (
        <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Vote Now" onPress={() => handleVote(item.id)} color="#007BFF" />
                <Button title="Learn More" onPress={() => handleLearnMore(item.id)} color="#6C757D" />
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
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default ReferendumsScreen