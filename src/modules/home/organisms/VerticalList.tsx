import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenWidth, Colors } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '../../../component/atoms/Icon'
import { FlatList } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'


const VerticalList: FC<{ data: any }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{data?.title}</Text>
      <FlatList
        data={data.data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => navigate('Categories')}>
            <Image source={{ uri: item.image_uri }} style={styles.img} />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.productText}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.subTitle}>{item.subTitle}</Text>
            </View>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  headingText: {
    fontSize: RFValue(14),
    fontFamily: FONTS.Bold,
    color: '#fff',
    marginBottom: 12,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  productText: {
    fontSize: RFValue(12),
    fontFamily: FONTS.SemiBold,
    color: '#fff',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: RFValue(10),
    color: Colors.primary,
    fontFamily: FONTS.Medium,
    textAlign: 'center',
    marginTop: 2,
  },
  contentContainer: {
    paddingBottom: 5,
  }
})

export default VerticalList