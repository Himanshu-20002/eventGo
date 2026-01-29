import {
    Animated as RNAnimated,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect, useRef, useState } from 'react';
  import MainList from '../templets/MainList'
  import {
    CollapsibleContainer,
    CollapsibleHeaderContainer,
    CollapsibleScrollView,
    useCollapsibleContext,
    withCollapsibleContext,
  } from '@r0b0t3d/react-native-collapsible';
  import AnimatedHeader from './AnimatedHeader';
  import SearchBar from '../molecules/SearchBar'
//   import ContentContainer from '@components/dashboard/ContentContainer';
  import CustomText from '../../../utils/ui/ui';
  import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS  as Fonts} from '@utils/Constants';
  import Animated, {
    useAnimatedStyle,
    withTiming
  } from 'react-native-reanimated';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import StickySearchBar from './StickySeacrchBar'
import Visuals from '../molecules/Visuals';
import FoodDashboard from './FoodDashboard';
import ServiceDashboard from './ServiceDashboard';

//   import withCart from '../cart/WithCart';
//   import withLiveStatus from '../map/withLiveStatus';
//   //Initial State: The drawer is closed and hidden from view. This is like the notice being off-screen, represented by the initial value of NOTICE_HEIGHT.
//   const NOTICE_HEIGHT = -(NoticeHeight + 12); //positions the notice off-screen (above the visible area). This means that when the component first renders, the notice is hidden.
  
  const ProductDashboard = ({scrollYGlobal ,selectedTab,setSelectedTab}) => {
    // const [selectedIndex, setSelectedIndex] = useState(0);
  
    const { scrollY, expand } = useCollapsibleContext()
    const previousScrollY = useRef<number>(0)
    const backtoTopStyle = useAnimatedStyle(() => {
      const isScrollingUp = scrollY.value < previousScrollY.current && scrollY.value > 180
      const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 })
      const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 })
  
  
      previousScrollY.current = scrollY.value
      return {
        opacity,
        transform: [{ translateY }]
      }
    })
    // `noticePosition` is a reference to an animated value created using `useRef` from React. It is initialized with a new instance of `RNAnimated.Value`, which is used to control the vertical position of a notice element in the UI.
    // const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
    //noticePosition is a instance of RNAnimated.Value that is used to control the vertical position of a notice element in the UI.
  
    // `noticePosition` is an animated value that controls the vertical position of a notice (like a notification or alert) on the screen. It is initialized to a value that positions the notice off-screen (above the visible area).

  
    const renderDashboard = () => {
    switch (selectedTab) {
      case 0:
        return <MainList scrollYGlobal={scrollYGlobal} /> // Home
      case 1:
        return <FoodDashboard /> // Food
      case 2:
        return <ServiceDashboard /> // Service
      default:
        return <MainList scrollYGlobal={scrollYGlobal} />
    }
  }
  
  
    return (
    
  
        <>
      <SafeAreaView />
      <Animated.View style={[styles.backToTop, backtoTopStyle]}>
        <TouchableOpacity
          onPress={() => {
            scrollY.value = 0
            expand()
          }}
          style={{ flexDirection: 'row', alignItems: 'center', gap:6, zIndex: 999 ,}}>
          <Icon name="arrow-up-circle" size={RFValue(12)} color="white" />
          <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={{ color: 'white' }}>Back to top</CustomText>
        </TouchableOpacity>
       
      </Animated.View>
      <CollapsibleContainer style={styles.panelContainer}>
       <CollapsibleHeaderContainer containerStyle={styles.transparent}>
          <AnimatedHeader />
          {/* Pass selectedTab and setSelectedTab */}
          <StickySearchBar
            selectedIndex={selectedTab}
            setSelectedIndex={setSelectedTab}
          />
        </CollapsibleHeaderContainer>
        <CollapsibleScrollView
          scrollEnabled={true}
          style={styles.panelContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderDashboard()}
        </CollapsibleScrollView>
          </CollapsibleContainer>
        </>
     
    );
  };
  const styles = StyleSheet.create({
    panelContainer: {
      flex: 1,
      backgroundColor: '#ffsdf'
    },
    transparent: {
      backgroundColor: '#0672ffff',
    },
    visualsContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      top: 0,
      left: 0,
      backgroundColor: '#000',
      padding: 10,
      alignSelf: "center",
      zIndex: -1
    },
    backToTop: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 100
      , alignSelf: "center",
      gap: 4,
      zIndex: 999,
    }
  });
  export default withCollapsibleContext(ProductDashboard);
  //By wrapping ProductDashboard with withCollapsibleContext, you enable it to access the collapsible context, which can be useful for managing UI elements that depend on the scroll position or other collapsible states. This allows for a more dynamic and responsive user interface.
  
  //The primary purpose of withCollapsibleContext is to provide the wrapped component (in this case, ProductDashboard) with access to the collapsible context. This context includes shared state and methods related to the collapsible behavior, such as the current scroll position.
  
  
  
  // ProductDashboard
  // ├── Imports
  // │   ├── React and React Native Components
  // │   ├── Custom Components (NoticeAnimation, Visuals, etc.)
  // │   ├── Utility Functions and Constants
  // │   ├── Higher-Order Components (withCart, withLiveStatus, etc.)
  // │   ├── Animation Libraries (react-native-reanimated, etc.)
  // ├── Constants
  // │   └── NOTICE_HEIGHT
  // ├── Hooks
  // │   ├── useCollapsibleContext
  // │   ├── useRef
  // │   ├── useEffect
  // │   └── useAnimatedStyle
  // ├── Animated Values
  // │   └── noticePosition
  // ├── Functions
  // │   ├── slideUp
  // │   └── slideDown
  // ├── Effects
  // │   └── useEffect for notice animation
  // ├── Render
  // │   ├── NoticeAnimation
  // │   ├── Visuals
  // │   ├── SafeAreaView
  // │   ├── Animated.View (Back to Top Button)
  // │   │   └── TouchableOpacity (Back to Top Action)
  // │   ├── CollapsibleContainer
  // │   │   ├── CollapsibleHeaderContainer
  // │   │   │   ├── AnimatedHeader
  // │   │   │   └── StickySearchBar
  // │   │   └── CollapsibleScrollView
  // │   │       ├── ContentContainer
  // │   │       └── View (Footer Text)
  // ├── Styles
  // │   ├── panelContainer
  // │   ├── transparent
  // │   └── backToTop
  // └── Export
  //     └── withLiveStatus(withCart(withCollapsibleContext(ProductDashboard)))