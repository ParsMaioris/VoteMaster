// ReferendumPromptScreen.tsx
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import InfrastructurePrompt from './Prompts/InfrastructurePrompt'
import EducationPrompt from './Prompts/EducationPrompt'
import HealthcarePrompt from './Prompts/HealthcarePrompt'
import NotFoundPrompt from './Exceptions/NotFoundPrompt'

type ReferendumPromptScreenProps = NativeStackScreenProps<RootStackParamList, 'ReferendumPrompt'>

const ReferendumPromptScreen: React.FC<ReferendumPromptScreenProps> = ({route}) =>
{
    const {referendumId} = route.params

    const renderPromptScreen = () =>
    {
        switch (referendumId)
        {
            case '1':
                return <InfrastructurePrompt />
            case '2':
                return <EducationPrompt />
            case '3':
                return <HealthcarePrompt />
            default:
                return <NotFoundPrompt />
        }
    }

    return <View style={styles.container}>{renderPromptScreen()}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
})

export default ReferendumPromptScreen