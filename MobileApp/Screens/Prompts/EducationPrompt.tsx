import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import ImageWithLoader from '../../Components/ImageWithLoader' // Adjust the path as necessary
import VotePrompt from '../VotePrompt'

interface EducationPromptProps
{
    referendumId: string
}

const EducationPrompt: React.FC<EducationPromptProps> = ({referendumId}) =>
{
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () =>
    {
        setShowDetails(!showDetails)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <ImageWithLoader source={require('../../assets/education.png')} style={styles.image} />
                </View>
                <Text style={styles.title}>Proposition 52: Enhancing Education Funding</Text>
                <Text style={styles.subtitle}>Mock Referendum for Demonstration</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    Proposition 52 aims to increase funding for public education by reallocating national budget resources
                    and introducing new measures to ensure accountability and effective use of funds.
                </Text>
                <TouchableOpacity onPress={toggleDetails} style={styles.button}>
                    <Text style={styles.buttonText}>{showDetails ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
                {showDetails && (
                    <View style={styles.details}>
                        <Text style={styles.listItem}>• Increase teacher salaries and improve teacher training programs</Text>
                        <Text style={styles.listItem}>• Enhance educational resources and infrastructure in underfunded schools</Text>
                        <Text style={styles.listItem}>• Implement new technology and digital tools to support student learning</Text>
                        <Text style={styles.listItem}>• Provide additional support for special education programs</Text>
                        <Text style={styles.description}>
                            Voting "Yes" means you support these changes to enhance the quality of education.
                            Voting "No" means you oppose these changes and prefer to maintain the current education funding structure.
                        </Text>
                    </View>
                )}
            </View>
            <VotePrompt referendumId={referendumId} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
    header: {
        width: Dimensions.get('window').width,
        backgroundColor: '#007AFF',
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#D1D1D6',
        textAlign: 'center',
    },
    content: {
        padding: 20,
    },
    description: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
    },
    details: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    listItem: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333333',
        marginBottom: 10,
        paddingLeft: 10,
    },
})

export default EducationPrompt