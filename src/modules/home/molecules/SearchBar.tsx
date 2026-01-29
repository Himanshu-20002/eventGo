import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RollingContent from 'react-native-rolling-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { RFValue } from 'react-native-responsive-fontsize'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import Icon from '../../../component/atoms/Icon'
import { searchItems } from '@utils/db'





const SearchBar = () => {

  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => {
    setIsOn(!isOn)
  }

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
           
   
        <Pressable style={styles.searchContainer}>
          <Icon name='search' size={20} color='#000' iconFamily='Ionicons' />
          <RollingContent
            defaultStyle={false}
            customStyle={styles.rollingContainer}
            interval={1000}>
            {searchItems.map((item, index) => (
              <Text key={index} style={styles.brandText}>{item}</Text>
            ))}
          </RollingContent>
        </Pressable>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 4,


  },
  toggleContainer: {
    width: '16%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  brandText: {
    fontSize: RFValue(8),
    fontWeight: '700',
    color: Colors.text,

  },
  swithchIcons: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginLeft: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 9,
    marginTop:9,
    marginLeft:5
  },
  rollingContainer: {
    width: '80%',
    height: 22,
    color: Colors.text,
    marginLeft: 10
  },
  addressContainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    // justifyContent:'center',
    // backgroundColor:'red',
    marginLeft:10,
    // marginTop:5,
   
  },
  addressText:{
    flex:1,
    color:Colors.text,
    marginLeft:5,
    paddingHorizontal:5,
   
    fontSize:RFValue(9),
  },
  homeText:{
    marginHorizontal:5,
    fontSize:RFValue(11),
    fontWeight:'bold',
    marginLeft:10
  }
  
})

export default SearchBar