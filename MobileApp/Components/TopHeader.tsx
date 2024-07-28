import React from 'react'
import {View, StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

const TopHeader: React.FC = () =>
{
    return (
        <LinearGradient colors={['#edf4ff', '#f7f9fc']} style={styles.headerContainer}>
            <View style={styles.decorativeElement} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 50, // Adjust height as needed
        width: '100%',
    },
    decorativeElement: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 122, 255, 0.2)', // Semi-transparent blue background for visual appeal
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
})

export default TopHeader