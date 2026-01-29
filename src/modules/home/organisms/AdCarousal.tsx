import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import { screenWidth } from '@utils/Constants'
import Carousel from 'react-native-reanimated-carousel'
import FilmSlip from '../molecules/FilmSlip'
import { Image, Pressable } from 'react-native'
import Dot from '../atoms/Dot'

const AdCarousal: FC<{ data: any }> = ({ data }) => {



  const [active, setActive] = useState(0)
  const baseOptions = {
    vertical: false,
    height: screenWidth * 0.3,
    width: screenWidth,
  }

  return (
    <View style={styles.container}>
      <FilmSlip />
      <Carousel
        {...baseOptions}

        autoPlayInterval={3000}
        autoPlay={true}
        snapEnabled={true}
        onSnapToItem={(index) => setActive(index)}
        data={data.data}
        renderItem={({ item }: { item: any }) => {
          return (
            <Pressable style={styles.imageContainer}>
              <Image source={item?.image_uri} style={styles.image} />
            </Pressable>
          )
        }} />
      {
        active != null && (
          <View style={styles.dotContainer}>
            {data?.data?.map((item: any, index: number) => (
              <Dot isActive={active} index={index} key={index} />
            ))}
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: '100%',
  height: screenWidth * 0.5,
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.3,
  },
  dotContainer: {
    flexDirection: 'row',
    width: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    //
  },
  imageContainer: {
    width: screenWidth,
    height: screenWidth * 0.5,
  }

})

export default AdCarousal