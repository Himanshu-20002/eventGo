import { View, Text, Modal, Touchable, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { loginOrSignup } from '../api/api'
import { useAppDispatch, useAppSelector } from '@store/reduxHook'
import { setUser } from '../api/slice'
import { navigate } from '@navigation/NavigationUtil'
import { clearCart } from '@modules/cart/api/slice'
import { modalStyles } from '@styles/modalStyles'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from '../../../component/atoms/Icon'
import { Colors } from '@utils/Constants'

const LoginModel: FC<{ visible: boolean, onClose: () => void }> = ({ visible, onClose }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.account.user)

    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')


    const handleLogin = async () => {
        const data = await loginOrSignup(number, address)
        if (data) {
            dispatch(setUser(data))
            onClose()
        } else {
            console.log("error in login")
        }
    }

    useEffect(() => {
        if (user?.phone) {
            setNumber(user.phone)
            setAddress(user.address)
        }
    }, [user])

    const handleLogout = async () => {
        onClose()
        navigate("Home")
        setAddress('')
        setNumber('')
        await dispatch(clearCart())
        await dispatch(setUser(null))
    }



    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
            onRequestClose={onClose}
        >



            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={modalStyles.modalContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={modalStyles.keyboardAvoidingView}>
                        <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
                            <View style={modalStyles.modalContent}>
                                <TouchableOpacity style={modalStyles.closeIcon} onPress={onClose}>
                                    <Icon size={20} name='close-outline' color='#000' iconFamily='Ionicons' />
                                </TouchableOpacity>
                                <Text style={modalStyles.title}>Login</Text>
                                <Text style={modalStyles.subTitle}>Enter your phone number and address to proceed</Text>

                                <TextInput
                                    style={modalStyles.input}
                                    placeholder='Phone Number'
                                    value={number}
                                    maxLength={10}
                                    onChangeText={setNumber}
                                    keyboardType='number-pad'
                                    placeholderTextColor={'#ccc'}
                                />
                                <TextInput
                                    style={modalStyles.input}
                                    placeholder='Address'
                                    value={address}
                                    textAlignVertical='top'
                                    multiline={true}
                                    onChangeText={setAddress}
                                    placeholderTextColor={'#ccc'}
                                />

                                <View style={modalStyles.buttonContainer}>
                                    <TouchableOpacity style={modalStyles.button} onPress={handleLogin}>
                                        <Text style={modalStyles.buttonText}>{!user ? 'Login' : 'Save'}</Text>
                                    </TouchableOpacity>
                                    {user && <TouchableOpacity style={[modalStyles.button, { backgroundColor: '#FF3800', borderColor: Colors.primary }]} onPress={handleLogout}>
                                        <Text style={modalStyles.buttonText}>Logout</Text>
                                    </TouchableOpacity>}

                                </View>




                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>

            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default LoginModel