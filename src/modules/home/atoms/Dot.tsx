import { View, Text,  } from 'react-native'
import React, { useEffect } from 'react'
import Animated,   { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { withRepeat } from 'react-native-reanimated';
import { withTiming } from 'react-native-reanimated';

  const Dot = (props: { index: number; isActive: number }) => {
  const { index, isActive } = props;


  const progress = useSharedValue(0);
  useEffect(() => {
    if(isActive === index){
      progress.value = withRepeat(withTiming(1, {duration: 3000}), 1, false,()=>{
        progress.value = 0;
      });
    }else{
      progress.value = 0;
    }
  }, [isActive, index,progress]);



  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`
    };
  });

  return (
    <View style={{
      width: isActive === index ? 35 : 20, 
      height: 4,
       borderRadius: 50, 
        backgroundColor:'#DFDFDF',
        overflow:'hidden',
        marginHorizontal:5,
    
        }}>
    <Animated.View style={[{
      height: '100%',
      borderRadius: 50,
      backgroundColor: "#000",
    },
    animatedStyle
    
    ]} />
    </View>
  )
}

export default Dot