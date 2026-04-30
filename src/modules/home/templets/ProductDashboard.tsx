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
import ProductList from '../organisms/ProductList'
import VerticalList from '../organisms/VerticalList'
import AIAssistantSection from '../../../components/aiAssistant/AIAssistantSection'

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  ad_carousal: AdCarousal,
  categories: Categories,
  sponser: Sponser,
  horizontal_list: HorizontalList,
  vertical_list: VerticalList,
  product_list: ProductList,
  "ai_assistant": AIAssistantSection
}

const keyExtractor = (item: any, index: number) => item.id || index.toString()

const DynamicWavyHeaderMemo = React.memo(DynamicWavyHeader);

const ProductDashboard = ({ scrollYGlobal, selectedTab, setSelectedTab, onSearch }: any) => {
  const { scrollY, expand } = useCollapsibleContext()
  const previousScrollY = useSharedValue(0)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 6

  // Dynamic Header State
  const [headerTitle, setHeaderTitle] = useState('Events Collection')
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light')
  const [selectedCategory, setSelectedCategory] = useState<string>('Events')

  // Optimized Filtering Logic
  const filteredData = useMemo(() => {
    return fullData.filter(item => 
      item.category === 'all' || item.category === selectedCategory
    )
  }, [selectedCategory])

  const handleCategorySelect = useCallback((categoryName: string) => {
    setHeaderTitle(`${categoryName} Collection`)
    setSelectedCategory(categoryName)
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
      return (
        <SectionComponent 
          data={item} 
          onSelect={handleCategorySelect} 
          selectedCategory={selectedCategory} 
        />
      )
    }
    return SectionComponent ? <SectionComponent data={item} /> : null
  }, [handleCategorySelect, selectedCategory]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

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
            data={filteredData}
            renderItem={renderItem}
            extraData={selectedCategory}
            keyExtractor={keyExtractor}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListFooterComponent={
              <View style={{ padding: 20, backgroundColor: 'transparent' }}>
                <CustomText
                  fontSize={RFValue(32)}
                  fontFamily={Fonts.SemiBold}
                  style={{ opacity: 0.7, color: '#fff' }}>
                  eventGo
                </CustomText>
                <CustomText
                  fontFamily={Fonts.SemiBold}
                  style={{ marginTop: 10, paddingBottom: 80, opacity: 0.7, color: '#fff' }}>
                  Developed with ❤️
                </CustomText>
              </View>
            }
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
    backgroundColor: 'transparent'
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
