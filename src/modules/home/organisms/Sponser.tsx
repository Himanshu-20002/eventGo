import { View, Text,Image,Pressable, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '@utils/Constants'
import { navigate } from '@navigation/NavigationUtil'
const Sponser:FC<{data:any}> = ({data}) => {
  return (
    <Pressable style={styles.container} onPress={()=>navigate('Sponser')}>
      <Image source={{uri:data?.data![0].image_uri}} style={styles.image}/>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container:{
    height:90,
    width:screenWidth -30,
    marginHorizontal:14,
    justifyContent:'center',
    alignItems:'center',
    resizeMode:'contain',
  },
  image:{
   width:'100%',
   height:'100%',
   resizeMode:'cover',
   borderRadius:15,
  }
})

export default Sponser