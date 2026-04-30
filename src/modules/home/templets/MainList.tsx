import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect, FC, useRef } from 'react'
import { dynamicDashboardData as fullData } from '@utils/db'
import CustomText from '../../../utils/ui/ui'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS as Fonts, Colors } from '@utils/Constants'

import AdCarousal from '../organisms/AdCarousal'
import Categories from '../organisms/Categories'
import Sponser from '../organisms/Sponser'
import VerticalList from '../organisms/VerticalList'
import HorizontalList from '../organisms/HorizontalList'
import AnimatedHorizontalList from '../organisms/AnimatedHorizontalList'
import AIAssistantSection from '../../../components/aiAssistant/AIAssistantSection'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient'

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  ad_carousal: AdCarousal,
  categories: Categories,
  sponser: Sponser,
  horizontal_list: HorizontalList,
  "ai_assistant": AIAssistantSection
}

const PAGE_SIZE = 4


const keyExtractor = (item: any, index: number) => item.id || index.toString()

const MainList: FC<{ scrollYGlobal: any }> = ({ scrollYGlobal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const renderItem = ({ item }: { item: any }) => {
    const SectionComponent = sectionComponents[item.type]
    if (!SectionComponent) return null

    return (
      <SectionComponent
        data={item}
        onSelect={(category: string) => setSelectedCategory(category)}
        selectedCategory={selectedCategory}
      />
    )
  }
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [data, setData] = useState(fullData.slice(0, PAGE_SIZE))
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const flatlistRef = useRef<FlatList>(null)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYGlobal.value = event.contentOffset.y;
    },
  });

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCurrentPage(1)
      setData(fullData.slice(0, PAGE_SIZE))
      setIsRefreshing(false)
    }, 1000)
  }

  const handleLoadMore = () => {
    if (isLoadingMore || data?.length >= fullData.length) return;

    setIsLoadingMore(true)
    setTimeout(() => {
      const newPage = currentPage + 1
      const newItems = fullData.slice(0, newPage * PAGE_SIZE)
      setData(newItems)
      setCurrentPage(newPage)
      setIsLoadingMore(false)
    }, 1000)
  }

  return (
    <View style={{ flex: 1 }}>

      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        extraData={selectedCategory}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        onScroll={scrollHandler}
        ref={flatlistRef as any}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListFooterComponent={
          <>
            {isLoadingMore && <ActivityIndicator style={{ alignSelf: 'center', margin: 15 }} size="small" color="#0000ff" />}
            <View style={{ padding: 20, backgroundColor: 'transparent' }}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.7, color: '#fff' }}>
                eventGo
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{ marginTop: 10, paddingBottom: 80, opacity: 0.7, color: '#fff' }}>
                Developed with ❤️
              </CustomText>
            </View>
          </>
        }
      />
    </View>
  )
}

export default React.memo(MainList)

