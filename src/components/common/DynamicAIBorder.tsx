import React, { useEffect } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';

interface DynamicAIBorderProps extends ViewProps {
    isDark?: boolean;
    children: React.ReactNode;
}

const DynamicAIBorder: React.FC<DynamicAIBorderProps> = ({ isDark, children, style }) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2500 }),
                withTiming(0, { duration: 2500 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            progress.value,
            [0, 1],
            isDark 
                ? ['rgba(0, 255, 255, 0.4)', 'rgba(6, 114, 255, 0.8)'] 
                : ['rgba(6, 114, 255, 0.4)', 'rgba(0, 255, 255, 0.7)']
        );

        return {
            borderColor,
            borderWidth: 1.5,
            shadowColor: borderColor,
            shadowOpacity: 0.6 * progress.value + 0.2,
            shadowRadius: 10 * progress.value + 4,
            elevation: 8 * progress.value + 2,
        };
    });

    return (
        <Animated.View style={[styles.borderContainer, animatedStyle, style]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    borderContainer: {
        borderRadius: 30,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
});

export default DynamicAIBorder;
