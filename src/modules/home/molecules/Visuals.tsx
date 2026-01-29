import {Dimensions,} from 'react-native';
import {View, StyleSheet, Image, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import React, {FC, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
// import SavedFlatlist from './flatlist/SavedFlatlist';

//implementation of on Refresh Visuals changes including change in all theme and 1 dark mode and loading animation
// Theme 1: Light Mode
// Theme 2: Dark Mode
// Theme 3: Dark Mode with loading animation
// Theme 4: raining weather thunderstorm  bushesh flying appart city scene close up  emotion quick action button animation in case of animation slider  , boy running forom cycles to delive the product rainy weather thunder storm rain cote trafic light police chase
// implement a cirle  indian rath circle aswasthama rath circle for offer product loading animation
// implementation of haptic feedback in tuch vibrations and sound in placing and order and adding to cart  and payment  sound effect of money and sound effect of success and sound effect of error
// Theme 3: Loading Animation

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FULL_WIDTH = screenWidth;

type VisualsProps = {
  type: string;
};

const Visuals: FC<VisualsProps> = React.memo(({type}) => {
  //When you call const { scrollY } = useCollapsibleContext(); in your Visuals.tsx file, you are destructuring the context object to get the scrollY animated value. This value represents the current vertical scroll position and is updated as the user scrolls.
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0.6]);
    return {
      opacity,
    };
  });

  const leftAnimatedStyle = useAnimatedStyle(() => {
    const leftPosition = interpolate(scrollY.value, [0, 100], [-44, 100]);
    console.log(leftPosition);
    return {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 130,
      left: leftPosition,
      width: 250,
      height: 250,
      transform: [{scaleX: -1}],
      zIndex: -22,
    };
  });

  const birdAnimatedStyle = useAnimatedStyle(() => {
    const birdPosition = interpolate(scrollY.value, [0, 100], [44, 100]);
    return {
      position: 'absolute',
      right: 6,
      bottom: 0,
      top: 130,
      left: birdPosition,
      // transform: [{scaleX: -1}],
      zIndex: -22,
    };
  });

  const animationSource = useMemo(() => {
    switch (type) {
      case 'home':
        return require('../../../assets/images/banner-min.png');
      //deliveryGuy
      case 'saved':
        return require('../../../assets/images/banner-min.png');
      case 'food':
        return require('../../../assets/images/banner-min.png');
      case 'tryIt':
        return require('../../../assets/images/banner-min.png');
      //3,wire
      case 'games':
        return require('../../../assets/images/banner-min.png');
      default:
        return require('../../../assets/images/banner-min.png');
    }
  }, [type]);

  const dynamicStyles = useMemo(() => {
    switch (type) {
      case 'home':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'rgba(246 210 46 / 0.65)',
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 150,
            position: 'absolute',
            transform: [{scaleX: -1}],
            // width: '100%',
            // height: 500,
            // position: 'absolute',
            // transform: [{scaleX: -1}],
            // top:9,
            // left:7,
            // right:5,
            // bottom:5,
          },
        };
      case 'saved':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: 'pink',
            // opacity:0.5, // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            top: 130,
            left: 44,
            width: 250,
            height: 250,
            transform: [{scaleX: -1}],
            zIndex: -22,
          },
        };
      case 'food':
        return {
          lottieContainer: {
            borderRadius: 0,
            backgroundColor: '#ECEF32E3',
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 400,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 170,
            left: 0,
            right: 5,
            bottom: 0,
          },
        };
      case 'tryIt':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'cadetblue', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: '100%',
            height: 500,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: -30,
            left: 0,
            right: 5,
            bottom: 5,
          },
        };
      case 'games':
        return {
          lottieContainer: {
            borderRadius: 0,
            // backgroundColor: 'black', // Ensure the background is visible
            padding: 10, // Add padding if needed
            position: 'absolute',
            top: -11,
            left: -22,
            right: 0,
            bottom: 0,
            overflow: 'hidden', // Ensure corners are clipped
          },
          lottie: {
            width: 450,
            height: 450,
            position: 'absolute',
            transform: [{scaleX: -1}],
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 10,
            // opacity:-6
          },
        };
      default:
        return {
          container: {backgroundColor: 'red'},
          lottie: {height: 150},
        };
    }
  }, [type]);

  const DynamicStyles = dynamicStyles;


  // headerAnimatedStyle
  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      {/* <LinearGradient colors={darkWeatherColors} style={styles.gradient} />
      <FastImage
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      /> */}

    
      
      <View style={[DynamicStyles.lottieContainer ,]}>
        <View style={styles.lottieWrapper}>
          {/* <LottieView
            autoPlay={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            loop={true}
            source={animationSource()}
            style={[DynamicStyles.lottie as ViewStyle]} // Adjust height as needed
          /> */}
          {type === 'saved' && (
            <LinearGradient
              colors={['transparent', 'rgba(16 37 96 / 0.8)', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
         
          {type === 'home' && (
            <LinearGradient
              colors={['transparent', '#102560CC', 'fuchsia']} // Adjust colors for fade effect
              style={styles.lottieBottomFade}
            />
          )}
         
          {type === 'saved' && (
            <Animated.View style={leftAnimatedStyle}>
              {/* <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/expAnimation/deliveryGuy.json')}
                style={styles.lottie}
              /> */}
            </Animated.View>
          )}
          {type === 'saved' && (
            <Animated.View style={birdAnimatedStyle}>
              {/* <LottieView
                autoPlay={true}
                enableMergePathsAndroidForKitKatAndAbove={true}
                loop={true}
                source={require('../../assets/animations/expAnimation/bird.json')}
                style={styles.lottieBird}
              /> */}
            </Animated.View>
          )}

        {/* {type === 'saved' && (
          <SavedFlatlist selectedIndex={1}/>
        )}
        {type === 'saved' && (
            <FastImage
            source={require('../../assets/images/yellowDecoration.jpg')}
            style={styles.saveGhost}
          />
        )}
        
        {type === 'home' && (
          <FastImage
            source={require('../../assets/images/2.jpg')}
            style={styles.homeGhost}
          />
        )} */}

      </View>
      </View>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFEC43'
  },
  lottie: {
    width: '100%',
    height: 120,
    position: 'absolute',
    // transform: [{scaleX: -1}],
    right: 0,
    bottom: 0,
    top: 80,
    left: -10,
    zIndex: -9999,
  },  
  lottieWrapper:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:9999
  },
  lottieBottomFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90, // Small height for a subtle border fade
    zIndex:9999,
    top:385
  },
});

export default Visuals;
