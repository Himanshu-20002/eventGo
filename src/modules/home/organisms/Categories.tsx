import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { screenWidth, Colors } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../../utils/ui/ui'
import FilmSlip from '../molecules/FilmSlip'

const Categories: FC<{
  data: any;
  onSelect?: (category: string) => void;
  selectedCategory?: string;
}> = ({ data, onSelect, selectedCategory }) => {

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedCategory === item.name;

    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => onSelect && onSelect(item.name)}
      >
        <Image
          source={{ uri: item?.image_uri }}
          style={[
            styles.img,
            isSelected ? {
              borderColor: Colors.active,
              borderWidth: 2,
              transform: [{ scale: 1.05 }]
            } : undefined
          ]}
        />
        <CustomText style={[
          styles.nameText,
          isSelected ? { color: Colors.active, fontWeight: 'bold' } : undefined
        ]}>
          {item?.name}
        </CustomText>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FilmSlip />
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
    width: '100%',
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: screenWidth * 0.06, // Symmetrical side padding
    paddingVertical: 5
  },
  itemContainer: {
    marginTop: 10,
    marginRight: screenWidth * 0.05, // Responsive gap between items
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 15,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // Subtle shadow for premium feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nameText: {
    fontSize: RFValue(10),
    textAlign: 'center',
    marginTop: 10,
    color: Colors.text || '#2D2D2D',
  }
})

export default React.memo(Categories)