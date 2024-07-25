import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const HealthcareLearnMore: React.FC = () => (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.description}>
            The <Text style={styles.highlight}>Healthcare Referendum</Text> aims to significantly enhance healthcare services in Patagonia. This initiative focuses on increasing funding for hospitals and clinics, expanding access to affordable healthcare, improving mental health and substance abuse programs, and implementing preventive care initiatives.
        </Text>

        <Text style={styles.financialImpactTitle}>Financial Impact</Text>
        <Text style={styles.description}>
            The proposed investments are estimated to cost $3 billion over the next decade. The funding plan aims to cover these costs through a combination of tax reforms and reallocations without significantly impacting other budgetary areas.
        </Text>

        <Text style={styles.sectionTitle}>Pros and Cons</Text>
        <View style={styles.prosConsContainer}>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Increased funding for hospitals and clinics</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Expanded access to affordable healthcare</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Improved mental health and substance abuse programs</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Implementation of preventive care initiatives</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>Potential increase in taxes</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>Risk of misallocation of funds</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>What a "Yes" Vote Means</Text>
        <Text style={styles.description}>
            A "Yes" vote supports the funding increase and policy changes aimed at improving healthcare services, which is expected to generate an additional $300 million annually for the healthcare sector.
        </Text>

        <Text style={styles.sectionTitle}>What a "No" Vote Means</Text>
        <Text style={styles.description}>
            A "No" vote rejects the proposed funding increase, requiring the healthcare sector to seek alternative funding solutions, potentially delaying or limiting the proposed improvements.
        </Text>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    highlight: {
        fontWeight: '600',
        fontSize: 20,
        color: '#000',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        marginTop: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
        lineHeight: 26,
    },
    prosConsContainer: {
        marginTop: 15,
    },
    prosCons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    prosConsText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#333',
    },
    financialImpactTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
    },
})

export default HealthcareLearnMore