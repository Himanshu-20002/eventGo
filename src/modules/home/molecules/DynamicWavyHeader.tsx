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

const { width } = Dimensions.get('window');

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
        themeAnim.value = withTiming(theme === 'light' ? 0 : 1, { duration: 500 });
    }, [theme]);

    useEffect(() => {
        waveShift.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 4000 }),
                withTiming(0, { duration: 4000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedBgStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            themeAnim.value,
            [0, 1],
            ['#F3F2FF', '#1E1B4B'] // Soft Pastel Purple to deep Indigo
        );
        return { backgroundColor };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            themeAnim.value,
            [0, 1],
            ['#1F2937', '#F9FAFB']
        );
        return { color };
    });

    const animatedCurveStyle = useAnimatedStyle(() => {
        // Subtle shift in the curve to give a gentle fluid feel without overlap
        const scaleX = interpolate(waveShift.value, [0, 1], [1, 1.05]);
        const backgroundColor = interpolateColor(
            themeAnim.value,
            [0, 1],
            ['#F3F2FF', '#1E1B4B']
        );
        return { backgroundColor, transform: [{ scaleX }] };
    });

    return (
        <View style={styles.mainWrapper}>
            <Animated.View style={[styles.headerContainer, animatedBgStyle, { paddingTop: insets.top + 10 }]}>
                {/* Clean Content */}
                <View style={styles.topRow}>
                    <TouchableOpacity style={styles.iconCircle}>
                        <IonIcon
                            name={theme === 'light' ? "sparkles" : "moon"}
                            size={RFValue(20)}
                            color={theme === 'light' ? "#8B5CF6" : "#FDE047"}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleArea}>
                        <CustomText variant="h6" fontFamily={FONTS.Bold} style={[styles.title, animatedTextStyle]}>
                            {title.toUpperCase()}
                        </CustomText>
                    </View>
                    <TouchableOpacity style={styles.iconCircle} onPress={onSearchPress}>
                        <Icon name="magnify" size={24} color={theme === 'light' ? "#374151" : "#E5E7EB"} />
                    </TouchableOpacity>
                </View>

                {/* Minimal Search Bar */}
                <View style={styles.searchWrapper}>
                    <TouchableOpacity style={[
                        styles.inputBox,
                        { backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)' }
                    ]}>
                        <Icon name="magnify" size={18} color={theme === 'light' ? "#9CA3AF" : "#94A3B8"} />
                        <CustomText style={{ color: theme === 'light' ? "#9CA3AF" : "#94A3B8", fontSize: RFValue(11) }}>
                            Search events, organizers...
                        </CustomText>
                    </TouchableOpacity>
                </View>

                {/* THE SUBTLE CURVE - Controlled inside the hidden overflow container */}
                <Animated.View style={[styles.curveEmitter, animatedCurveStyle]} />
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
        height: 180, // Fixed height to respect layout flow
        overflow: 'hidden', // Wave stays INSIDE
        zIndex: 5,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
    },
    titleArea: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        letterSpacing: 2,
        fontSize: RFValue(12),
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 12,
    },
    curveEmitter: {
        position: 'absolute',
        bottom: -90, // Massive circle sitting at the bottom
        width: width * 2,
        height: 200,
        borderRadius: width,
        alignSelf: 'center',
        zIndex: -1,
    }
});

export default React.memo(DynamicWavyHeader);
