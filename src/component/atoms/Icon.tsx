import { View, Text } from 'react-native'
import React, { FC } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


interface IconProps {
    name: string;
    size: number;
    color?: string;
    iconFamily:"Ionicons" | "MaterialIcons" | "AntDesign" | "Entypo" | "EvilIcons" | "FontAwesome" | "FontAwesome5" | "Fontisto" | "Foundation" | "MaterialCommunityIcons" | "SimpleLineIcons" | "Zocial"
}



const Icon:FC<IconProps> = ({name,size,color,iconFamily}) => {
  return (
   <>
   {iconFamily === "Ionicons" && <Ionicons name={name} size={size} color={color} />}
   {iconFamily === "MaterialIcons" && <MaterialIcons name={name} size={size} color={color} />}
   {iconFamily === "AntDesign" && <AntDesign name={name} size={size} color={color} />}
   </>
  )
}

export default Icon
