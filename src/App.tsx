
import React from 'react'
import Navigation from './navigation/Navigation';
import { StatusBar } from 'react-native';
import { Colors } from '@utils/Constants';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
        <Navigation/>
        <StatusBar backgroundColor='#0672ffff' barStyle='dark-content' translucent />
    </Provider>
    </GestureHandlerRootView>
   
  )
}

export default App