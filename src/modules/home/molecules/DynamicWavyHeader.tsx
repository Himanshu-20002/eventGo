import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor,
    withRepeat,
    withSequence,
    interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomText from '../../../utils/ui/ui';
import { FONTS } from '../../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width, height: screenHeight } = Dimensions.get('window');

interface Props {
    theme: 'light' | 'dark';
    title: string;
    onSearchPress?: () => void;
}

const DynamicWavyHeader: FC<Props> = ({ theme, title, onSearchPress }) => {
    const insets = useSafeAreaInsets();
    const themeAnim = useSharedValue(theme === 'light' ? 0 : 1);
    const waveShift = useSharedValue(0);

    useEffect(() => {
        themeAnim.value = withTiming(theme === 'light' ? 0 : 1, { duration: 400 });
    }, [theme]);

    useEffect(() => {
        waveShift.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 5000 }),
                withTiming(0, { duration: 5000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedBgStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            themeAnim.value,
            [0, 1],
            ['#e8e9eb95', '#0A0A0A'] // Pure White to Deep Night
        );
        return { backgroundColor };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            themeAnim.value,
            [0, 1],
            ['#000000', '#FFFFFF'] // Stark Black for Light mode, Pure White for Dark
        );
        return { color };
    });

    return (
        <View style={styles.mainWrapper}>
            <Animated.View style={[
                styles.headerContainer,
                animatedBgStyle,
                { paddingTop: insets.top + (screenHeight * 0.072) }
            ]}>

                {/* Clean Content Layer */}
                <View style={styles.topRow}>
                    <View style={styles.titleArea}>
                        <Animated.Text
                            style={[
                                styles.title,
                                {
                                    fontFamily: FONTS.Bold,
                                    fontSize: RFValue(14),
                                    textAlign: 'center'
                                },
                                animatedTextStyle
                            ]}
                        >
                            {title?.toUpperCase() || ""}
                        </Animated.Text>
                    </View>
                </View>

                {/* Minimal Search Bar */}
                <View style={[styles.searchWrapper, { opacity: title ? 1 : 0 }]}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onSearchPress}
                        style={[
                            styles.inputBox,
                            { backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)' }
                        ]}
                    >
                        <Icon name="magnify" size={RFValue(18)} color={theme === 'light' ? "#666" : "#94A3B8"} />
                        <CustomText style={{ color: theme === 'light' ? "#666" : "#94A3B8", fontSize: RFValue(11) }}>
                            Search events, organizers...
                        </CustomText>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        width: '100%',
        backgroundColor: 'transparent',

    },
    headerContainer: {
        width: '100%',
        minHeight: screenHeight * 0.2, // Responsive height based on screen
        paddingBottom: screenHeight * 0.02,
        overflow: 'visible',
        zIndex: 5,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.06,
        height: screenHeight * 0.06,
    },
    titleArea: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        letterSpacing: 3,
    },
    searchWrapper: {
        paddingHorizontal: width * 0.06,
        marginTop: screenHeight * 0.015,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingVertical: screenHeight * 0.015,
        borderRadius: 30,
        gap: 12,
    },
});

export default React.memo(DynamicWavyHeader);
