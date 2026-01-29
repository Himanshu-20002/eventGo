import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reduxHook'
import { getHomeContent } from './api/action'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { screenHeight } from '@utils/Constants'
import MenuHeader from './molecules/MenuHeader'

import MainList from './templets/MainList'
import Categories from './organisms/Categories'
import ProductDashboard from './templets/ProductDashboard'
const Home = () => {
  const insets = useSafeAreaInsets()
  const scrollYGlobal = useSharedValue(0)
  const [selectedTab, setSelectedTab] = useState(0)

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 100], [0, -100], 'clamp')
    return {
      transform: [{ translateY }]
    }
  })



  return (
   <View style={styles.container}>
      <View style={{ height: Platform.OS === 'android' ? insets.top : 0 }} />
      <Animated.View style={[moveUpStyle, { height: screenHeight }]}>
        {/* Pass selectedTab and setSelectedTab */}
        <ProductDashboard
          scrollYGlobal={scrollYGlobal}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default Home