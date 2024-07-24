import React from 'react'
import Navigation from './Infra/Navigation'
import {Provider} from 'react-redux'
import store from './Redux/Store'

export default function App()
{
  return <Provider store={store}>
    <Navigation />
  </Provider>
}