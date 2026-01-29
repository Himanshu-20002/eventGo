import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@store/reduxHook'
import { FlatList } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { getOrderByUserId } from './api/api'
import { Custom } from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom'
import CustomSafeAreaView from '../../component/atoms/CustomSafeAreaView'
import { orderStyles } from '../../styles/orderStyles'
import { formatDate } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import LoginModel from './molecules/LoginModel'
// Define interfaces for type safety


interface RouteParams {
  isRefresh?: boolean;
}
const Account = () => {
  const user = useAppSelector(state => state.account.user)
  const route = useRoute()
  const item = route.params as RouteParams
  const [isVisible, setIsVisible] = React.useState(false)
  const [orders, setOrders] = useState<Order[]>([])

  const fetchOrders = async () => {
    // Only call API if user._id exists
    if (!user?._id) return;

    try {
      const data = await getOrderByUserId(user._id)
      if (data) {
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    }
  }
  useEffect(() => {
    if (user?._id) {
      fetchOrders()
    } else {
      setOrders([])
    }
  }, [user])

  useEffect(() => {
    if (item?.isRefresh && user?._id) {
      fetchOrders()
    }
  }, [item])



  const renderItem = ({ item ,index }: { item: any ,index:number }) => {
    return (
      <View style={orderStyles.order} key={index}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item ,index }) => {
            return (
              <View style={orderStyles.orderContainer} key={index}>
                <Image source={{ uri: item.image_uri }} style={orderStyles.image} />
                <View style={orderStyles.orderDetails}>
                  <Text style={orderStyles.itemName}>✦︎ {item.name}</Text>
                  <Text style={orderStyles.price}>🔖 {'₹'} {item.price} X {item.quantity}</Text>
                  {/* <Text style={orderStyles.itemTotal}>Total: {item.totalPrice}</Text> */}
                </View>


              </View>
            )
          }}
          contentContainerStyle={orderStyles.orderContainer}
        />
        <Text style={orderStyles.address}>{item.address}</Text>
        <Text style={orderStyles.deliveryDate}>Delivery by : {formatDate(item.delivery_date)}


        </Text>
        <View style={orderStyles.statusContainer}>
          <Text style={orderStyles.statusText}>{item.status}</Text>
        </View>


      </View>
    )
  }

  return (
    <>
      <CustomSafeAreaView>



        <View style={orderStyles.container}>
          <Text style={orderStyles.heading}>Account</Text>
          <Text style={orderStyles.heading}>{user?.phone || 'No phone'}</Text>

          <View style={orderStyles.flexRow}>
            <Text style={orderStyles.subHeading}>{user ? user?.address : 'Log in to get exciting offers'}</Text>
            <TouchableOpacity style={orderStyles.btn} onPress={() => setIsVisible(true)}>
              <Text style={orderStyles.btnText}>{user ? "update" : "login"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={orderStyles.listContainer}>
          <Text style={orderStyles.subHeading}>Your Orders</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            contentContainerStyle={orderStyles.orderContainer}
            ListEmptyComponent={
              <View style={styles.emptyText}>
                <Text style={[orderStyles.emptyText, { justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto-Regular', fontSize: RFValue(12)
                  ,color:'#353839'
                 }]}>{!user ? 'Login to view orders' : '♦️ There are no orders'}</Text>
              </View>
            }
          />

        </View>
        {isVisible && <LoginModel visible={isVisible} onClose={() => setIsVisible(false)} />}



      </CustomSafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: RFValue(12),
    color: '#222',
    textAlign: 'center',
    marginVertical: 40,
  },
})


export default Account