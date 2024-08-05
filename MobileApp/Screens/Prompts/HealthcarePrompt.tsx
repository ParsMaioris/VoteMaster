import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native'
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
                <Text style={styles.subtitle}>Mock Referendum for Demonstration</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>
                    Proposition 78 aims to improve healthcare services by increasing funding and implementing new policies to ensure
                    better access and quality of care. The proposition includes provisions to:
                </Text>
                <TouchableOpacity onPress={toggleDetails} style={styles.button}>
                    <Text style={styles.buttonText}>{showDetails ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity>
                {showDetails && (
                    <View style={styles.details}>
                        <Text style={styles.listItem}>• Increase funding for hospitals and clinics</Text>
                        <Text style={styles.listItem}>• Expand access to affordable healthcare services</Text>
                        <Text style={styles.listItem}>• Improve mental health and substance abuse programs</Text>
                        <Text style={styles.listItem}>• Implement preventive care initiatives</Text>
                        <Text style={styles.description}>
                            Voting "Yes" means you support these changes to improve healthcare services.
                            Voting "No" means you oppose these changes and prefer to maintain the current healthcare structure.
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

export default HealthcarePrompt