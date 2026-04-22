import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';
import { selectCartItems, selectTotalPriceInCart } from '../api/slice';
import LoginModel from '@modules/account/molecules/LoginModel';
import { createOrder, createTransaction } from '../api/paygateway';
import { FONTS } from '@utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const PlaceOrderButton = () => {
    const price = useAppSelector(selectTotalPriceInCart);
    const user = useAppSelector(state => state.account.user);
    const cart = useAppSelector(selectCartItems);
    const [isVisible, setIsVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handlePlaceOrder = async () => {
        if (!user?._id || !user?.address) {
            Alert.alert("Error", "User information is missing");
            return;
        }

        try {
            setLoading(true);
            const transactionResponse = await createTransaction(price, user._id);

            if (!transactionResponse?.success) {
                Alert.alert('Error', transactionResponse?.message || 'Transaction failed');
                return;
            }

            await createOrder(
                transactionResponse.key,
                transactionResponse.amount,
                transactionResponse.order_id,
                cart,
                user._id,
                user.address
            );

        } catch (error) {
            Alert.alert('Error', 'Payment process failed');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.outerContainer}>
             <LinearGradient
                colors={['rgba(20, 12, 35, 0.95)', 'rgba(10, 5, 20, 0.98)']}
                style={styles.container}
            >
                <View style={styles.priceInfo}>
                    <View style={styles.billRow}>
                       <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
                       <Text style={styles.strikePrice}>₹{price + 90}</Text>
                    </View>
                    <Text style={styles.price}>₹{price}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (!user) {
                            setIsVisible(true);
                            return;
                        }

                        if (!user.address) {
                            Alert.alert("Missing Address", "Please add your delivery address");
                            return;
                        }

                        handlePlaceOrder();
                    }}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#00e5ff', '#2979ff']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.btnGradient}
                    >
                        {loading ? (
                            <ActivityIndicator color='white' size='small' />
                        ) : (
                            <View style={styles.btnContent}>
                                <Text style={styles.btnText}>Place Order</Text>
                                <IonIcon name="arrow-forward" size={18} color="#fff" />
                            </View>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
            {isVisible && <LoginModel visible={isVisible} onClose={() => setIsVisible(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        bottom: 100, // Above the tab bar
        width: width,
        paddingHorizontal: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    priceInfo: {
        flex: 1,
    },
    billRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    totalLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: RFValue(8),
        fontFamily: FONTS.Bold,
        letterSpacing: 0.5,
    },
    strikePrice: {
        fontSize: RFValue(10),
        color: 'rgba(255,255,255,0.3)',
        fontFamily: FONTS.Medium,
        textDecorationLine: 'line-through',
    },
    price: {
        fontSize: RFValue(22),
        color: '#fff',
        fontFamily: FONTS.Bold,
    },
    button: {
        width: 160,
        height: 54,
        borderRadius: 16,
        overflow: 'hidden',
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btnText: {
        color: '#fff',
        fontSize: RFValue(14),
        fontFamily: FONTS.Bold,
    }
});

export default PlaceOrderButton;