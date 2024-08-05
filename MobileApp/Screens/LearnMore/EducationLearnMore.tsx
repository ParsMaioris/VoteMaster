import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import EducationBarChart from '../../Components/EducationBarChart'

const EducationLearnMore: React.FC = () => (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.description}>
            The <Text style={styles.highlight}>Mock Referendum</Text> proposes significant investments in the education sector to improve the quality of education for all students. This initiative includes raising funds for teacher salaries, school supplies, infrastructure improvements, and extracurricular activities.
        </Text>

        <Text style={styles.financialImpactTitle}>Financial Impact</Text>
        <EducationBarChart />
        <Text style={styles.description}>
            The proposed investments are estimated to cost $2 billion over the next decade. The tax reform aims to finance these costs without significantly affecting other budgetary allocations.
        </Text>

        <Text style={styles.sectionTitle}>Pros and Cons</Text>
        <View style={styles.prosConsContainer}>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Improved teacher salaries and retention</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Better quality school supplies</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Enhanced school infrastructure</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>More funding for extracurricular activities</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>3% tax increase</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>Potential for misallocation of funds</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>What a "Yes" Vote Means</Text>
        <Text style={styles.description}>
            A "Yes" vote supports the tax increase to fund improvements in teacher salaries, school supplies, infrastructure, and extracurricular activities. This measure is expected to generate an additional $200 million annually.
        </Text>

        <Text style={styles.sectionTitle}>What a "No" Vote Means</Text>
        <Text style={styles.description}>
            A "No" vote rejects the proposed tax increase, requiring the education sector to seek alternative funding solutions, potentially delaying or limiting the proposed improvements.
        </Text>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F7',
    },
    highlight: {
        fontWeight: '600',
        fontSize: 20,
        color: '#007AFF',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
        marginTop: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
        lineHeight: 26,
        marginBottom: 20,
    },
    prosConsContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    prosCons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    prosConsText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#333',
        flexShrink: 1,
    },
    financialImpactTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
})

export default EducationLearnMore