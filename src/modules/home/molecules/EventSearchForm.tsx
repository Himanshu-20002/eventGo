import React, { FC, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import RollingContent from 'react-native-rolling-bar';
import { useDispatch } from 'react-redux';
import CustomText from '../../../utils/ui/ui';
import { FONTS } from '../../../utils/Constants';
import { submitAIQuery } from '../../../store/aiAssistant/slice';

interface EventSearchFormProps {
    onSearch: (query: string, minPrice: number, maxPrice: number, options: string) => void;
    isDark?: boolean;
}

const BUDGET_MAX = 100000;

const eventSearchSuggestions = [
    '🎊 Wedding pastel theme under ₹50K...',
    '🎂 Birthday party indoor garden...',
    '💼 Corporate event premium setup...',
    '🎵 Music night outdoor stage decor...',
    '🌸 Floral ceremony classic white...',
];

const EventSearchForm: FC<EventSearchFormProps> = ({ onSearch, isDark }) => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const [budget, setBudget] = useState(25000);
    const [options, setOptions] = useState('');

    const expandedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(focused ? 150 : 0, { duration: 400 }),
            opacity: withTiming(focused ? 1 : 0, { duration: 300 }),
            marginTop: withTiming(focused ? 20 : 0, { duration: 400 }),
        };
    });

    const handleSearchPress = () => {
        onSearch(query, 0, budget, options);
        if (query.trim()) {
            dispatch(submitAIQuery(query));
        }
        setFocused(false);
    };

    const textColor = isDark ? '#fff' : '#222';
    const subTextColor = isDark ? '#aaa' : '#666'; // Darker placeholder
    const inputBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

    const eventSearchSuggestions = [
        '🎊 Wedding pastel theme under ₹50K...',
        '🎂 Birthday party indoor garden...',
        '💼 Corporate event premium setup...',
        '🎵 Music night outdoor stage decor...',
        '🌸 Floral ceremony classic white...',
    ];

    const popularTags = ['Indoor', 'Pastel', 'Royal', 'Outdoor', 'Minimal', 'Night', 'Floral'];

    const toggleTag = (tag: string) => {
        const parts = options.split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (parts.includes(tag)) {
            setOptions(parts.filter(p => p !== tag).join(', '));
        } else {
            setOptions([...parts, tag].join(', '));
        }
    };

    const showRoller = query.length === 0 && !focused;

    return (
        <View style={styles.container}>
            {/* Artistic Search Input */}
            <View style={[styles.searchInputWrapper, { backgroundColor: inputBg, borderColor }]}>
                <Icon name="magnify" size={RFValue(18)} color="#0672ff" />

                {showRoller ? (
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => setFocused(true)}>
                        <View pointerEvents="none">
                            <RollingContent
                                defaultStyle={false}
                                customStyle={styles.rollingContainer}
                                interval={2000}>
                                {eventSearchSuggestions.map((item, index) => (
                                    <Text
                                        key={index}
                                        style={[styles.rollingText, { color: subTextColor }]}>
                                        {item}
                                    </Text>
                                ))}
                            </RollingContent>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TextInput
                        style={[styles.searchInput, { color: textColor }]}
                        placeholder="Describe your artistic vision..."
                        placeholderTextColor={subTextColor}
                        value={query}
                        onChangeText={setQuery}
                        onFocus={() => setFocused(true)}
                        onBlur={() => { if (query.length === 0) setFocused(false); }}
                        autoFocus={focused}
                        onSubmitEditing={handleSearchPress}
                    />
                )}

                {!showRoller && query.length > 0 && (
                    <TouchableOpacity onPress={() => { setQuery(''); setFocused(false); }}>
                        <Icon name="close-circle" size={RFValue(16)} color={subTextColor} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Premium Controls */}
            <Animated.View style={[expandedStyle, { overflow: 'hidden' }]}>
                {/* Suggested Tags Area */}
                <View style={styles.tagStrip}>
                    <CustomText variant="h9" style={[styles.miniLabel, { color: subTextColor }]}>SUGGESTIONS</CustomText>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagRow}>
                        {popularTags.map((tag) => {
                            const isSelected = options.split(',').map(s => s.trim()).includes(tag);
                            return (
                                <TouchableOpacity
                                    key={tag}
                                    style={[
                                        styles.tagPill,
                                        { backgroundColor: isSelected ? '#0672ff' : inputBg },
                                        isSelected && styles.selectedShadow
                                    ]}
                                    onPress={() => toggleTag(tag)}
                                >
                                    <CustomText variant="h9" style={{ color: isSelected ? '#fff' : textColor }}>{tag}</CustomText>
                                    <Icon
                                        name={isSelected ? "check" : "plus"}
                                        size={RFValue(10)}
                                        color={isSelected ? "#fff" : "#0672ff"}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={[styles.budgetCard, { backgroundColor: inputBg }]}>
                    <View style={styles.budgetHeader}>
                        <View style={styles.labelGroup}>
                            <Icon name="equalizer-outline" size={RFValue(14)} color="#0672ff" />
                            <CustomText style={[styles.label, { color: subTextColor }]} fontFamily={FONTS.SemiBold}>
                                ALLOCATION
                            </CustomText>
                        </View>
                        <View style={styles.valueBadge}>
                            <Text style={styles.badgeText}>₹{budget >= BUDGET_MAX ? '1L+' : (budget / 1000).toFixed(1) + 'K'}</Text>
                        </View>
                    </View>

                    <Slider
                        style={styles.slider}
                        minimumValue={500}
                        maximumValue={BUDGET_MAX}
                        step={500}
                        onValueChange={setBudget}
                        minimumTrackTintColor="#0672ff"
                        maximumTrackTintColor={isDark ? 'rgba(255,255,255,0.1)' : '#eee'}
                        thumbTintColor="#0672ff"
                    />
                </View>

                <View style={styles.actionRow}>
                    <View style={[styles.optionsBox, { backgroundColor: inputBg }]}>
                        <Icon name="tag-outline" size={RFValue(14)} color="#0672ff" />
                        <TextInput
                            style={[styles.optionsInput, { color: textColor }]}
                            placeholder="Tags..."
                            placeholderTextColor={subTextColor}
                            value={options}
                            onChangeText={setOptions}
                        />
                    </View>

                    <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
                        <Icon name="arrow-right-circle" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingVertical: 12,
        gap: 10,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        fontSize: RFValue(11),
        fontFamily: FONTS.Regular,
        padding: 0,
    },
    rollingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rollingText: {
        fontSize: RFValue(11),
        fontFamily: FONTS.Regular,
    },
    budgetCard: {
        borderRadius: 18,
        padding: 12,
        marginBottom: 10,
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    labelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    label: {
        fontSize: RFValue(8),
        letterSpacing: 1,
    },
    valueBadge: {
        backgroundColor: '#0672ff',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: RFValue(9),
        fontFamily: FONTS.Bold,
    },
    slider: {
        width: '100%',
        height: 30,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    optionsBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
        borderWidth: 1,
        borderColor: 'rgba(6, 114, 255, 0.15)',
    },
    optionsInput: {
        flex: 1,
        fontSize: RFValue(10),
        fontFamily: FONTS.Regular,
        padding: 0,
    },
    searchButton: {
        backgroundColor: '#0672ff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 15,
        gap: 6,
        elevation: 4,
        shadowColor: '#0672ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    btnText: {
        color: '#fff',
        fontSize: RFValue(10),
    },
    tagStrip: {
        marginBottom: 15,
        paddingHorizontal: 2,
    },
    miniLabel: {
        fontSize: RFValue(7),
        letterSpacing: 1.5,
        marginBottom: 8,
        marginLeft: 4,
        opacity: 0.6,
    },
    tagRow: {
        gap: 8,
        paddingBottom: 4,
    },
    tagPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 5,
        borderWidth: 1,
        borderColor: 'rgba(6, 114, 255, 0.1)',
    },
    selectedShadow: {
        shadowColor: '#0672ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        borderColor: '#0672ff',
    },
});

export default EventSearchForm;
