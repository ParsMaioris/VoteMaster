import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ImageSourcePropType, Dimensions} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
import {LinearGradient} from 'expo-linear-gradient'

interface ImageWithLoaderProps
{
    source: ImageSourcePropType
    style?: any
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({source, style}) =>
{
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <View style={[styles.container, style]}>
            {loading && (
                <LinearGradient
                    colors={['#d1ebff', '#97bce0']}
                    style={styles.gradientBackground}
                >
                    <LottieView
                        source={require('../assets/loading-animation.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                </LinearGradient>
            )}
            {!loading && (
                <Animatable.Image
                    animation="fadeIn"
                    duration={2000}
                    source={source}
                    style={style}
                    onLoadEnd={() => setLoading(false)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 100,
        height: 100,
    },
})

export default ImageWithLoader