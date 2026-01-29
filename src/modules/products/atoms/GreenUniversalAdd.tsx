import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { addToCart, updateCartItem, selectCartItems, selectItemCountById, cartSlice } from '@modules/cart/api/slice';
import { Colors } from '@utils/Constants';
import reduxStorage from '@store/Storage';
import NetInfo from '@react-native-community/netinfo';

const GreenUniversalAdd: FC<{ item: any }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.account.user);
  const cart = useAppSelector(selectCartItems);
  const count = useAppSelector(selectItemCountById(item._id));
  const itemId = cart.find(i => i.productId === item._id)?.['_id'];
  const { addItemLocal, updateItemLocal } = cartSlice.actions;

  useEffect(() => {
    reduxStorage.setItem('offlineCart', JSON.stringify(cart));
  }, [cart]);

  // Helper to persist local cart
  // const persistLocalCart = async (updatedCart: any[]) => {
  //   await reduxStorage.setItem('offlineCart', JSON.stringify(updatedCart));
  // };

  // Add to cart handler
  const handleAdd = async () => {
    const netState = await NetInfo.fetch();
    if (netState.isConnected && user?._id) {
      // Online: update backend
      dispatch(addToCart({
        userId: user._id,
        productId: item._id,
        quantity: count + 1,
        // comboOption: item.comboOption
      }));
    } else {
      // Offline: update local cart and persist
      dispatch(addItemLocal({
        _id: item._id,
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
        totalPrice: item.price,
        // ...other fields
      }));
      // const updatedCart = [...cart, {
      //   _id: item._id,
      //   productId: item._id,
      //   name: item.name,
      //   price: item.price,
      //   quantity: 1,
      //   totalPrice: item.price,
      // }];
      // await persistLocalCart(updatedCart);
    }
  };

  // Remove from cart handler
const handleRemove = async () => {
  const netState = await NetInfo.fetch();
  if (count > 0 && itemId) {
    if (netState.isConnected && user?._id) {
      dispatch(updateCartItem({
        userId: user._id,
        itemId,
        quantity: count - 1,
        // comboOption: item.comboOption
      }));
    } else {
      dispatch(updateItemLocal({ itemId, quantity: count - 1 }));
    }
  }
};

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: count === 0 ? '#03C03C' : '#2a3439' },
        ]}>
        {count === 0 ? (
          <Pressable onPress={handleAdd} style={styles.add}>
            <Text style={styles.addText}>ADD</Text>
          </Pressable>
        ) : (
          <View style={styles.counterContainer}>
            <Pressable onPress={handleRemove} style={styles.minus}>
              <Icon name="minus" size={RFValue(14)} color="#fff" />
            </Pressable>
            <Text style={{ color: '#dff' }}>{count}</Text>
            <Pressable onPress={handleAdd} style={styles.plus}>
              <Icon name="plus" size={RFValue(14)} color="#fff" />
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    minus: {
      backgroundColor: Colors.primary,
      borderRadius: 7,
      padding: 2
    },
    plus: {
      backgroundColor: '#009E60',
      borderRadius: 7,
      padding: 2
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 7,
      width: 80,
    },
    counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%",
      paddingHorizontal: 4,
      paddingVertical: 6,
    },
    add: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
      paddingVertical: 6,
    },
    addText: {
      color: '#fff',
    },
  });

  export default GreenUniversalAdd;