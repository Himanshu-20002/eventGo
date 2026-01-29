import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

interface MenuItemProps{
    name:string,
    iconUri:any,
    isFocused:boolean,
    onSelect:()=>void
}

const MenuItem:FC<MenuItemProps> = ({name,iconUri,isFocused,onSelect}) => {
  return (
    <TouchableOpacity style={[styles.container,isFocused && styles.focused] } onPress={onSelect}>
        <Image source={iconUri} style={styles.icon}/>
        <Text style={[styles.text,isFocused? styles.textFocused : styles.textUnFocused]}>{name}</Text>
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:19,
        marginHorizontal:1,
        padding:10,
        width:'23%',
        alignItems:'center',
        borderRadius:12,
        backgroundColor:'#C6E41C',
        //#1CD7E4
        justifyContent:'center'
    },
    focused:{
        backgroundColor:'black',
        borderRadius:10
    },
    icon:{
        width:RFValue(20),
        height:RFValue(20),
        marginVertical:4
    },
    text:{
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize:RFValue(10)
    },
    textFocused:{
        color:'#fff'
    },
    textUnFocused:{
        color:'#000'
    }


})
export default MenuItem