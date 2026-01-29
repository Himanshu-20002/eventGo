import { navigate } from "@navigation/NavigationUtil"
import { BASE_URL } from "@store/config"
import RazorpayCheckout from "react-native-razorpay"
import axios, { AxiosError } from "axios"

interface TransactionResponse {
    success: boolean;
    message: string;
    key: string;            // Remove optional
    amount: number;         // Remove optional
    currency: string;       // Remove optional
    order_id: string;      // Remove optional
}

interface TransactionError {
    success: false;
    message: string;
    error?: string;
}

export const createTransaction = async (
    amount: number,
    userId: string
): Promise<TransactionResponse | TransactionError | null> => {
    if (!amount || !userId) {
        return {
            success: false,
            message: "Amount and userId are required"
        };
    }

    try {
        const response = await axios.post<TransactionResponse>(
            `${BASE_URL}/order/transaction`,
            {
                amount: Math.round(amount * 100),
                userId
            }
        );

        console.log('Transaction Response:', response.data);

        // Validate all required fields
        if (!response.data.key || !response.data.order_id || !response.data.amount) {
            return {
                success: false,
                message: "Invalid response from server: Missing required fields"
            };
        }

        return response.data;

    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Transaction Error:', {
            message: axiosError.message,
            response: axiosError.response?.data,
            status: axiosError.response?.status
        });

        return {
            success: false,
            message: "Failed to create transaction",
            error: axiosError.message
        };
    }
};



export const createOrder = async (
    key: string,
    amount: number,
    order_id: string,
    cart: any,
    userId: string,
    address: string,
) => {
    try {
        const options = {
            description: 'Kcart Order Payment',
            image: 'https://your-logo-url.png', // Update with your actual logo URL
            currency: 'INR',
            key: key,
            amount: amount,
            name: 'Kcart',
            order_id: order_id,
            theme: { color: '#009E60' }
        };

        console.log('Razorpay Options:', options); // Debug log
        const razorpayResponse = await RazorpayCheckout.open(options);
        console.log('Razorpay Response:', razorpayResponse); // Debug log
        if (razorpayResponse?.razorpay_payment_id) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7);
            const orderData = {
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                userId,
                cartItems: cart, 
                deliveryDate: deliveryDate.toISOString(),
                address: address
            };

            console.log('Sending order data:', orderData);

            const orderResponse = await axios.post(`${BASE_URL}/order`, orderData);
            console.log('Order Response:', orderResponse.data);
            console.log('Order Response:', orderResponse);


            if (orderResponse.data.success) {
                navigate("PaymentSuccess", {
                    price: amount / 100,
                    address,
                    orderId: order_id
                });
                return orderResponse.data;
            }
            throw new Error(orderResponse.data.message || 'Order creation failed');
        }
        throw new Error('Payment cancelled or failed');

    } catch (error) {
        console.error('Razorpay/Order Error:', error);
        throw error;
    }
};