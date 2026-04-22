import { View, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@navigation/NavigationUtil'
import CustomText from '../../../utils/ui/ui'

const HorizontalList: FC<{ data: any }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h6" fontFamily={FONTS.Bold} style={styles.textStyle}>{data?.title}</CustomText>
      <FlatList
        data={data.data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        style={{ paddingHorizontal: 15 }}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => navigate('Categories')}>
            <Image source={{ uri: item.image_uri }} style={styles.img} />
            <CustomText variant="h8" style={styles.productText}>{item.title}</CustomText>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  // ... existing styles kept but cleaned
  contentContainer: {
    paddingBottom: 10,
    paddingTop: 10
  },
  container: {
    paddingBottom: 15
  },
  img: {
    width: screenWidth * 0.42,
    height: screenWidth * 0.55,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  textStyle: {
    fontSize: RFValue(14),
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#2D2D2D",
  },
  itemContainer: {
    marginRight: 10,
    alignSelf: 'flex-start'
  },
  productText: {
    marginTop: 8,
    color: '#333',
  }
})

export default React.memo(HorizontalList)