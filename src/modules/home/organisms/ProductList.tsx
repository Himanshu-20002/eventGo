import React, { FC } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../../utils/ui/ui';
import { FONTS, Colors, screenWidth } from '../../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

const ProductList: FC<{ data: any }> = ({ data }) => {

  const handleAddToCart = (item: any) => {
    Alert.alert('Success', `${item.title} added to your event cart! 🛒`);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <View>
          <CustomText variant="h6" fontFamily={FONTS.Bold} style={styles.title}>{item.title}</CustomText>
          <View style={styles.row}>
            <CustomText style={styles.price}>{item.price}</CustomText>
            <CustomText style={styles.availability}> • {item.availability}</CustomText>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.cartBtn}
          onPress={() => handleAddToCart(item)}
        >
          <LinearGradient
            colors={['#FFC201', '#E6B000']}
            style={styles.gradient}
          >
            <CustomText fontFamily={FONTS.Bold} style={styles.cartText}>RENT NOW</CustomText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.heading}>{data.title}</CustomText>
      <FlatList
        data={data.data}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  heading: {
    color: '#fff',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 16,
    gap: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 18,
  },
  info: {
    flex: 1,
    height: 110,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  title: {
    color: '#fff',
    fontSize: RFValue(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#FFC201',
    fontFamily: FONTS.Bold,
    fontSize: RFValue(15),
  },
  availability: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: RFValue(10),
  },
  cartBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  gradient: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: '#000',
    fontSize: RFValue(11),
    letterSpacing: 0.5,
  },
});

export default ProductList;
