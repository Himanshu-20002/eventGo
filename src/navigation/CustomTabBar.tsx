import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/Constants';
import { HomeIcon, ExploreIcon, CartIcon, AccountIcon, SparkelIcon, TicketIcon } from './TabIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { submitAIQuery } from '../store/aiAssistant/slice';

const { width } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const activeRouteName = state.routes[state.index].name;
    const [isSearchMode, setIsSearchMode] = useState(activeRouteName === 'AI Lab');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSendQuery = () => {
        if (localSearchQuery.trim().length > 0) {
            dispatch(submitAIQuery(localSearchQuery));
            setLocalSearchQuery('');
        }
    };

    const glowAnim = useRef(new Animated.Value(0)).current;
    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (activeRouteName === 'AI Lab') {
            setIsSearchMode(true);
        } else {
            setIsSearchMode(false);
        }
    }, [activeRouteName]);

    useEffect(() => {
        if (isSearchMode) {
            if (isInputFocused) {
                glowAnim.stopAnimation();
                Animated.timing(glowAnim, {
                    toValue: 1, // Steady, calm state to help focus
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            } else {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(glowAnim, {
                            toValue: 1,
                            duration: 2500,
                            useNativeDriver: false,
                        }),
                        Animated.timing(glowAnim, {
                            toValue: 0,
                            duration: 2500,
                            useNativeDriver: false,
                        })
                    ])
                ).start();
            }
        } else {
            glowAnim.stopAnimation();
            glowAnim.setValue(0);
        }
    }, [isSearchMode, isInputFocused, glowAnim]);

    const handleFocus = () => {
        setIsInputFocused(true);
        Animated.timing(focusAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsInputFocused(false);
        Animated.timing(focusAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const animatedBorderColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(23, 69, 217, 0.79)', 'rgba(28, 53, 90, 0.42)']
    });

    const animatedShadowOpacity = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 1]
    });

    const animatedShadowRadius = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 22]
    });

    return (
        <View style={styles.mainContainer}>
            {/* Tone 2: The Bottom Gradient Strip (The "Chair") */}
            <LinearGradient
                colors={['rgba(0, 255, 255, 0)', 'rgba(40, 156, 169, 1)', '#00ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.bottomStrip}
            >
            </LinearGradient>

            {/* Tone 1: The Floating Dark Bar / AI Search Bar */}
            {isSearchMode ? (
                <Animated.View style={[styles.aiSearchBarContainer, {
                    borderColor: animatedBorderColor,
                    shadowColor: animatedBorderColor,
                    shadowOpacity: animatedShadowOpacity,
                    shadowRadius: animatedShadowRadius,
                }]}>
                    <TouchableOpacity onPress={() => setIsSearchMode(!isSearchMode)} style={styles.closeSearchBtn}>
                        <IonIcon name="apps-outline" size={24} color="#666" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.aiInput}
                        placeholder="Refine your event concept..."
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={localSearchQuery}
                        onChangeText={setLocalSearchQuery}
                        onSubmitEditing={handleSendQuery}
                    />
                    <TouchableOpacity style={styles.sendButtonContainer} onPress={handleSendQuery}>
                        <LinearGradient
                            colors={['#8A2BE2', '#00ffff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.sendButton}
                        >
                            <IonIcon name="send-outline" size={20} color="#fff" style={{ marginLeft: 2 }} />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            ) : (
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
                            } else if (isFocused && route.name === 'AI Lab') {
                                setIsSearchMode(true);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        const IconComponent = () => {
                            const color = isFocused ? '#00ffff' : Colors.inactive;
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
            )}
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
        alignItems: 'center',
        paddingHorizontal: 25
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
        borderWidth: 7.5,
        borderColor: 'rgba(31, 77, 227, 0.67)',
    },
    aiSearchBarContainer: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(20, 12, 35, 0.98)',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 15,
        borderWidth: 7.5,
        borderColor: 'rgba(31, 77, 227, 0.5)',
    },
    closeSearchBtn: {
        marginRight: 10,
        padding: 5,
    },
    aiInput: {
        flex: 1,
        height: '100%',
        color: '#fff',
        fontSize: 16,
    },
    sendButtonContainer: {
        marginLeft: 10,
    },
    sendButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomTabBar;
