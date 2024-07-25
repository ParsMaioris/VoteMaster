import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import VotePrompt from '../VotePrompt'

interface HealthcarePromptProps
{
    referendumId: string
}

const HealthcarePrompt: React.FC<HealthcarePromptProps> = ({referendumId}) =>
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
                    <Image source={require('../../assets/healthcare.png')} style={styles.image} />
                </View>
                <Text style={styles.title}>Proposition 78: Improving Healthcare Services</Text>
                <Text style={styles.subtitle}>Official Patagonia Referendum</Text>
            </View>
            <Text style={styles.description}>
                Proposition 78 aims to improve healthcare services by increasing funding and implementing new policies to ensure
                better access and quality of care. The proposition includes provisions to:
            </Text>
            <TouchableOpacity onPress={toggleDetails}>
                <Text style={styles.toggleButton}>{showDetails ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.details}>
                    <Text style={styles.listItem}>• Increase funding for hospitals and clinics</Text>
                    <Text style={styles.listItem}>• Expand access to affordable healthcare services</Text>
                    <Text style={styles.listItem}>• Improve mental health and substance abuse programs</Text>
                    <Text style={styles.listItem}>• Implement preventive care initiatives</Text>
                    <Text style={styles.description}>
                        Voting "Yes" means you support these changes to improve healthcare services in Patagonia.
                        Voting "No" means you oppose these changes and prefer to maintain the current healthcare structure.
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

export default HealthcarePrompt