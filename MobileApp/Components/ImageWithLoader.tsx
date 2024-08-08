import React, {useState} from 'react'
import {View, Image, ActivityIndicator, StyleSheet, ImageSourcePropType} from 'react-native'

interface ImageWithLoaderProps
{
    source: ImageSourcePropType
    style?: any
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({source, style}) =>
{
    const [loading, setLoading] = useState(true)

    return (
        <View style={[styles.container, style]}>
            {loading && (
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
            )}
            <Image
                source={source}
                style={[style, loading && styles.hiddenImage]}
                onLoadEnd={() => setLoading(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        position: 'absolute',
        zIndex: 1,
    },
    hiddenImage: {
        opacity: 0,
    },
})

export default ImageWithLoader