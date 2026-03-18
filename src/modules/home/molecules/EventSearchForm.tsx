import React, { FC, useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native';
import { FONTS } from '../../../utils/Constants';
import CustomText from '../../../utils/ui/ui';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import Animated, { interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated';
import RollingContent from 'react-native-rolling-bar';

// Event-specific rolling suggestions tailored to Evento app
const eventSearchSuggestions = [
    '🎊 Wedding pastel theme under ₹50K...',
    '🎂 Birthday party indoor garden...',
    '💼 Corporate event premium setup...',
    '🎵 Music night outdoor stage decor...',
    '🌸 Floral ceremony classic white...',
    '🎉 Anniversary candlelit surprise...',
];

interface EventSearchFormProps {
    onSearch: (query: string, minPrice: number, maxPrice: number, options: string) => void;
}

const BUDGET_MAX = 100000;

const EventSearchForm: FC<EventSearchFormProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [budget, setBudget] = useState(20000);
    const [options, setOptions] = useState('');

    const showRoller = !focused && query.length === 0;

    const { scrollY } = useCollapsibleContext();

    // Collapses the budget + options + button section on scroll
    const expandedStyle = useAnimatedStyle(() => {
        const height = interpolate(scrollY.value, [0, 90], [155, 0], Extrapolation.CLAMP);
        const opacity = interpolate(scrollY.value, [0, 55], [1, 0], Extrapolation.CLAMP);
        const marginTop = interpolate(scrollY.value, [0, 90], [10, 0], Extrapolation.CLAMP);
        return { height, opacity, marginTop, overflow: 'hidden' };
    });

    const formatCurrency = (val: number) => {
        if (val >= 100000) return '₹1L+';
        if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
        return `₹${val}`;
    };

    return (
        // StickyWrapper has the same blue as the CollapsibleHeader so it blends
        // seamlessly - no more blue gap when stuck at top
        <StickyView style={styles.stickyWrapper}>
            <View style={styles.container}>
                {/* Query Input — shows rolling suggestions when idle */}
                <View style={styles.searchInputWrapper}>
                    <Icon name="magnify" size={RFValue(17)} color="#0672ff" />

                    {/* Rolling suggestion overlay — hidden when typing */}
                    {showRoller ? (
                        <RollingContent
                            defaultStyle={false}
                            customStyle={styles.rollingContainer}
                            interval={2000}>
                            {eventSearchSuggestions.map((item, index) => (
                                <Text
                                    key={index}
                                    style={styles.rollingText}
                                    onPress={() => setFocused(true)}>
                                    {item}
                                </Text>
                            ))}
                        </RollingContent>
                    ) : (
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Describe your event..."
                            placeholderTextColor="#aaa"
                            value={query}
                            onChangeText={setQuery}
                            onFocus={() => setFocused(true)}
                            onBlur={() => { if (query.length === 0) setFocused(false); }}
                            autoFocus={focused}
                        />
                    )}

                    {/* Clear / collapse button */}
                    {!showRoller && (
                        <TouchableOpacity onPress={() => { setQuery(''); setFocused(false); }}>
                            <Icon name="close-circle" size={RFValue(14)} color="#ccc" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Collapsible: budget + options + button */}
                <Animated.View style={expandedStyle}>
                    {/* Budget Row */}
                    <View style={styles.budgetBlock}>
                        <View style={styles.budgetLabelRow}>
                            <View style={styles.budgetLabelLeft}>
                                <Icon name="currency-inr" size={RFValue(12)} color="#0672ff" />
                                <CustomText style={styles.budgetLabel} fontFamily={FONTS.SemiBold} variant="h9">
                                    Budget
                                </CustomText>
                            </View>
                            <View style={styles.budgetBadge}>
                                <CustomText style={styles.budgetBadgeText} fontFamily={FONTS.Bold} variant="h9">
                                    {formatCurrency(budget)}
                                </CustomText>
                            </View>
                        </View>
                        <View style={styles.sliderRangeRow}>
                            <Text style={styles.sliderRangeText}>₹500</Text>
                            <Text style={styles.sliderRangeText}>₹1L+</Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={500}
                            maximumValue={BUDGET_MAX}
                            step={500}
                            value={budget}
                            onValueChange={setBudget}
                            minimumTrackTintColor="#0672ff"
                            maximumTrackTintColor="#e0e7ff"
                            thumbTintColor="#0672ff"
                        />
                    </View>

                    {/* Options + Button */}
                    <View style={styles.bottomRow}>
                        <View style={styles.optionsWrapper}>
                            <Icon name="tag-multiple-outline" size={RFValue(14)} color="#0672ff" />
                            <TextInput
                                style={styles.optionsInput}
                                placeholder="Tags (Indoor, Pastel...)"
                                placeholderTextColor="#bbb"
                                value={options}
                                onChangeText={setOptions}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.searchButton}
                            activeOpacity={0.85}
                            onPress={() => onSearch(query, 0, budget, options)}
                        >
                            <Icon name="creation" size={RFValue(14)} color="#fff" />
                            <CustomText style={styles.searchButtonText} variant="h9" fontFamily={FONTS.Bold}>
                                Search
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </StickyView>
    );
};

const styles = StyleSheet.create({
    // Outer StickyView wrapper - blue matches CollapsibleHeaderContainer
    // so no gap is visible when the form sticks at top
    stickyWrapper: {
        backgroundColor: '#0672ff',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 10,
        elevation: 4,
        shadowColor: '#0055cc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f4ff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 9,
        marginBottom: 10,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        color: '#222',
        fontSize: RFValue(11),
        fontFamily: FONTS.Regular,
        padding: 0,
        margin: 0,
    },
    rollingContainer: {
        flex: 1,
        height: 24,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    rollingText: {
        color: '#999',
        fontSize: RFValue(11),
        fontFamily: FONTS.Regular,
    },
    budgetBlock: {
        backgroundColor: '#f7f9ff',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 2,
        marginBottom: 10,
    },
    budgetLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetLabelLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    budgetLabel: {
        color: '#444',
        fontSize: RFValue(10),
    },
    budgetBadge: {
        backgroundColor: '#0672ff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    budgetBadgeText: {
        color: '#fff',
        fontSize: RFValue(9),
    },
    sliderRangeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        marginTop: 2,
    },
    sliderRangeText: {
        fontSize: RFValue(8),
        color: '#aaa',
        fontFamily: FONTS.Regular,
    },
    slider: {
        width: '100%',
        height: 28,
        marginTop: -4,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    optionsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f4ff',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 9,
        gap: 6,
    },
    optionsInput: {
        flex: 1,
        color: '#222',
        fontSize: RFValue(10),
        fontFamily: FONTS.Regular,
        padding: 0,
        margin: 0,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#0672ff',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 40,
        elevation: 3,
        shadowColor: '#0672ff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: RFValue(10),
    },
});

export default EventSearchForm;
