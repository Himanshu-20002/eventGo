import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { fetchCart, selectCartItems } from './api/slice';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, FONTS, screenHeight } from '@utils/Constants';
import GreenUniversalAdd from '@modules/products/atoms/GreenUniversalAdd';
import { navigate } from '@navigation/NavigationUtil';
import PlaceOrderButton from './atoms/PlaceOrderButton';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Cart = () => {
    const cart = useAppSelector(selectCartItems);
    const user = useAppSelector(state => state.account.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchCart(user._id));
        }
    }, [user?._id, dispatch]);

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemCard} key={item._id}>
                <View style={styles.itemTop}>
                    <View style={styles.itemImageContainer}>
                        <Image source={{ uri: item.image_uri }} style={styles.itemImage} resizeMode="cover" />
                        <View style={styles.quantityBadge}>
                            <GreenUniversalAdd item={item} />
                        </View>
                    </View>

                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.itemPrice}>₹{item.price}</Text>
                            <Text style={styles.itemMultiplier}> × {item.quantity}</Text>
                        </View>
                        <View style={styles.totalBadge}>
                            <Text style={styles.itemTotal}>Total: ₹{item.totalPrice}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.removeBtn}>
                    <IonIcon name="trash-outline" size={18} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['#1a0b2e', '#0f051a']}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Event Cart</Text>
                <View style={styles.cartBadge}>
                    <IonIcon name="cart" size={20} color="#00ffff" />
                    <Text style={styles.badgeText}>{cart.length}</Text>
                </View>
            </View>

            {user?.address && (
                <View style={styles.deliveryInfo}>
                    <View style={styles.deliveryHeader}>
                        <IonIcon name="location" size={16} color="#ff00ff" />
                        <Text style={styles.deliveryLabel}>DELIVERING TO</Text>
                    </View>
                    <Text style={styles.addressText} numberOfLines={1}>{user.address}</Text>
                </View>
            )}

            {cart.length > 0 ? (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                        <IonIcon name="cart-outline" size={60} color="rgba(0, 255, 255, 0.2)" />
                    </View>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>Looks like you haven't added any magic to your event yet.</Text>
                    <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigate('Home')}>
                        <LinearGradient
                            colors={['#00e5ff', '#2979ff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientBtn}
                        >
                            <Text style={styles.shopNowText}>Explore Store</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}

            {cart?.length > 0 && <PlaceOrderButton />}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: RFValue(24),
        fontFamily: FONTS.Bold,
        color: '#fff',
    },
    cartBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.2)',
    },
    badgeText: {
        color: '#00ffff',
        fontFamily: FONTS.Bold,
        fontSize: RFValue(12),
    },
    deliveryInfo: {
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 10,
    },
    deliveryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    deliveryLabel: {
        color: '#ff00ff',
        fontSize: RFValue(9),
        fontFamily: FONTS.Bold,
        letterSpacing: 1,
    },
    addressText: {
        color: '#fff',
        fontSize: RFValue(12),
        fontFamily: FONTS.Medium,
        opacity: 0.8,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 150,
        gap: 15,
    },
    itemCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: 24,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.06)',
    },
    itemTop: {
        flexDirection: 'row',
        gap: 15,
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    quantityBadge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    itemName: {
        color: '#fff',
        fontSize: RFValue(14),
        fontFamily: FONTS.Bold,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    itemPrice: {
        color: '#00ffff',
        fontSize: RFValue(13),
        fontFamily: FONTS.Bold,
    },
    itemMultiplier: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: RFValue(12),
        fontFamily: FONTS.Medium,
    },
    totalBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 0, 255, 0.08)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginTop: 8,
    },
    itemTotal: {
        color: '#ff00ff',
        fontSize: RFValue(11),
        fontFamily: FONTS.Bold,
    },
    removeBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    emptyTitle: {
        color: '#fff',
        fontSize: RFValue(17),
        fontFamily: FONTS.Bold,
        marginBottom: 10,
    },
    emptySubtitle: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: RFValue(9),
        fontFamily: FONTS.Medium,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 5,
    },
    shopNowBtn: {
        width: '60%',
        alignSelf: 'center',
        height: '10%',
        padding: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBtn: {
        paddingVertical: 8,
        borderRadius: 160,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    shopNowText: {
        color: '#fff',
        fontSize: RFValue(12),
        fontFamily: FONTS.Bold,
    },
});

export default Cart;