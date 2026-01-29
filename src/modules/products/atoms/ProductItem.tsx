import { View, Text, ImageBackground, StyleSheet,Image } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import GreenUniversalAdd from './GreenUniversalAdd'
import { useAppSelector } from '@store/reduxHook'
import { selectCartItems } from '@modules/cart/api/slice'

interface ProductItemProps {
  item: any
  isOdd: boolean
}

const ProductItem: FC<ProductItemProps> = ({ item, isOdd }) => {     
    
   
  return (
    <View style={[styles.productCart,{marginRight:isOdd?0:10}]}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.image_uri }} style={styles.productImage} />
          
        </View>
        <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>
               <Text style={{textDecorationLine:'line-through'}}>₹{item.price + 90 }</Text>
               {"  "}{item.price}
                 
            </Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={styles.hotDealContainer}>
                

            <Text style={styles.hotDealText}>Hot Deal</Text>
            </View>
            <Text style={styles.hotDealText}>{item.discount}🎉30% OFF</Text>

    </View>
            <GreenUniversalAdd item={item} />
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    hotDealContainer:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:'#D8C7FA',
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:5,
        height:25,
        width:60,
        marginTop:10,
        marginBottom:10,

    },
    hotDealText:{
        fontSize:RFValue(8),
        color:'#000',
    },
    productCart:{
        width:'48%',
        overflow:'hidden',
        marginBottom:10,
        backgroundColor:'#fff',
        borderRadius:10,
        gap:10,
    },
    imageContainer:{
        backgroundColor:'#4EC5F1',
        width:'100%',
        height:260
    },
    productImage:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:10,
    },
    productInfo:{
        paddingHorizontal:10,
        backgroundColor:'#fff',
    },
    productName:{
        marginTop:10,
        fontSize:RFValue(14),
        fontWeight:'bold',
        color:'#000'
    },
    productPrice:{
        fontSize:RFValue(12),
        justifyContent:'space-between',
        marginBottom:10,
        marginTop:10,
    },
    productDescription:{
        fontSize:RFValue(12),
        color:'#666',
        marginTop:5 
    }
})

export default ProductItem