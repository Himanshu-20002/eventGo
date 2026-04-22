import {
  Platform,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  CollapsibleFlatList,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import SearchBar from '../molecules/SearchBar'
import DynamicWavyHeader from '../molecules/DynamicWavyHeader'
import CustomText from '../../../utils/ui/ui';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS as Fonts } from '@utils/Constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FoodDashboard from './FoodDashboard';
import ServiceDashboard from './ServiceDashboard';
import { dynamicDashboardData as fullData } from '@utils/db'
import AdCarousal from '../organisms/AdCarousal'
import Categories from '../organisms/Categories'
import Sponser from '../organisms/Sponser'
import HorizontalList from '../organisms/HorizontalList'
import AIAssistantSection from '../../../components/aiAssistant/AIAssistantSection'

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  ad_carousal: AdCarousal,
  categories: Categories,
  sponser: Sponser,
  horizontal_list: HorizontalList,
  "ai_assistant": AIAssistantSection
}

const keyExtractor = (item: any, index: number) => item.id || index.toString()

const DynamicWavyHeaderMemo = React.memo(DynamicWavyHeader);

const ProductDashboard = ({ scrollYGlobal, selectedTab, setSelectedTab, onSearch }: any) => {
  const { scrollY, expand } = useCollapsibleContext()
  const previousScrollY = useSharedValue(0)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [data, setData] = useState(fullData.slice(0, 6))
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 6

  // Dynamic Header State
  const [headerTitle, setHeaderTitle] = useState('Event Collection')
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light')

  const handleCategorySelect = useCallback((categoryName: string) => {
    setHeaderTitle(`${categoryName} Collection`)
    // Switch theme based on category for visual dynamics
    if (categoryName === 'Organizer' || categoryName === 'Stall') {
      setHeaderTheme('dark')
    } else {
      setHeaderTheme('light')
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: any }) => {
    const SectionComponent = sectionComponents[item.type]
    if (item.type === 'categories') {
      return <SectionComponent data={item} onSelect={handleCategorySelect} />
    }
    return SectionComponent ? <SectionComponent data={item} /> : null
  }, [handleCategorySelect]);

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setCurrentPage(1)
      setData(fullData.slice(0, PAGE_SIZE))
      setIsRefreshing(false)
    }, 1000)
  }

  const handleLoadMore = () => {
    if (data?.length >= fullData.length) return;
    const newPage = currentPage + 1
    const newItems = fullData.slice(0, newPage * PAGE_SIZE)
    setData(newItems)
    setCurrentPage(newPage)
  }

  const backtoTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previousScrollY.value && scrollY.value > 180
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })

    previousScrollY.value = scrollY.value
    return {
      opacity,
      transform: [{ translateY }]
    }
  })

  return (
    <>
      <Animated.View style={[styles.backToTop, backtoTopStyle]}>
        <TouchableOpacity
          onPress={() => {
            scrollY.value = 0
            expand()
          }}
          style={styles.backToTopButton}>
          <Icon name="arrow-up-circle" size={RFValue(12)} color="white" />
          <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={{ color: 'white' }}>Back to top</CustomText>
        </TouchableOpacity>
      </Animated.View>

      <CollapsibleContainer style={styles.panelContainer}>
        <CollapsibleHeaderContainer containerStyle={styles.transparent}>
          <DynamicWavyHeaderMemo
            theme={headerTheme}
            title={headerTitle}
          />
        </CollapsibleHeaderContainer>

        {selectedTab === 0 ? (
          <CollapsibleFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={10}
            removeClippedSubviews={Platform.OS === 'android'}
          />
        ) : (
          <CollapsibleScrollView
            scrollEnabled={true}
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}
          >
            {selectedTab === 1 ? <FoodDashboard /> : <ServiceDashboard />}
          </CollapsibleScrollView>
        )}
      </CollapsibleContainer>
    </>
  );
};


const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTop: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 999,
  },
  backToTopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 999,
  }
});

export default withCollapsibleContext(ProductDashboard);
