import { View, Text, Platform } from 'react-native'
import React, { FC } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@modules/home';
import { Colors } from '@utils/Constants';
import Account from '@modules/account';
import Cart from '@modules/cart';
import Explore from '@modules/explore';
import Ticket from '@modules/ticket';
import { HomeIcon, ExploreIcon, CartIcon, AccountIcon, SparkelIcon, TicketIcon } from './TabIcons';
import { useAppSelector } from '@store/reduxHook';
import { select } from 'redux-saga/effects';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';
import AISearchScreen from '@modules/home/screens/AISearchScreen';

import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {
  const count = useAppSelector(selectTotalItemsInCart)
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        lazy: true,
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused, size, color }) => <HomeIcon focused={focused} size={size} color={color} />
        }}
      />
      <Tab.Screen name="Explore" component={Explore}
        options={{
          tabBarIcon: ({ focused, size, color }) => <ExploreIcon focused={focused} size={size} color={color} />
        }}
      />
      <Tab.Screen name="AI Lab" component={AISearchScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => <SparkelIcon focused={focused} size={size} color={color} />,
        }}
      />
      <Tab.Screen name="Ticket" component={Ticket}
        options={{
          tabBarIcon: ({ focused, size, color }) => <TicketIcon focused={focused} size={size} color={color} />,

        }}
      />
      <Tab.Screen name="Booking" component={Cart}
        options={{
          tabBarIcon: ({ focused, size, color }) => <CartIcon focused={focused} size={size} color={color} />,

        }}
      />


    </Tab.Navigator>
  )
}

export default MainNavigator