import { View, Dimensions, StyleSheet, Image, Pressable } from 'react-native'
import React, { FC, useState } from 'react'
import { screenWidth } from '@utils/Constants'
import Carousel from 'react-native-reanimated-carousel'

const AdCarousal: FC<{ data: any }> = ({ data }) => {
  const [active, setActive] = useState(0)
  const baseOptions = {
    vertical: false,
    height: screenWidth * 0.30, 
    width: screenWidth,
  }

  return (
    <View style={styles.container}>
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
              <Image
                source={typeof item?.image_uri === 'string' ? { uri: item?.image_uri } : item?.image_uri}
                style={styles.image}
              />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: screenWidth,
    height: screenWidth * 0.28,
    paddingHorizontal: screenWidth * 0.06, 
    marginTop: 5,
  }
})

export default AdCarousal