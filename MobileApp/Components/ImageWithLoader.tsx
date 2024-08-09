import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ImageSourcePropType} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {useSelector, useDispatch} from 'react-redux'
import {markImageAsLoaded} from '../Redux/ImageLoaderSlice'
import {AppDispatch, RootState} from '../Redux/Store'

interface ImageWithLoaderProps
{
    source: ImageSourcePropType
    style?: any
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({source, style}) =>
{
    const dispatch = useDispatch<AppDispatch>()
    const sourceKey = JSON.stringify(source)
    const isLoaded = useSelector((state: RootState) => state.imageLoader.loadedImages[sourceKey])
    const [loading, setLoading] = useState(!isLoaded)

    useEffect(() =>
    {
        if (!isLoaded)
        {
            const timer = setTimeout(() =>
            {
                setLoading(false)
                dispatch(markImageAsLoaded({source: sourceKey}))
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isLoaded, dispatch, sourceKey])

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