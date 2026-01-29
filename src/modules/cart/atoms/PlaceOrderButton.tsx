import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppSelector } from '@store/reduxHook'
import { selectCartItems, selectTotalPriceInCart } from '../api/slice'
import LoginModel from '@modules/account/molecules/LoginModel'
import { createOrder, createTransaction } from '../api/paygateway'

const PlaceOrderButton = () => {
    const price = useAppSelector(selectTotalPriceInCart)
    const user = useAppSelector(state => state.account.user)
    const cart = useAppSelector(selectCartItems);
    const [isVisible, setIsVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const handlePlaceOrder = async () => {
        // Early return if user or user._id is not available
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
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.strikePrice}>₹{price + 90}</Text>
                    <Text style={styles.price}>₹{price}
                        <Text style={{ fontSize: RFValue(15), color: '#1A2421', fontWeight: '600' }}>
                            {" "}💒
                        </Text>
                    </Text>
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
                    {loading ? (
                        <ActivityIndicator color='black' size='small' />
                    ) : (
                        <Text style={styles.btnText}>Place Order</Text>
                    )}
                </TouchableOpacity>
            </View>
            {isVisible && <LoginModel visible={isVisible} onClose={() => setIsVisible(false)} />}
        </>
    )
}

const styles = StyleSheet.create({
    strikePrice: {
        fontSize: RFValue(12),
        color: '#000',
        fontWeight: '600',
        textDecorationLine: 'line-through',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFAF0',
        padding: 10,
        gap: 10,
    },
    price: {
        fontSize: RFValue(17),
        padding: 5,
        color: '#000',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#009E60',
        padding: 10,
        borderRadius: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginRight: 16,
    },
    btnText: {
        color: '#3FFF00',
        fontSize: RFValue(13),
        fontWeight: 'bold',
    }
})

export default PlaceOrderButton