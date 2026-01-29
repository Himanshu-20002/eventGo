import { View, Text, StyleSheet ,Image, Touchable, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import CustomSafeAreaView from '../../component/atoms/CustomSafeAreaView'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppDispatch, useAppSelector } from '@store/reduxHook'
import { select } from 'redux-saga/effects'
import { fetchCart, selectCartItems } from './api/slice'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, screenHeight } from '@utils/Constants'
import GreenUniversalAdd from '@modules/products/atoms/GreenUniversalAdd'
import { navigate } from '@navigation/NavigationUtil'
import PlaceOrderButton from './atoms/PlaceOrderButton'


const Cart = () => {
  const cart = useAppSelector(selectCartItems)
  const user = useAppSelector(state => state.account.user)
   const dispatch = useAppDispatch();
   useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [user?._id, dispatch]);


  const renderItem = ({ item ,index }) => {

  
    return (
      <View style={styles.itemContainer} key={index}>
        <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image_uri }} style={styles.itemImage} />
            <GreenUniversalAdd item={item} />

        </View>
        <View style={styles.itemInfoContainer}>
        <Text style={styles.itemName}>✦︎ {item.name}</Text>
        <Text style={styles.itemPrice}>🔖 {'₹'} {item.price} X {item.quantity}</Text>
        <Text style={styles.itemTotal}>Total: {item.totalPrice}</Text>
        </View>
       
      
        
    
       

  
      </View>
    )
  }

  return (
    <CustomSafeAreaView >
    <View style={styles.container}>
      <Text style={styles.heading}>My Cart   🛒</Text>
      <Text style={styles.number}></Text>

      <Text style={styles.number}> 🗺️:Deliver to: {user?.address ? user?.address : 'Login first to place your order'}</Text>
      {/* <Text style={styles.address}>{user?.address ? user?.address : 'Login first to place your order'}>
        

      </Text> */}
    </View>
    {cart.length > 0 ? (
      <FlatList
      data={cart}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      />
    ) : (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Items in Cart</Text>
        <TouchableOpacity style={styles.shopNowContainer} onPress={() => navigate('Categories')}>
          <Text numberOfLines={1} style={styles.shopNowText}>ShopNow</Text>
        </TouchableOpacity>
      </View>
    )}

    {cart?.length > 0 && <PlaceOrderButton />}
    </CustomSafeAreaView>
  )
}
const styles = StyleSheet.create({
  shopNowContainer:{
    backgroundColor:'#A7FC00',
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:5,
    height:40,
    width:90,
    marginTop:10,
    marginBottom:10,
    alignItems:'center',
    justifyContent:'center',
  },
  emptyContainer:{
    height:screenHeight-80,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    padding:16,
  },
  itemInfoContainer:{
    width:'75%',
    alignItems:'flex-end',
    marginTop:10,
    justifyContent:'space-between',
  },
  itemImageContainer:{
    width:'25%',
    overflow:'hidden',
    alignItems:'center',
    borderRadius:10,
    padding:5,
    justifyContent:'space-between',
    height:140,
  },
  container: {
    borderBottomWidth: 5,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
    padding: 15,
    backgroundColor:'#FFDB00',
   marginHorizontal:8,
    borderRadius:10,
  },
  heading: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 20,

  },
  address:{
    color:'#666',
    marginTop:3
  },
  number:{
    fontWeight:'500',
  },
  emptyText:{
    fontSize:RFValue(14),
    color:'#666',
    marginTop:20,
    textAlign:'center',

  },
  shopNowText:{
    fontSize:RFValue(12),
    color:'#666',
    fontWeight:'500',
    lineHeight:RFValue(12),
    alignSelf:'center',
    

  },
  listContainer:{
    paddingHorizontal:10,
    paddingTop:10,
    paddingBottom:10,
    marginRight:-15,
    gap:10,
  },

  itemContainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'space-between',
    padding:10,
    backgroundColor:'#E6E6FA',
    borderRadius:10,
    marginRight:10,
  },
  itemImage:{
    width:80,
    height:80,
    resizeMode:'cover',
    borderRadius:10,
  },
  itemName:{
    fontSize:RFValue(14),
    fontWeight:'bold',
    color:'#000',
  },
  itemTotal:{ 
    fontSize:RFValue(12),
    color:'#ED2939',
    fontWeight:'bold',
    marginLeft:36,
  },
  itemQuantity:{
    fontSize:RFValue(12),
    color:'#000',
    fontWeight:'bold',
  
  },
  itemPrice:{
    fontSize:RFValue(12),
    color:'#880085',
    fontWeight:'bold', 
    padding:10,
  }
})

export default Cart