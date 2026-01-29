import { View, Text, StyleSheet, Pressable, TextInput, } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '../../../component/atoms/Icon'
import { goBack } from '@navigation/NavigationUtil'
import { FC } from 'react'

interface SearchBarProps {
  cartLength: number

}

const SearchBar: FC<SearchBarProps> = ({ cartLength }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()}>
        <Icon name='arrow-back-sharp' size={20} color='#000' iconFamily='Ionicons' />
      </Pressable>
      <View style={styles.searchContainer}>
        <Icon name='search' size={20} color='#000' iconFamily='Ionicons' />
        <TextInput style={styles.searchInput} placeholder='Search Product' />

      </View>
      <Icon name='heart-outline' size={20} color='#000' iconFamily='Ionicons' />
      <Pressable>
        <Icon name='cart' size={20} color='#000' iconFamily='Ionicons' />
        {cartLength > 0 && <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartLength}</Text>
        </View>}

      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  searchContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '70%',
    marginHorizontal: 10,
  }
  , searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  cartContainer: {
    position: 'relative'
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(8),

  }
})


export default SearchBar