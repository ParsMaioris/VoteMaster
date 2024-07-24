import React from 'react'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import SignInScreen from '../Screens/SignInScreen'
import LandingPage from '../Screens/LandingPage'
import ReferendumsScreen from '../Screens/ReferendumsScreen'
import ReferendumDetailScreen from '../Screens/ReferendumDetailScreen'
import ProfileScreen from '../Screens/ProfileScreen'

export type RootStackParamList = {
    SignIn: undefined
    LandingPage: {userId: string; userName: string}
    Referendums: undefined
    ReferendumDetail: {referendumId: string},
    Profile: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="LandingPage" component={LandingPage} options={{title: 'Home', headerShown: false}} />
            <Stack.Screen name="Referendums" component={ReferendumsScreen} />
            <Stack.Screen name="ReferendumDetail" component={ReferendumDetailScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigation