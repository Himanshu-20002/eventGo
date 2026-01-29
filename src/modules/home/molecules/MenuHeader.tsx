import { View, Text, Animated, SafeAreaView, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { menuData } from '@utils/db'
import MenuItem from '../atoms/MenuItem'
import Icon from '../../../component/atoms/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const MenuHeader:FC<{scrollY:any}> = ({scrollY}) => {
    const [focusedIndex,setFocusedIndex] = useState(0)


    const opacityFadingStyle = useAnimatedStyle(()=>{
        const opacity = interpolate(scrollY.value, [0, 100], [1, 0], 'clamp')
        return {
            opacity
        }
    })



  return (
   <Animated.View style={[styles.container,opacityFadingStyle]}>
    <SafeAreaView/>

    <View style={styles.flexRow}>
        {menuData.map((item,index)=>(
           <MenuItem key={index}
           name={item.name}
           iconUri={item.iconUri}
           isFocused={focusedIndex === index}
           onSelect={()=>setFocusedIndex(index)}
           />
        ))}
        

    </View>
  
   </Animated.View>
  )
}

const styles = StyleSheet.create({
  container:{
    height:100,
    // backgroundColor:'yellow'
  },
  menuContainer:{
    height:100,
    backgroundColor:'#fff'
  },
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:10

  },
 
  

})
export default MenuHeader