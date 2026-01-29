import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '../../../component/atoms/Icon'
import { FlatList } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'

const HorizontalList:FC <{data:any}> = (data) => {
  // const renderItem = ({ item }: { item: any }) => (
  //   <Pressable onPress={() => navigate('Categories')}>
  //     {/* <Image
  //       source={{ uri: item.image_uri }}
  //       style={styles.img}
  //     /> */}
  //     <Text>helllllllllooo</Text>
  //   </Pressable>
  // )

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.data.title}</Text>
     <FlatList
      data={data.data.data}
      horizontal
      keyExtractor={(item)=>item.id}
      style={{paddingHorizontal:15}}
      renderItem={({item})=>(
        <Pressable style={styles.itemContainer} onPress={()=>navigate('Categories')}>
          <Image source={{uri:item.image_uri}} style={styles.img}/>
          <Text style={styles.productText}>{item.title}</Text>
        
        </Pressable>
         )}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.contentContainer}
             />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer:{
    paddingBottom:10,
    paddingTop:10

  },
    container:{
        paddingBottom:15
    },
    img:{
        width:screenWidth*0.4,
        height:screenWidth*0.6,
        marginRight:12,
        borderRadius:15,
        resizeMode:'contain',
        overflow:'hidden',
        zIndex:999
    },
    textStyle:{
        fontSize:RFValue(13),
        fontWeight:'bold',
        padding:10,
        paddingTop:9,
        color:"#222",

    },
    itemContainer:{
      
      height:220,
      margin:5,
      marginBottom:20,
      alignSelf:'flex-start'
  
    },
    // img:{
    //   width:'100%',
    //   height:180,
    //   resizeMode:'cover'
    // },
    productText:{
      fontSize:RFValue(14),
      fontFamily:FONTS.heading,
      color:'#222',
      marginTop:4
    }
  
})

export default HorizontalList