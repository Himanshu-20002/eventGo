import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '../../../component/atoms/Icon'
import { FlatList } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'


const VerticalList: FC<{ data: any }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, { backgroundColor: data?.bgColor }]} />
      <Text style={styles.headingText}>{data?.title}</Text>
      <Pressable style={[styles.exploreMore, { backgroundColor: data?.btnColor }]}>
        <Text style={styles.exploreMoreText}>Explore More</Text>
        <Icon name='arrow-forward-sharp' size={20} iconFamily='Ionicons' />
      </Pressable>

      <FlatList
        data={data.data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => navigate('Categories')}>
            <Image source={{ uri: item.image_uri }} style={styles.img} />
            <Text style={styles.productText}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </Pressable>


        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10
  },
  absoluteView: {
    width: screenWidth,
    height: 180,
    position: 'absolute',
    top: 0,
    zIndex: -1
  },
  headingText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222'
  },
  exploreMore: {

    backgroundColor: 'green',
    padding: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 9,
    marginVertical: 3
  },
  exploreMoreText: {
    fontFamily: FONTS.heading,
    marginBottom: 2,
    fontSize: RFValue(16),
  },
  itemContainer: {
    width: '48%',
    height: 220,
    margin: 5,
    marginBottom: 20,
    alignSelf: 'flex-start'

  },
  img: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  productText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    color: '#222',
    marginTop: 4


  },
  subTitle: {
    fontSize: RFValue(10),
    color: '#222',
    fontWeight: '400'

  },
  contentContainer: {
    paddingBottom: 10

  }
})

export default VerticalList