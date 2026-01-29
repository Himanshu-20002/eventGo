import { View, Image, StyleSheet ,Dimensions} from 'react-native'
import React, { FC, useEffect ,useRef} from 'react'
import { Colors, screenWidth } from '@utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { resetAndNavigate } from '@navigation/NavigationUtil'
import Rive, { RiveRef} from 'rive-react-native';

const Splash:FC = () => {
  const riveRef = useRef<RiveRef>(null);
  const navigation = useNavigation();
  useEffect(() => {
   const timer = setTimeout(() => {
      resetAndNavigate("Main")
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:Colors.primary}}>
      <Rive
          ref={riveRef}
          resourceName="nightbucket"
          style={styles.animation}
          autoplay={true}
          // onLoopEnd={handleAnimationComplete}
        />
    </View>
  )
}
 const styles = StyleSheet.create({
  container: {
    backgroundColor:"blue",
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animationWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 })

export default Splash