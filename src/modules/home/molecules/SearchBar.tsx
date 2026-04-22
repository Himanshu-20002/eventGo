import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import RollingContent from 'react-native-rolling-bar'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { FONTS } from '../../../utils/Constants'

const eventSearchSuggestions = [
  ' Search Event , Organizer',
  '🎂 Birthday party indoor garden...',
  '💼 Corporate event premium setup...',
  '🎵 Music night outdoor stage decor...',
  '🌸 Floral ceremony classic white...',
  '🎉 Anniversary candlelit surprise...',
];

const SearchBar = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.searchContainer}
        onPress={() => navigation.navigate('AISearchScreen')}
      >
        <Icon name='search' size={RFValue(16)} color='#0672ff' />
        <RollingContent
          defaultStyle={false}
          customStyle={styles.rollingContainer}
          interval={2500}>
          {eventSearchSuggestions.map((item, index) => (
            <Text key={index} style={styles.brandText}>{item}</Text>
          ))}
        </RollingContent>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0672ff',
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  brandText: {
    fontSize: RFValue(11),
    color: '#999',
    fontFamily: FONTS.Regular,
  },
  rollingContainer: {
    flex: 1,
    height: RFValue(16),
    justifyContent: 'center',
    marginLeft: 10,
  },
})

export default SearchBar