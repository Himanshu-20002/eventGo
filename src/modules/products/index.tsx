import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getProductsByCategory } from './api/getProducts'
import { screenHeight } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from './atoms/SearchBar'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from './atoms/ProductItem'
import { useAppSelector } from '@store/reduxHook'
import { select } from 'redux-saga/effects'
import { selectTotalItemsInCart } from '@modules/cart/api/slice'

const ProductList: FC = () => {

  const route = useRoute()
  const categoryId = route.params as any
  const count = useAppSelector(selectTotalItemsInCart)
  const [products, setProducts] = useState([])



  const fetchProducts = async () => {
    const data = await getProductsByCategory(categoryId?.id)
    console.log(categoryId?.id)
    setProducts(data)
  }
  useEffect(() => {
    if (categoryId?.id) {

      fetchProducts()
    }


  }, [categoryId.id])




  return (
    <View>
      <SafeAreaView />
      <SearchBar cartLength={count} />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}


        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Products Found</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const isOdd = index % 2 === 0
          return (

            <ProductItem item={item} isOdd={isOdd} />

          )



        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: -15,
    gap: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#E0E0E0'
  },
  listContainer: {
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    height: screenHeight - 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
})

export default ProductList