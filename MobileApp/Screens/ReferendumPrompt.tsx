// ReferendumPromptScreen.tsx
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import InfrastructurePrompt from './Prompts/InfrastructurePrompt'
import EducationPrompt from './Prompts/EducationPrompt'
import HealthcarePrompt from './Prompts/HealthcarePrompt'
import NotFoundPrompt from './Exceptions/NotFoundPrompt'
import {useSelector} from 'react-redux'
import {selectReferendumById} from '../Redux/ReferendumSlice'
import {RootState} from '../Redux/Store'

type ReferendumPromptScreenProps = NativeStackScreenProps<RootStackParamList, 'ReferendumPrompt'>

const ReferendumPromptScreen: React.FC<ReferendumPromptScreenProps> = ({route}) =>
{
    const {referendumId} = route.params

    const referendum = useSelector((state: RootState) => selectReferendumById(state, referendumId))
    const referendumKey = referendum?.key

    const renderPromptScreen = () =>
    {
        if (referendumKey === 'infrastructure')
            return <InfrastructurePrompt referendumId={referendumId} />
        else if (referendumKey === 'education')
            return <EducationPrompt referendumId={referendumId} />
        else if (referendumKey === 'healthcare')
            return <HealthcarePrompt referendumId={referendumId} />
        else
            return <NotFoundPrompt />
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