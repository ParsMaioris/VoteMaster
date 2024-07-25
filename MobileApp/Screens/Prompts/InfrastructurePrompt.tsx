import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import VotePrompt from '../VotePrompt'

interface InfrastructurePromptProps
{
    referendumId: string
}

const InfrastructurePrompt: React.FC<InfrastructurePromptProps> = ({referendumId}) =>
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
                    <Image source={require('../../assets/infrastructure.png')} style={styles.image} />
                </View>
                <Text style={styles.title}>Proposition 99: Improving Infrastructure</Text>
                <Text style={styles.subtitle}>Official Patagonia Referendum</Text>
            </View>
            <Text style={styles.description}>
                Proposition 99 aims to improve infrastructure by increasing funding and implementing new policies to ensure
                better development and maintenance. The proposition includes provisions to:
            </Text>
            <TouchableOpacity onPress={toggleDetails}>
                <Text style={styles.toggleButton}>{showDetails ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.details}>
                    <Text style={styles.listItem}>• Increase funding for road and bridge repairs</Text>
                    <Text style={styles.listItem}>• Expand public transportation networks</Text>
                    <Text style={styles.listItem}>• Improve water and sewage systems</Text>
                    <Text style={styles.listItem}>• Enhance urban planning and development projects</Text>
                    <Text style={styles.description}>
                        Voting "Yes" means you support these changes to improve infrastructure in Patagonia.
                        Voting "No" means you oppose these changes and prefer to maintain the current infrastructure structure.
                    </Text>
                </View>
            )}
            <VotePrompt referendumId={referendumId} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#d1d1d1',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        fontWeight: '300',
        color: '#666666',
        marginBottom: 20,
        textAlign: 'center',
    },
    listItem: {
        fontSize: 16,
        fontWeight: '300',
        color: '#666666',
        marginBottom: 10,
    },
    toggleButton: {
        fontSize: 16,
        color: '#1e90ff',
        textAlign: 'center',
        marginBottom: 20,
    },
    details: {
        paddingLeft: 10,
    },
})

export default InfrastructurePrompt