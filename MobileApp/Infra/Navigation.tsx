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
import VotersScreen from '../Screens/VotersScreen'
import VoterDetailScreen from '../Screens/VoterDetailScreen'
import InviteVoterScreen from '../Screens/InviteVoterScreen'
import ProposeReferendumForm from '../Screens/ProposeReferendumForm'
import RegistrationScreen from '../Screens/RegistrationScreen'
import ErrorScreen from '../Screens/ErrorScreen'
import ManageAccountPage from '../Screens/ManageAccountPage'
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen'
import SplashScreen from './SplashScreen'

export type RootStackParamList = {
    SignIn: undefined
    LandingPage: undefined
    Referendums: undefined
    ReferendumDetail: {referendumId: string},
    Profile: undefined,
    ReferendumPrompt: {referendumId: string}
    InviteVoter: undefined,
    VoterList: undefined
    VoterDetail: {id: string, name: string}
    ProposeReferendumForm: undefined
    Registration: undefined
    ErrorScreen: undefined
    ManageAccount: undefined
    ForgotPassword: undefined
    SplashScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export type LandingPageProps = NativeStackScreenProps<RootStackParamList, 'LandingPage'>
export type VoterDetailRouteProp = NativeStackScreenProps<RootStackParamList, 'VoterDetail'>

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
                <Stack.Screen name="SignIn" component={SignInScreen} options={{title: '', headerShown: false}} />
                <Stack.Screen name="LandingPage" component={LandingPage} options={{title: 'Home', headerShown: false}} />
                <Stack.Screen name="Referendums" component={ReferendumsScreen} options={{title: 'Referendums', headerShown: false}} />
                <Stack.Screen name="ReferendumDetail" component={ReferendumDetailScreen} options={{title: ''}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile', headerShown: false}} />
                <Stack.Screen name="ReferendumPrompt" component={ReferendumPrompt} options={{title: ''}} />
                <Stack.Screen name="VoterList" component={VotersScreen} options={{title: ''}} />
                <Stack.Screen name="VoterDetail" component={VoterDetailScreen} options={{title: ''}} />
                <Stack.Screen name="InviteVoter" component={InviteVoterScreen} options={{title: ''}} />
                <Stack.Screen name="ProposeReferendumForm" component={ProposeReferendumForm} options={{title: ''}} />
                <Stack.Screen name="Registration" component={RegistrationScreen} options={{title: '', headerShown: false}} />
                <Stack.Screen name="ErrorScreen" component={ErrorScreen} options={{title: '', headerShown: false}} />
                <Stack.Screen name="ManageAccount" component={ManageAccountPage} options={{title: ''}} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{title: '', headerShown: false}} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{title: '', headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation