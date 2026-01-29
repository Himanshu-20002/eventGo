import React, { FC } from 'react'
import { View, Text } from 'react-native'
import Icon from '../component/atoms/Icon';





interface TabIconsProps {
  focused: boolean;
  size: number;
  color: string;
 
}

export const HomeIcon:FC<TabIconsProps> = ({focused,size,color}) => {
  return (
    <View >
        <Icon name={focused ? "home" : "home-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const CategoriesIcon:FC<TabIconsProps> = ({focused,size,color}) => {
  return (
    <View>
      <Icon name={focused ? "grid" : "grid-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const CartIcon:FC<TabIconsProps> = ({focused,size,color}) => {
  return (
    <View>
      <Icon name={focused ? "cart" : "cart-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const AccountIcon:FC<TabIconsProps> = ({focused,size,color}) => {
  return (
    <View>
      <Icon name={focused ? "person" : "person-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}
