import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
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

  // Evento Custom Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [options, setOptions] = useState('')

  const handleSearch = (q: string, minP: number, maxP: number, opt: string) => {
    setSearchQuery(q)
    setMinPrice(minP)
    setMaxPrice(maxP)
    setOptions(opt)

    // TODO: Connect vector search / natural language inference API here
    Alert.alert('Searching Evento', `Query: ${q}\nMin: ₹${minP} | Max: ₹${maxP}\nOptions: ${opt}`)
  }

  const moveUpStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollYGlobal.value, [0, 100], [0, -100], 'clamp')
    return {
      transform: [{ translateY }]
    }
  })



  return (
    <View style={styles.container}>
      <Animated.View style={[moveUpStyle, { height: screenHeight }]}>
        {/* Pass selectedTab and setSelectedTab */}
        <ProductDashboard
          scrollYGlobal={scrollYGlobal}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onSearch={handleSearch}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff0303ff',
  },
})

export default Home