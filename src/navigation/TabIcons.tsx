import React, { FC } from 'react'
import { View, Text } from 'react-native'
import Icon from '../component/atoms/Icon';





interface TabIconsProps {
  focused: boolean;
  size: number;
  color: string;

}

export const HomeIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View >
      <Icon name={focused ? "home" : "home-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const ExploreIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View>
      <Icon name={focused ? "explore" : "explore"} size={size} color={color} iconFamily={"MaterialIcons"} />
    </View>
  )
}


export const TicketIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View>
      <Icon name={focused ? "ticket" : "ticket-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const CartIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View>
      <Icon name={focused ? "cart" : "cart-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}

export const AccountIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View>
      <Icon name={focused ? "person" : "person-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}
export const SparkelIcon: FC<TabIconsProps> = ({ focused, size, color }) => {
  return (
    <View>
      <Icon name={focused ? "sparkles" : "sparkles-outline"} size={size} color={color} iconFamily={"Ionicons"} />
    </View>
  )
}
