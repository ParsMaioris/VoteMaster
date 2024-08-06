import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {LinearGradient} from 'expo-linear-gradient'

const ErrorScreen: React.FC = () =>
{
    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Animatable.View animation="fadeIn" duration={1500} style={styles.content}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={2000}
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                />
                <Animatable.Text animation="fadeInUp" duration={1500} style={styles.headerText}>
                    Oops!
                </Animatable.Text>
                <Animatable.Text animation="fadeInUp" duration={1500} style={styles.contextText}>
                    Something went wrong. Sorry about that. We are going to fix this as soon as possible.
                </Animatable.Text>
                <Animatable.Text animation="fadeInUp" duration={1500} style={styles.tagline}>
                    Something unexpected has happened.
                </Animatable.Text>
            </Animatable.View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 25,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'serif',
    },
    contextText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'sans-serif',
    },
    tagline: {
        fontSize: 18,
        fontWeight: '300',
        color: '#0056b3',
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
    },
})

export default ErrorScreen