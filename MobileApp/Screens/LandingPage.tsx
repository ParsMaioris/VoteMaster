import React from 'react'
import {View, Text} from 'react-native'
import {LandingPageProps} from '../Infra/Navigation'

const LandingPage: React.FC<LandingPageProps> = ({route}) =>
{
    const {userName} = route.params

    return (
        <View>
            <Text>Welcome to VoteMaster, {userName}!</Text>
        </View>
    )
}

export default LandingPage