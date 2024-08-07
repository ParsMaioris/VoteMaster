import React from 'react'
import Navigation from './Infra/Navigation'
import {Provider} from 'react-redux'
import store from './Redux/Store'
import {StatusBar} from 'react-native'

export default function App()
{
  return <Provider store={store}>
    <StatusBar barStyle="dark-content" />
    <Navigation />
  </Provider>
}