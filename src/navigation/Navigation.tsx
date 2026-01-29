
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '@modules/onboard';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { navigationRef } from './NavigationUtil';
import MainNavigator from './MainNavigator';
import ProductList from '../modules/products/index'
const Navigation:FC= () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Product" component={ProductList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation