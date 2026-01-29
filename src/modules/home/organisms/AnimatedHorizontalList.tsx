import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS, screenWidth } from '@utils/Constants'
import { FlatList, } from 'react-native-gesture-handler'
import { navigate } from '@navigation/NavigationUtil'
import img from '../../../assets/icons/grocery.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getProductsByCategory } from '@modules/products/api/getProducts'
import GreenUniversalAdd from '@modules/products/atoms/GreenUniversalAdd'

const AnimatedHorizontalList: FC<{ data: any }> = ({ data }) => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const data = await getProductsByCategory("67af315c4ff2ce42941e9fa4")
    setProducts(data)

  }
  useEffect(() => {


    fetchProducts()



  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={img} style={styles.img} />

        <Text style={{ fontWeight: '800', color: '#ffff' }}>BUCKET COMBO</Text>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>at 99</Text>
          <Icon name="cart-plus" size={RFValue(22)} color="white" />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}




          renderItem={({ item, index }) => (
            <Pressable style={styles.imgContainer} key={index} onPress={() => navigate('Categories')}>
              <Image source={{ uri: item.image_uri }} style={styles.img} />
              <Text style={{ fontWeight: '600', fontSize: RFValue(12), marginTop: 5 }}>{item.name}</Text>
              <Text style={{ fontWeight: '700', fontSize: RFValue(14), marginTop: 5, color: '#6200ee' }}>₹ {item.price}</Text>
              <GreenUniversalAdd item={item} />
            </Pressable>



          )}
          showsHorizontalScrollIndicator={false}
        />

      </View>


    </View>
  )
}
const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: screenWidth * 1,

    flexWrap: 'wrap',
    flex: 1,

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth * 1,
    backgroundColor: '#6200ee',

  },
  container: {
    marginVertical: 13,
    backgroundColor: '#e1e1e1ff',
    flex: 1,
    // height:screenWidth*0.6

  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  textStyle: {
    fontFamily: FONTS.heading,
    fontSize: RFValue(14),
    color: '#ffff',
    fontWeight: '700',
    marginVertical: 5, // Reduced from 17 to give tighter spacing
  },
  img: {
    width: '30%',
    height: 'auto',
    aspectRatio: 1,
    resizeMode: 'contain'

  },
  imgContainer: {
    width: screenWidth * 1,
    height: screenWidth * 0.5,
    marginRight: 14,
    padding: 10,
    // backgroundColor:'#7d7d7d',

  }

})

export default AnimatedHorizontalList