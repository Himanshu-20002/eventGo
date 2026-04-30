import { View, Text, StyleSheet, Platform, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/reduxHook'
import { getHomeContent } from './api/action'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, Colors } from '@utils/Constants'
import MenuHeader from './molecules/MenuHeader'

import Categories from './organisms/Categories'
import ProductDashboard from './templets/ProductDashboard'

const Home = () => {
  const scrollYGlobal = useSharedValue(0)
  const [selectedTab, setSelectedTab] = useState(0)

  // Evento Custom Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [options, setOptions] = useState('')

  const handleSearch = useCallback((q: string, minP: number, maxP: number, opt: string) => {
    setSearchQuery(q)
    setMinPrice(minP)
    setMaxPrice(maxP)
    setOptions(opt)
    Alert.alert('Searching Evento', `Query: ${q}\nMin: ₹${minP} | Max: ₹${maxP}\nOptions: ${opt}`)
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ece3f7bf', '#6d24bbff']}
        style={StyleSheet.absoluteFill}
      />
      <ProductDashboard
        scrollYGlobal={scrollYGlobal}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onSearch={handleSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})

export default Home
