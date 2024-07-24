import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'

type ReferendumDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ReferendumDetail'>

const ReferendumDetailScreen: React.FC<ReferendumDetailScreenProps> = ({route}) =>
{
    const {referendumId} = route.params

    return (
        <View style={styles.container}>
            <Text>Referendum Detail Screen</Text>
            <Text>Referendum ID: {referendumId}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})

export default ReferendumDetailScreen