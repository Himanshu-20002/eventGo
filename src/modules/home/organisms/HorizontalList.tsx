import { View, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { FC } from 'react'
import { FONTS, Colors, screenWidth } from '@utils/Constants'
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
            <View>
              <Image source={{ uri: item.image_uri }} style={styles.img} />
              {item.isLive && (
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <CustomText variant="h9" fontFamily={FONTS.Bold} style={{ color: '#fff' }}>LIVE</CustomText>
                </View>
              )}
            </View>
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
  contentContainer: {
    paddingBottom: 10,
    paddingTop: 10
  },
  container: {
    paddingBottom: 15
  },
  img: {
    width: screenWidth * 0.45,
    height: 180,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: RFValue(14),
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.text || "#2D2D2D",
  },
  itemContainer: {
    marginRight: 10,
    alignSelf: 'flex-start'
  },
  productText: {
    marginTop: 8,
    color: Colors.text || '#333',
    fontFamily: FONTS.Medium,
  }
})

export default React.memo(HorizontalList)