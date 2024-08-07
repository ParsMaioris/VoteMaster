import React, {useEffect, useRef} from 'react'
import {View, Text, StyleSheet, Image, Animated, Dimensions} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

const {width, height} = Dimensions.get('window')

const SplashScreen: React.FC = () =>
{
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() =>
    {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start()
    }, [fadeAnim])

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    accessibilityLabel="VoteMaster logo"
                    onError={(e) => console.log('Error loading image', e.nativeEvent.error)}
                />
                <Text style={styles.headerText}>VoteMaster</Text>
                <Text style={styles.contextText}>Powered by</Text>
                <Text style={styles.boldText}>Direct Democracy Corporation</Text>
            </Animated.View>
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
    },
    logo: {
        width: width * 0.4,
        height: width * 0.4,
        marginBottom: height * 0.02,
    },
    headerText: {
        fontSize: width * 0.09,
        fontWeight: '700',
        color: '#1C1C1E',
        textAlign: 'center',
        marginBottom: height * 0.01,
        fontFamily: 'Helvetica Neue',
    },
    contextText: {
        fontSize: width * 0.04,
        fontWeight: '400',
        color: '#8E8E93',
        textAlign: 'center',
        fontFamily: 'Helvetica Neue',
    },
    boldText: {
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#007FFF',
        textAlign: 'center',
        fontFamily: 'Helvetica Neue',
    },
})

export default SplashScreen