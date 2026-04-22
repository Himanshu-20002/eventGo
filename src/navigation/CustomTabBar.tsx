import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/Constants';
import { HomeIcon, ExploreIcon, CartIcon, AccountIcon, SparkelIcon, TicketIcon } from './TabIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.mainContainer}>
            {/* Tone 2: The Bottom Gradient Strip (The "Chair") */}
            <LinearGradient
                colors={['#00ffff', '#00e5ff', '#0091ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bottomStrip}
            >
                <TouchableOpacity style={styles.addButton}>
                    <IonIcon name="add" size={28} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Tone 1: The Floating Dark Bar */}
            <View style={styles.tabBarContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const IconComponent = () => {
                        const color = isFocused ? Colors.active : Colors.inactive;
                        const size = 26;
                        switch (route.name) {
                            case 'Home': return <HomeIcon focused={isFocused} size={size} color={color} />;
                            case 'Explore': return <ExploreIcon focused={isFocused} size={size} color={color} />;
                            case 'Booking': return <CartIcon focused={isFocused} size={size} color={color} />;
                            case 'Account': return <AccountIcon focused={isFocused} size={size} color={color} />;
                            case 'AI Lab': return <SparkelIcon focused={isFocused} size={size} color={color} />;
                            case 'Ticket': return <TicketIcon focused={isFocused} size={size} color={color} />;
                            default: return null;
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                        >
                            <IconComponent />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 110,
        backgroundColor: 'transparent',
    },
    bottomStrip: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    addButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 22.5,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(20, 12, 35, 0.98)',
        height: 70,
        borderRadius: 35,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 15,
        borderWidth: 9.5,
        borderColor: 'rgba(31, 77, 227, 0.67)',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomTabBar;
