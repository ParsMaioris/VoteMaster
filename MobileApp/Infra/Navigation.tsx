import React from 'react'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import SignInScreen from '../Screens/SignInScreen'
import LandingPage from '../Screens/LandingPage'
import ReferendumsScreen from '../Screens/ReferendumsScreen'
import ReferendumDetailScreen from '../Screens/ReferendumDetailScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import ReferendumPrompt from '../Screens/ReferendumPrompt'
import {ActivityIndicator, View} from 'react-native'
import useInitialRoute from './useInitialRoute'

export type RootStackParamList = {
    SignIn: undefined
    LandingPage: {userId: string; userName: string}
    Referendums: undefined
    ReferendumDetail: {referendumId: string},
    Profile: undefined,
    ReferendumPrompt: {referendumId: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>

const Navigation: React.FC = () =>
{
    const initialRouteName = useInitialRoute()

    if (initialRouteName === null)
    {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="LandingPage" component={LandingPage} options={{title: 'Home', headerShown: false}} />
                <Stack.Screen name="Referendums" component={ReferendumsScreen} />
                <Stack.Screen name="ReferendumDetail" component={ReferendumDetailScreen} options={{title: ''}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{title: ''}} />
                <Stack.Screen name="ReferendumPrompt" component={ReferendumPrompt} options={{title: ''}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation