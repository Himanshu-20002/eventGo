import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/reduxHook'
import { getCategories } from './api/action'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'

const Categories:FC = () => {

 const dispatch = useAppDispatch()
 const {data,loading,error} = useAppSelector(state=>state.categories)

 useEffect(()=>{
  dispatch(getCategories())
 },[dispatch])

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <SafeAreaView/>

      <Text  style={styles.headingText}>Categories</Text>
      <Text style={styles.headingTitleText}>Explore our wide range of categories</Text>
      
      </View>
      {loading? <ActivityIndicator size='small' color={'blue'}/>:
      <FlatList
      data={data}
      keyExtractor={(item)=>item._id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
        <TouchableOpacity key={index} onPress={()=>navigate('Product',{
          id:item._id,
          name:item.name
        })} style={styles.itemContainer}>
          <Image source={{uri:item.image_uri}} style={styles.img}/>
          <Text style={styles.name}>{item.name}</Text>
          


        </TouchableOpacity>
      )

    
    
    }
    ListFooterComponent={
      <>
      {error && <Text style={styles.headingText}>There was error fetching api call </Text>}
      </>
    }
    contentContainerStyle={styles.contentContainer}
      
      />}

    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer:{
    padding:10

  },
  
  
  

  container:{
    flex:1,
    backgroundColor:'#E7F9EC'
  },
  headingContainer:{
    
    padding:20,
    alignItems:'flex-start',
    marginBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    width:screenWidth,
    height:120,
    backgroundColor:'#fff'
  },
  headingText:{
    fontSize:RFValue(18),
    fontFamily:FONTS.heading,
    fontWeight:'bold',
    color:'#333'
  },
  headingTitleText:{
    fontSize:RFValue(13),
    marginTop:5,
    fontWeight:'600',
    fontFamily:FONTS.heading

  },
  itemContainer:{
    flex:1,
    margin:5,
    alignItems:'center',
    backgroundColor:'#fff',
    padding:10,
    shadowColor:'#0000',
    textShadowOffset:{width:0,height:2},
    borderRadius:10,
    shadowOpacity:0.2,
    shadowRadius:5,
    elevation:2


  },
  name:{
    marginTop:10,
    fontSize:RFValue(12),
    fontWeight:'500',
    color:'#333'


  },
  img:{
    width:80,
    height:80,
    borderRadius:10,

  }
})

export default Categories