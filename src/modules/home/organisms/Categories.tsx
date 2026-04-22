import { View, ScrollView, StyleSheet, FlatList, Pressable, Image, Text } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '@navigation/NavigationUtil'
import { screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../../utils/ui/ui'

const Categories: FC<{ data: any; onSelect?: (category: string) => void }> = ({ data, onSelect }) => {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <Pressable 
        style={styles.itemContainer} 
        onPress={() => onSelect && onSelect(item.name)}
      >
        <Image source={{ uri: item?.image_uri }} style={styles.img} />
        <CustomText style={styles.nameText}>{item?.name}</CustomText>
      </Pressable>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={data.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 30,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    marginRight: 25,
    alignItems: 'center',
  },
  img: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: screenWidth * 0.075,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  nameText: {
    fontSize: RFValue(10),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#2D2D2D',
  }
})

export default React.memo(Categories)