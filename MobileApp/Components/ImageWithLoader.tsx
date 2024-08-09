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
    return (
        <View style={[styles.container, style]}>
            <Animatable.Image
                animation="fadeIn"
                duration={2000}
                source={source}
                style={style}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b0d4f1',
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