import React from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../utils/ui/ui';
import { RFValue } from 'react-native-responsive-fontsize';
import {FONTS as Fonts } from '@utils/Constants';
import { FadeIn, FadeInRight } from 'react-native-reanimated';
type TabItem = {
  icon: string;
  label: string;
};

type TabsProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?:string,
  inactiveColor?:string,
  activeBackgroundColor?: string,
  inactiveBackgroundColor?: string,

};

export default function AnimatedTab({
  data,
  selectedIndex,
  onChange,
  activeColor='white',
  inactiveColor='green',
  activeBackgroundColor='red',
  inactiveBackgroundColor='#E9E9E9E1',

}: TabsProps) {
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / 5; // Adjust this to show exactly 3 tabs

  return (
      <ScrollView horizontal key={selectedIndex}
      showsHorizontalScrollIndicator={false}
      >
    <View style={styles.container}>
    {data.map((item,index)=>{
      const isSelected = index === selectedIndex
        return(
        <TouchableOpacity key={index} onPress={()=>onChange(index)} 
        style={{
          backgroundColor:isSelected?activeBackgroundColor:inactiveBackgroundColor,
          padding:5,
          justifyContent:'center',
          alignItems:'center',
          
          gap:3,
          width:tabWidth,
          flexDirection:'row',
          borderRadius:10,
        }}>
            <Icon name={item.icon} size={RFValue(15)}  />
            <Animated.View 
            entering={FadeInRight.springify().damping(80).mass(200)}>
            <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={{color:isSelected?activeColor:inactiveColor,padding:3}}>{item.label}</CustomText>
            </Animated.View>
        </TouchableOpacity>
        )
    })}
    </View> 
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    gap:6,
    padding:4,
    borderRadius:10,
    marginHorizontal:10,
    marginTop:10,
    // backgroundColor:'#E9E9E9E1'
    backgroundColor:'#D9D9D9CA'
  }
})