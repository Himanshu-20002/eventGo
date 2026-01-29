import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import BottomSheet, {BottomSheetRefProps} from './BottomSheet';
import {getProductsByCategoryId} from '@services/ProductService';
import ProductList from './products/ProductList';
import { ScrollView } from 'react-native-gesture-handler';

const ListDetail = ({route}: any) => {
  const {item} = route.params;
  const categoryID = item.categoryID;
  // - The `ref` is used to expose the `scrollTo` and `isActive` methods of the `BottomSheet` component to its parent component (`ListDetail`).
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const snapPoints = ['25%', '50%', '90%']; // Define snap points

  useEffect(() => {
    bottomSheetRef.current?.scrollTo(-700); // Present the bottom sheet
  }, []);

  const [products, setProducts] = useState<any[]>([]);
  const fetchProductsBycategoryId = async (Id: string) => {
    const response = await getProductsByCategoryId(Id);
    setProducts(response.slice(0,30));
  };
  useEffect(() => {
    fetchProductsBycategoryId(categoryID);
  }, []);
  return (
    <View style={styles.bottomSheetContainer}>
      <Image
        source={{uri: item.backgroundImage2}}
        style={styles.subcategoryImage}
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <ProductList data={products} />
      </BottomSheet>
    </View>
  );
};

const styles =  StyleSheet.create({
  bottomSheetContainer: {
    zIndex: 1,
    backgroundColor: '#9B7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subcategoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -46,
    left: 0,
  },
  featuredProductContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
    gap: 10,
  },
  featuredProductTextContainer: {
    zIndex: 1000,
    position: 'absolute',
    top: 22,
    left: 22,
  },
  productImage: {
    width: '40%',
    height: 99,
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'absolute',
    top: 77,
    zIndex: 1000,
    // backgroundColor: 'blue',
  },
  productBackgroundImage: {
    width: '100%',
    height: '100%',
    zIndex: 99,
    position: 'absolute',
    top: -230,
    left: 0,
  },
});
export default  ListDetail;
