import { View } from 'react-native';
import React, { FC } from 'react';
import Header from '../../../component/templets/Header';
import Animated, { interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated';
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';

const AnimatedHeader: FC = () => {
  const { scrollY } = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // Fade out as user scrolls — the library handles the actual up/down translation
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolation.CLAMP);
    return { opacity };
  });

  return (
    <Animated.View >
      <Header />
    </Animated.View>
  );
};

export default AnimatedHeader;
