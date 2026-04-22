import React, { FC, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../utils/ui/ui';
import { FONTS } from '../../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SUGGESTED_DATA = [
    { id: '1', title: "Speakeasy Lounge Setup", price: "$450/night", match: "98% MATCH", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600" },
    { id: '2', title: "Al-Fresco Terrace", price: "$820/event", match: "94% MATCH", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600" }
];

const FILTERS = ["ALL PROPS", "BUDGET", "NEON THEME", "OUTDOOR"];

const PROPS_DATA = [
    { id: 'p1', title: "Modern Fire Pit Set", availability: "AVAILABLE: TOMORROW", dist: "1.2MI", price: "$45/d", vendor: "URBAN SCAPE CO.", image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=400" },
    { id: 'p2', title: "Vintage Edison Array", availability: "AVAILABLE: NOW", dist: "0.8MI", price: "$120/d", vendor: "GLOW & HIRE", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c7?q=80&w=400" }
];

const VENDORS_DASH = [
    { id: 'v1', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { id: 'v2', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' },
    { id: 'v3', img: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' },
];

const SuggestedCard = React.memo(({ item, index }: any) => (
    <Animated.View entering={FadeInRight.delay(index * 100)} style={styles.suggestedCard}>
        <Image source={{ uri: item.image }} style={styles.suggestedImg} />
        <View style={styles.matchBadge}>
            <CustomText style={styles.matchText}>{item.match}</CustomText>
            <View style={styles.badgeDot} />
        </View>
        <View style={styles.cardInfo}>
            <CustomText variant="h7" fontFamily={FONTS.Bold} style={styles.cardTitle}>{item.title}</CustomText>
            <View style={styles.priceRow}>
                <CustomText style={styles.cardPrice}>{item.price}</CustomText>
                <TouchableOpacity style={styles.viewPlanBtn}>
                    <CustomText style={styles.viewPlanText}>VIEW AI PLAN</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    </Animated.View>
));

const PropCard = React.memo(({ prop, index }: any) => (
    <Animated.View entering={FadeInDown.delay(200 + index * 100)} style={styles.propCard}>
        <Image source={{ uri: prop.image }} style={styles.propImg} />
        <View style={styles.propDetails}>
            <View style={styles.propTitleRow}>
                <CustomText variant="h7" fontFamily={FONTS.Bold} style={styles.propTitle}>{prop.title}</CustomText>
                <CustomText style={styles.propPrice}>{prop.price}</CustomText>
            </View>
            <CustomText style={styles.propMeta}>{prop.availability} • {prop.dist}</CustomText>
            <View style={styles.vendorRow}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.vendorAvatar} />
                <CustomText style={styles.vendorName}>{prop.vendor}</CustomText>
            </View>
        </View>
    </Animated.View>
));

const VENDORS = [
    { id: 'v1', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { id: 'v2', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' },
    { id: 'v3', img: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' },
];

const MainDashboard: FC = () => {
    const [selectedFilter, setSelectedFilter] = useState("ALL PROPS");

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.sectionHeader}>
                    <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.heading}>Suggested for You ✨</CustomText>
                    <TouchableOpacity>
                        <CustomText style={styles.seeAll}>SEE ALL</CustomText>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestedScroll}>
                    {SUGGESTED_DATA.map((item, i) => (
                        <SuggestedCard key={item.id} item={item} index={i} />
                    ))}
                </ScrollView>

                {/* Props Near You Section */}
                <View style={styles.propsHeader}>
                    <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.heading}>Props Near You</CustomText>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {FILTERS.map((f) => (
                        <TouchableOpacity
                            key={f}
                            onPress={() => setSelectedFilter(f)}
                            style={[styles.filterPill, selectedFilter === f && styles.activePill]}
                        >
                            <CustomText style={[styles.filterText, selectedFilter === f && styles.activeFilterText]}>
                                {f}
                            </CustomText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.propList}>
                    {PROPS_DATA.map((prop, i) => (
                        <PropCard key={prop.id} prop={prop} index={i} />
                    ))}
                </View>

                {/* Top Rated Vendors */}
                <View style={[styles.sectionHeader, { marginTop: 40 }]}>
                    <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.heading}>Top Rated Vendors</CustomText>
                </View>

                <View style={styles.vendorContainer}>
                    {VENDORS_DASH.map((v) => (
                        <View key={v.id} style={styles.vendorCircleWrapper}>
                            <Image source={{ uri: v.img }} style={styles.vendorCircle} />
                            <View style={styles.onlineDot} />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addVendorBtn}>
                        <IonIcon name="add" size={24} color="#D2B48C" />
                    </TouchableOpacity>
                </View>

                {/* AI Concierge Card */}
                <View style={styles.aiCard}>
                    <View style={styles.aiHeader}>
                        <IonIcon name="sparkles" size={18} color="#D2B48C" />
                        <CustomText style={styles.aiLabel}>AI CONCIERGE</CustomText>
                    </View>
                    <View style={styles.aiInputArea}>
                        <CustomText style={styles.aiPlaceholder}>
                            I want to plan a rooftop birthday party for 20 people with a neon cyberpunk theme...
                        </CustomText>
                    </View>
                    <TouchableOpacity style={styles.getPlanBtn}>
                        <LinearGradient
                            colors={['#D2B48C', '#BC8F8F']}
                            style={styles.getPlanGradient}
                        >
                            <CustomText fontFamily={FONTS.Bold} style={styles.getPlanText}>GET AI PLAN ✨</CustomText>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F0',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    heading: {
        color: '#2D2D2D',
    },
    seeAll: {
        color: '#D2B48C',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        letterSpacing: 1,
    },
    suggestedScroll: {
        paddingLeft: 20,
        marginTop: 20,
    },
    suggestedCard: {
        width: width * 0.75,
        marginRight: 20,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    suggestedImg: {
        width: '100%',
        height: 180,
        borderRadius: 20,
    },
    matchBadge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    matchText: {
        color: '#8B4513',
        fontSize: 9,
        fontFamily: FONTS.Bold,
    },
    badgeDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#C19A6B',
        opacity: 0.6,
    },
    cardInfo: {
        padding: 15,
    },
    cardTitle: {
        color: '#2D2D2D',
        fontSize: RFValue(15),
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    cardPrice: {
        color: '#8B4513',
        fontSize: RFValue(14),
        fontFamily: FONTS.Bold,
    },
    viewPlanBtn: {
        borderWidth: 1,
        borderColor: '#E6DCCF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    viewPlanText: {
        color: '#A68D74',
        fontSize: 9,
        fontFamily: FONTS.Bold,
    },
    propsHeader: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    filterScroll: {
        paddingLeft: 20,
        marginTop: 15,
        gap: 10,
    },
    filterPill: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F0EBE0',
    },
    activePill: {
        backgroundColor: '#D2B48C',
        borderColor: '#D2B48C',
    },
    filterText: {
        color: '#A68D74',
        fontSize: 10,
        fontFamily: FONTS.Bold,
    },
    activeFilterText: {
        color: '#fff',
    },
    propList: {
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 15,
    },
    propCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        gap: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    propImg: {
        width: 90,
        height: 90,
        borderRadius: 18,
    },
    propDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    propTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    propTitle: {
        color: '#2D2D2D',
    },
    propPrice: {
        color: '#8B4513',
        fontSize: 12,
        fontFamily: FONTS.Bold,
    },
    propMeta: {
        color: '#A68D74',
        fontSize: 9,
        fontFamily: FONTS.Medium,
        marginTop: 4,
    },
    vendorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6,
    },
    vendorAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    vendorName: {
        color: '#A68D74',
        fontSize: 9,
        fontFamily: FONTS.Bold,
        textTransform: 'uppercase',
    },
    vendorContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 15,
        alignItems: 'center',
    },
    vendorCircleWrapper: {
        width: 66,
        height: 66,
        borderRadius: 33,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    vendorCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 33,
    },
    onlineDot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
    },
    addVendorBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E6DCCF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aiCard: {
        marginHorizontal: 20,
        marginTop: 40,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F0EBE0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    aiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    aiLabel: {
        color: '#BC9F7A',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        letterSpacing: 1,
    },
    aiInputArea: {
        backgroundColor: '#F9F7F2',
        borderRadius: 16,
        padding: 15,
        marginTop: 15,
        height: 80,
    },
    aiPlaceholder: {
        color: '#D1C9BE',
        fontSize: 13,
        lineHeight: 18,
    },
    getPlanBtn: {
        marginTop: 20,
        height: 54,
        borderRadius: 15,
        overflow: 'hidden',
    },
    getPlanGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getPlanText: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 1.5,
    },
});

export default MainDashboard;
