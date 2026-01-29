import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Header from '../../../component/templets/Header';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
const AnimatedHeader: FC = () => {
  const {scrollY} = useCollapsibleContext();  //In your AnimatedHeader component, the scrollY value is used to determine the opacity of the header based on the scroll position.
  // When you call `const {scrollY} = useCollapsibleContext();`, you are destructuring the context object to get the `scrollY` animated value. This value is updated as the user scrolls, allowing you to create animations or style changes based on the scroll position.
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header/>
    </Animated.View>
  );
};

export default AnimatedHeader;
