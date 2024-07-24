import React from 'react'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import SignInScreen from '../Screens/SignInScreen'
import LandingPage from '../Screens/LandingPage'

export type RootStackParamList = {
    SignIn: undefined
    LandingPage: {userId: string; userName: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigation