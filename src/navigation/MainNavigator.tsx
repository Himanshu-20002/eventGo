import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@modules/home';
import { Colors } from '@utils/Constants';
import Account from '@modules/account';
import Cart from '@modules/cart';
import Categories from '@modules/categories';
import { HomeIcon, CategoriesIcon, CartIcon, AccountIcon } from './TabIcons';
import { useAppSelector } from '@store/reduxHook';
import { select } from 'redux-saga/effects';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';

const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {
  const count = useAppSelector(selectTotalItemsInCart)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        lazy: true,
        tabBarStyle: {
          paddingTop: Platform.OS === "ios" ? 10 : 0,
          // backgroundColor:'green',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 0,
          marginBottom: 0,
          elevation: 9,
        }
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => <HomeIcon focused={focused} size={size} color={color} />
        }}
      />
      <Tab.Screen name="Categories" component={Categories}
        options={{
          tabBarIcon: ({ focused, size, color }) => <CategoriesIcon focused={focused} size={size} color={color} />
        }}
      />
      <Tab.Screen name="Account" component={Account}
        options={{
          tabBarIcon: ({ focused, size, color }) => <AccountIcon focused={focused} size={size} color={color} />,

        }}
      />
      <Tab.Screen name="Booking" component={Cart}
        options={{
          tabBarIcon: ({ focused, size, color }) => <AccountIcon focused={focused} size={size} color={color} />,

        }}
      />

    </Tab.Navigator>
  )
}

export default MainNavigator