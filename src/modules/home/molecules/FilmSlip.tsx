import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AutoScroll from '@homielab/react-native-auto-scroll'
import { slipData } from '@utils/db'
import Icon from '../../../component/atoms/Icon'
const FilmSlip = () => {
  return (
    <View>
  <AutoScroll
  style={styles.container}
  endPaddingWidth={0}
  duration={14000}
  >
    <View style={styles.gridContainer}>
     {
       slipData.map((item,index)=>(
        <View style={styles.gridItem} key={index}>
          <Text style={styles.gridText}>{"      "}{item}</Text>
          <Text style={styles.gridTextStar}>{"      "}</Text>
          <Icon name='diamond-sharp' size={18} color='#888' iconFamily='Ionicons'/>
         
        </View>
       ))
     }
    </View>
  </AutoScroll>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:40,
  },
  gridContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  gridItem:{
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
    flexDirection:'row',
    // borderRadius:10,
    // marginRight:10,

  },
  gridText:{
    fontSize:RFValue(12),
    fontWeight:'500',
    color:'#fff',
    textAlign:'center',
  },
  gridTextStar:{
    fontSize:RFValue(10),
    fontWeight:'bold',
    color:'#999',
    textAlign:'center',
  }
})

export default FilmSlip