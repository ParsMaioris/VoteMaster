import React from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {PieChart} from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const data = [
    {
        name: 'Roads and Bridges',
        population: 50,
        color: '#FF6384',
        legendFontColor: '#7F7F7F',
        legendFontSize: 0,
        labels: [],
    },
    {
        name: 'Public Transportation',
        population: 30,
        color: '#36A2EB',
        legendFontColor: '#7F7F7F',
        legendFontSize: 0,
        labels: [],
    },
    {
        name: 'Social Programs',
        population: 70,
        color: '#FFCE56',
        legendFontColor: '#7F7F7F',
        legendFontSize: 0,
        labels: [],
    },
]

const totalPopulation = data.reduce((sum, item) => sum + item.population, 0)

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
}

const PieChartComponent: React.FC = () =>
{
    const paddingLeft = `${screenWidth / 4}`

    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth * 0.8}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft={paddingLeft}
                absolute
                hasLegend={false}
            />
        </View>
    )
}

const InfrastructureLearnMore: React.FC = () => (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.description}>
            The <Text style={styles.highlight}>Mock Referendum</Text> introduces a transformative tax reform designed to fund public infrastructure upgrades and social welfare initiatives. This initiative will elevate the quality of public services and foster sustainable development, which will generate an additional $150 million annually.
        </Text>

        <Text style={styles.sectionTitle}>Pros and Cons</Text>
        <View style={styles.prosConsContainer}>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Enhanced public infrastructure</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Increased funding for social programs</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
                <Text style={styles.prosConsText}>Long-term economic growth</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>2.5% tax increase</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>Potential fund mismanagement</Text>
            </View>
            <View style={styles.prosCons}>
                <Ionicons name="close-circle-outline" size={24} color="#FF3B30" />
                <Text style={styles.prosConsText}>Short-term economic impact</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>Financial Impact</Text>
        <PieChartComponent />

        <View style={styles.legendContainer}>
            {data.map((item, index) =>
            {
                const percentage = ((item.population / totalPopulation) * 100).toFixed(2)
                return (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, {backgroundColor: item.color}]} />
                        <Text style={styles.legendText}>{`${item.name} (${percentage}%)`}</Text>
                    </View>
                )
            })}
        </View>
        <Text style={styles.description}>
            The proposed improvements are estimated to cost $1.5 billion over the next decade. The tax reform aims to finance these costs without significantly affecting other budgetary allocations.
        </Text>

        <Text style={styles.sectionTitle}>What a "Yes" Vote Means</Text>
        <Text style={styles.description}>
            A "Yes" vote endorses the tax reform, enabling funding for public infrastructure and social programs through a 2.5% tax increase. This measure is expected to raise $150 million annually for these critical projects.
        </Text>

        <Text style={styles.sectionTitle}>What a "No" Vote Means</Text>
        <Text style={styles.description}>
            A "No" vote rejects the tax reform, opposing the proposed increase in taxes for infrastructure and social programs. The city will need to explore alternative funding solutions, potentially delaying or scaling back planned projects.
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
    legendContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    legendColor: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 10,
    },
    legendText: {
        fontSize: 15,
        color: '#333',
    },
})

export default InfrastructureLearnMore