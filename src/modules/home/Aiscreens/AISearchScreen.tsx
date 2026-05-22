import React, { FC, useCallback } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../utils/ui/ui';
import { FONTS } from '../../../utils/Constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RootState } from '../../../store/store';
import { submitAIQuery } from '../../../store/aiAssistant/slice';
import AIAssistantSection from '../../../components/aiAssistant/AIAssistantSection';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const QUICK_STARTERS = ["Wedding", "Birthday", "Baby Shower", "Corporate"];

const SUGGESTED_DATA = [
    {
        id: '1',
        title: "Dreamy Pastel Loft",
        match: "98% MATCH",
        description: "Matches pastel indoor birthday theme perfectly.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800",
    },
    {
        id: '2',
        title: "Neon Sky Garden",
        match: "94% MATCH",
        description: "Optimized for small groups with high-impact visuals.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    },
    {
        id: '3',
        title: "Neon Sky Garden",
        match: "94% MATCH",
        description: "Optimized for small groups with high-impact visuals.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    },
    {
        id: '4',
        title: "Neon Sky Garden",
        match: "94% MATCH",
        description: "Optimized for small groups with high-impact visuals.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800",
    }
];



const VENDORS_DATA = [
    { id: 'v1', name: "SONIC WAVES", rating: "4.9", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200" },
    { id: 'v2', name: "GOURMET LAB", rating: "4.8", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=200" },
    { id: 'v3', name: "BLOOM THEORY", rating: "5.0", image: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?q=80&w=200" },
];



const AISearchScreen: FC = () => {
    const dispatch = useDispatch();
    const { history, recommendedProps } = useSelector((state: RootState) => state.aiAssistant);

    const row1 = recommendedProps.slice(0, Math.ceil(recommendedProps.length / 2));
    const row2 = recommendedProps.slice(Math.ceil(recommendedProps.length / 2));

    const renderSuggestedItem = useCallback(({ item, index }: any) => (
        <Animated.View

            style={[
                styles.suggestedCard,
                {
                    marginTop: index % 2 === 0 ? 0 : 50,
                    marginBottom: index % 2 === 0 ? 50 : 0,
                }
            ]}
        >
            <View style={[styles.cardTop, { height: index % 2 === 0 ? 280 : 250 }]}>
                <Image source={{ uri: item.image }} style={styles.cardImg} resizeMode="cover" />
                <View style={styles.matchTag}>
                    <CustomText style={styles.matchTagText}>{item.match}</CustomText>
                </View>
            </View>
            <View style={styles.cardBottom}>
                <CustomText variant="h7" fontFamily={FONTS.Bold} style={styles.cardTitle}>{item.title}</CustomText>
                <View style={styles.descContainer}>
                    <CustomText style={styles.cardDesc}>{item.description}</CustomText>
                </View>
            </View>
        </Animated.View>
    ), []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a0b2e', '#0f051a']}
                style={StyleSheet.absoluteFill}
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <CustomText variant="h4" fontFamily={FONTS.Bold} style={styles.logoText}>
                        EVENT<CustomText style={{ color: '#00ffffff' }}>GO</CustomText>
                    </CustomText>
                </View>
                <TouchableOpacity style={styles.profileBtn}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.profileImg} />
                </TouchableOpacity>
            </View>

            {/* Pinned AI Assistant Conversation / Results */}
            {history.length > 0 ? (
                <View style={[styles.pinnedChatWrapper, { maxHeight: height * 0.32 }]}>


                    {/* Top Fade Overlay */}
                    <LinearGradient
                        colors={['#1a0b2e', 'transparent']}
                        style={styles.topFade}
                        pointerEvents="none"
                    />
                    <AIAssistantSection isDark={true} />
                    {/* Bottom Fade Overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 255, 255, 0.05)', 'rgba(0, 255, 255, 0.15)']}
                        style={styles.bottomFade}
                        pointerEvents="none"
                    />
                </View>
            ) : (
                /* Title */
                <View style={styles.titleSection}>
                    <CustomText variant="h2" fontFamily={FONTS.Bold} style={styles.mainTitle}>Plan with</CustomText>
                    <CustomText variant="h2" fontFamily={FONTS.Bold} style={styles.gradientTitle}>Intelligence</CustomText>
                </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Quick Starters */}
                <View style={styles.sectionHeader}>
                    <View style={styles.dashLine} />
                    <CustomText style={styles.sectionSubtitle}>QUICK STARTERS</CustomText>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.starterScroll}>
                    {QUICK_STARTERS.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.starterPill} onPress={() => {
                            dispatch(submitAIQuery(item));
                        }}>
                            <CustomText style={styles.starterText}>{item}</CustomText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* Filter Icons */}
                <View style={styles.filterBar}>
                    <FilterIcon name="wallet-outline" label="BUDGET" color="#ff00ff" />
                    <FilterIcon name="location-outline" label="LOCATION" color="#ff00ff" />
                    <FilterIcon name="business-outline" label="SPACE" color="#00ffff" />
                    <FilterIcon name="color-palette-outline" label="THEME" color="#ff00ff" />
                    <FilterIcon name="options-outline" label="MORE" color="#666" />
                </View>
                {/* AI Curated Selections (from Assistant) */}
                {recommendedProps.length > 0 && (
                    <View style={styles.recomBlock}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.dashLine} />
                            <CustomText style={styles.sectionSubtitle}>CURATED SELECTIONS</CustomText>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recomRow}>
                            {row1.map((item: any, index: number) => (
                                <View key={item.id || index} style={styles.propCard}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.propImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.propInfo}>
                                        <CustomText variant="h9" fontFamily={FONTS.Bold} numberOfLines={1} style={styles.propName}>
                                            {item.name}
                                        </CustomText>
                                        <CustomText variant="h9" style={styles.priceText}>
                                            ₹{item.price.toLocaleString()}
                                        </CustomText>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recomRow}>
                            {row2.map((item: any, index: number) => (
                                <View key={item.id || index} style={styles.propCard}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.propImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.propInfo}>
                                        <CustomText variant="h9" fontFamily={FONTS.Bold} numberOfLines={1} style={styles.propName}>
                                            {item.name}
                                        </CustomText>
                                        <CustomText variant="h9" style={styles.priceText}>
                                            ₹{item.price.toLocaleString()}
                                        </CustomText>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* AI Suggested */}
                <View style={styles.suggestedHeader}>
                    <View>
                        <View style={styles.aiPickRow}>
                            <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.sectionTitle}>AI Suggested</CustomText>
                            <IonIcon name="sparkles" size={18} color="#ff00ff" />
                        </View>
                        <CustomText style={styles.tailoredText}>TAILORED TO YOUR PREFERENCES</CustomText>
                    </View>
                    <TouchableOpacity>
                        <CustomText style={styles.viewAll}>VIEW ALL</CustomText>
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    data={SUGGESTED_DATA}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20, paddingBottom: 40 }}
                    snapToInterval={(width * 0.45 + 20) * 2}
                    decelerationRate="fast"
                    disableIntervalMomentum={true}
                    initialNumToRender={2}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    renderItem={renderSuggestedItem}
                    keyExtractor={(item) => item.id}
                />

                <View style={styles.vibeSection}>
                    <TouchableOpacity style={styles.vibeCircle}>
                        <LinearGradient
                            colors={['rgba(255, 0, 255, 0.2)', 'rgba(0, 255, 255, 0.2)']}
                            style={styles.vibeInner}
                        >
                            <IonIcon name="compass" size={24} color="#ff00ff" />
                            <CustomText style={styles.vibeText}>DISCOVER MORE VIBES</CustomText>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>



                {/* Elite Vendors */}
                <View style={styles.vendorHeader}>
                    <View style={styles.vendorDash} />
                    <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.sectionTitle}>Elite Vendors</CustomText>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vendorScroll}>
                    {VENDORS_DATA.map((v, i) => (
                        <View key={v.id} style={styles.vendorItem}>
                            <View style={styles.vendorImgWrapper}>
                                <Image source={{ uri: v.image }} style={styles.vendorImg} />
                                <View style={[styles.ratingBadge, { backgroundColor: i === 0 ? '#00ffff' : '#ff00ff' }]}>
                                    <CustomText style={styles.ratingText}>{v.rating}</CustomText>
                                </View>
                            </View>
                            <CustomText style={styles.vendorName}>{v.name}</CustomText>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const FilterIcon = ({ name, label, color }: any) => (
    <View style={styles.filterItem}>
        <View style={styles.filterCircle}>
            <IonIcon name={name} size={20} color={color} />
        </View>
        <CustomText style={[styles.filterLabel]}>{label}</CustomText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingTop: 20,
        paddingBottom: 150,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    logoText: {
        color: '#fff',
        letterSpacing: 1,
    },
    profileBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    titleSection: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    mainTitle: {
        color: '#fff',
        fontSize: RFValue(34),
        lineHeight: RFValue(38),
    },
    gradientTitle: {
        fontSize: RFValue(34),
        lineHeight: RFValue(38),
        backgroundColor: 'transparent',
        color: '#fff', // Fallback
    },
    pinnedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        gap: 6,
    },
    pinnedTitle: {
        color: '#00ffff',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        letterSpacing: 1.5,
    },
    pinnedScroll: {
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 15,
    },
    pinnedCard: {
        width: 160,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.2)',
        overflow: 'hidden',
    },
    pinnedGradient: {
        padding: 15,
        flexDirection: 'column',
        gap: 10,
    },
    pinnedTextContainer: {
        gap: 4,
    },
    pinnedChatTitle: {
        color: '#fff',
        fontSize: 12,
        fontFamily: FONTS.Bold,
    },
    pinnedChatDate: {
        color: '#888',
        fontSize: 9,
        fontFamily: FONTS.Medium,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    dashLine: {
        width: 30,
        height: 2,
        backgroundColor: '#00ffff',
        borderRadius: 1,
    },
    sectionSubtitle: {
        color: '#00ffff',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        letterSpacing: 2,
    },
    starterScroll: {
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 10,
    },
    starterPill: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    starterText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: FONTS.Medium,
    },
    suggestedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 20,
    },
    aiPickRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionTitle: {
        color: '#fff',
    },
    tailoredText: {
        color: '#ff00ff',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        letterSpacing: 1,
        marginTop: 5,
    },
    viewAll: {
        color: '#00ffff',
        fontSize: 11,
        fontFamily: FONTS.Bold,
    },
    suggestedCard: {
        width: width * 0.45,
        marginRight: 20,
        backgroundColor: 'rgba(15, 15, 15, 0.6)',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardTop: {
        height: 180,
    },
    cardImg: {
        width: '100%',
        height: '100%',
    },
    matchTag: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.3)',
    },
    matchTagText: {
        color: '#00ffff',
        fontSize: 8,
        fontFamily: FONTS.Bold,
    },
    cardBottom: {
        padding: 15,
    },
    cardTitle: {
        color: '#fff',
        marginBottom: 10,
    },
    descContainer: {
        backgroundColor: 'rgba(0, 255, 255, 0.05)',
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.1)',
    },
    cardDesc: {
        color: '#00ffff',
        fontSize: 9,
        fontFamily: FONTS.Medium,
        lineHeight: 12,
    },
    vibeSection: {
        alignItems: 'flex-start',
        paddingLeft: 40,
        marginTop: -70,
    },
    vibeCircle: {
        width: 120,
        height: 120,
        borderRadius: 90,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(15, 15, 15, 0.4)',
    },
    vibeInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    vibeText: {
        color: '#ff00ff',
        fontSize: 9,
        fontFamily: FONTS.Bold,
        textAlign: 'center',
        marginTop: 8,
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginTop: 40,
    },
    filterItem: {
        alignItems: 'center',
        gap: 8,
    },
    filterCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    filterLabel: {
        color: '#888',
        fontSize: 8,
        fontFamily: FONTS.Bold,
    },
    vendorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
        gap: 15,
    },
    vendorDash: {
        width: 4,
        height: 25,
        backgroundColor: '#ff00ff',
        borderRadius: 2,
    },
    vendorScroll: {
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 20,
    },
    vendorItem: {
        alignItems: 'center',
    },
    vendorImgWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        padding: 3,
        borderWidth: 2,
        borderColor: '#00ffff',
    },
    vendorImg: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    ratingBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    ratingText: {
        color: '#000',
        fontSize: 10,
        fontFamily: FONTS.Bold,
    },
    vendorName: {
        color: '#fff',
        fontSize: 9,
        fontFamily: FONTS.Bold,
        marginTop: 10,
    },
    floatingAdd: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    recomBlock: {
        marginTop: 20,
    },
    recomRow: {
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 15,
    },
    propCard: {
        width: 150,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    propImage: {
        width: '100%',
        height: 100,
    },
    propInfo: {
        padding: 10,
    },
    propName: {
        color: '#fff',
    },
    priceText: {
        color: '#00ffff',
        marginTop: 5,
        fontFamily: FONTS.Bold,
    },
    topFade: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        zIndex: 10,
    },
    bottomFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        zIndex: -100000,
    },

    pinnedChatWrapper: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: 'rgba(0, 255, 255, 0.25)',
        backgroundColor: 'rgba(15, 5, 25, 0.6)',
        overflow: 'hidden',
        shadowColor: '#31d6c302',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 10,
    },
    recomBlock: {
        marginTop: 20,
    },
    recomRow: {
        paddingHorizontal: 20,
        marginTop: 15,
        gap: 15,
    },
    propCard: {
        width: 150,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    propImage: {
        width: '100%',
        height: 120,
    },
    propInfo: {
        padding: 10,
    },
    propName: {
        color: '#fff',
    },
    priceText: {
        color: '#00ffff',
        marginTop: 5,
        fontFamily: FONTS.Bold,
    },
});

export default AISearchScreen;
