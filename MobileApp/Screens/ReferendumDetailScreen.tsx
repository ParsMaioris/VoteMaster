import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import InfrastructureLearnMore from './LearnMore/InfrastructureLearnMore'
import EducationLearnMore from './LearnMore/EducationLearnMore'
import HealthcareLearnMore from './LearnMore/HealthcareLearnMore'
import NotFoundLearnMore from './Exceptions/NotfoundLearnMore'

type ReferendumDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ReferendumDetail'>

const ReferendumDetailScreen: React.FC<ReferendumDetailScreenProps> = ({route}) =>
{
    const {referendumId} = route.params

    const renderLearnMoreScreen = () =>
    {
        switch (referendumId)
        {
            case '1':
                return <InfrastructureLearnMore />
            case '2':
                return <EducationLearnMore />
            case '3':
                return <HealthcareLearnMore />
            default:
                return <NotFoundLearnMore />
        }
    }

    return <View style={styles.container}>{renderLearnMoreScreen()}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666666',
        textAlign: 'center',
    },
})

export default ReferendumDetailScreen