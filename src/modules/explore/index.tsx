import React, { FC, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    FlatList,
    Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../utils/ui/ui';
import { FONTS } from '../../utils/Constants';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const EXPLORE_DATA = {
    hero: {
        title: "COSMIC\nTECH SUMMIT",
        location: "PIER 57, NYC",
        time: "OCT 24 • 8:00 PM",
        image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776717929/Gemini_Generated_Image_1iidet1iidet1iid_ubhizx.png",
    },
    categories: ["TECHNOLOGY", "MUSIC", "ART", "FOOD", "BUSINESS"],
    recommended: [
        {
            id: '1',
            title: "Midnight Jazz Session",
            location: "Blue Note, Manhattan",
            price: "$45.00",
            match: "98% MATCH",
            image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776717941/Gemini_Generated_Image_ytrirmytrirmytri_fsmwis.png",
        },
        {
            id: '2',
            title: "camera walk",
            location: "faridabad",
            price: "$20.00",
            match: "98% MATCH",
            image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776717977/Gemini_Generated_Image_iddul5iddul5iddu_ijtq91.png",
        },
        {
            id: '3',
            title: "Edm Night",
            location: "delhi, cp",
            price: "$20.00",
            match: "92% MATCH",
            image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776718374/Gemini_Generated_Image_lt62bzlt62bzlt62_fcweto.png",
        },
        {
            id: '4',
            title: "Gallery Walk",
            location: "Chelsea, NYC",
            price: "$20.00",
            match: "92% MATCH",
            image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800",
        }
    ],
    trending: [
        {
            id: 't1',
            category: "NIGHTLIFE",
            title: "Electric Forest Session",
            date: "OCT 26",
            attendance: "2.4K IN",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
        },
        {
            id: 't2',
            category: "BUSINESS",
            title: "Founders Coffee Meet",
            date: "OCT 28",
            attendance: "56 IN",
            image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776719151/Gemini_Generated_Image_th9gyzth9gyzth9g_k2ptlu.png",
        },
        {
            id: 't3',
            category: "Dj Night",
            title: "Dj Night",
            date: "OCT 23",
            attendance: "56 IN",
            image: "https://res.cloudinary.com/dniebxelj/image/upload/v1776718374/Gemini_Generated_Image_lt62bzlt62bzlt62_fcweto.png",
        }
    ]
};

const ExploreScreen: FC = () => {
    const [activeCategory, setActiveCategory] = useState("TECHNOLOGY");

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a0b2e', '#0f051a']}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Hero Section */}
                <ImageBackground
                    source={{ uri: EXPLORE_DATA.hero.image }}
                    style={styles.heroContainer}
                >
                    <LinearGradient
                        colors={['rgba(26, 11, 46, 0)', 'rgba(61, 8, 130, 0.45)', '#0f051a']}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.topNav}>
                        <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.logo}>Spott</CustomText>
                        <View style={styles.locationContainer}>
                            <IonIcon name="location-sharp" size={14} color="#a884ff" />
                            <CustomText variant="h9" fontFamily={FONTS.SemiBold} style={styles.locationText}>NEW YORK</CustomText>
                            <IonIcon name="chevron-down" size={12} color="#a884ff" />
                        </View>
                        <TouchableOpacity style={styles.profileBtn}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.profileImg} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroContent}>
                        <View style={styles.featuredLabel}>
                            <View style={styles.dot} />
                            <CustomText style={styles.featuredText}>FEATURED EXPERIENCE</CustomText>
                        </View>
                        <CustomText style={styles.heroTitle} numberOfLines={2}>{EXPLORE_DATA.hero.title}</CustomText>

                        <View style={styles.heroInfoRow}>
                            <View style={styles.infoPod}>
                                <CustomText style={styles.podLabel}>TIME</CustomText>
                                <CustomText style={styles.podValue}>{EXPLORE_DATA.hero.time}</CustomText>
                            </View>
                            <View style={styles.infoPod}>
                                <CustomText style={styles.podLabel}>LOCATION</CustomText>
                                <CustomText style={styles.podValue}>{EXPLORE_DATA.hero.location}</CustomText>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.heroBtn}>
                            <CustomText fontFamily={FONTS.Bold} style={styles.heroBtnText}>RESERVE ACCESS     →</CustomText>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
                        {EXPLORE_DATA.categories.map((cat, i) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setActiveCategory(cat)}
                                style={[
                                    styles.catPill,
                                    activeCategory === cat ? styles.catPillActive : styles.catPillInactive
                                ]}
                            >
                                <Icon
                                    name={cat === "MUSIC" ? "music" : "atom"}
                                    size={16}
                                    color={activeCategory === cat ? "#000" : "#a884ff"}
                                />
                                <CustomText style={[styles.catText, { color: activeCategory === cat ? "#000" : "#fff" }]}>{cat}</CustomText>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 340 }}>
                    <FlashList
                        data={EXPLORE_DATA.recommended}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20 }}
                        estimatedItemSize={width * 0.75}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.recomCard}>
                                <View style={styles.recomImgContainer}>
                                    <Image source={{ uri: item.image }} style={styles.recomImg} resizeMode="cover" />
                                    <View style={styles.matchBadge}>
                                        <CustomText style={styles.matchText}>{item.match}</CustomText>
                                    </View>
                                </View>

                                <View style={styles.cardInfo}>
                                    <CustomText variant="h7" fontFamily={FONTS.Bold} style={styles.cardTitle}>{item.title}</CustomText>
                                    <View style={styles.cardFooter}>
                                        <IonIcon name="location-outline" size={12} color="#aaa" />
                                        <CustomText style={styles.cardSubText}>{item.location}</CustomText>
                                    </View>

                                    <View style={styles.priceRow}>
                                        <View style={styles.avatarGroup}>
                                            <Image source={require('../../assets/avatars/avatar1.png')} style={styles.avatar} />
                                            <Image source={require('../../assets/avatars/avatar2.png')} style={[styles.avatar, { marginLeft: -12 }, styles.moreAvatar]} />
                                            <Image source={require('../../assets/avatars/avatar3.png')} style={[styles.avatar, { marginLeft: -12 }, styles.moreAvatar]} />
                                            <View style={[styles.avatar, styles.moreAvatar]}>
                                                <CustomText style={{ color: '#fff', fontSize: RFValue(6), fontFamily: FONTS.Bold }}>+1.2k</CustomText>
                                            </View>
                                        </View>
                                        <CustomText fontFamily={FONTS.Bold} style={styles.priceText}>{item.price}</CustomText>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* Trending Items */}
                <View style={styles.trendingHeaderContainer}>
                    <LinearGradient
                        colors={['rgba(46, 232, 252, 0.02)', 'rgba(8, 9, 11, 0)', 'rgba(0, 145, 255, 0.96)', 'transparent']}
                        style={styles.bgSphere}
                    />
                    <View style={styles.sectionHeader}>
                        <CustomText variant="h5" fontFamily={FONTS.Bold} style={styles.sectionTitle}>Trending</CustomText>
                        <View style={styles.trendingLine} />
                    </View>
                </View>

                {/* Use FlashList for vertical items to ensure performance as list grows */}
                <View style={{ flex: 1, minHeight: 300 }}>
                    <FlashList
                        data={EXPLORE_DATA.trending}
                        estimatedItemSize={110}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false} // Since it is inside a ScrollView
                        renderItem={({ item }) => (
                            <View style={styles.trendingItem}>
                                <Image source={{ uri: item.image }} style={styles.trendingImg} />
                                <View style={styles.trendingInfo}>
                                    <CustomText style={styles.trendingCat}>{item.category}</CustomText>
                                    <CustomText variant="h7" fontFamily={FONTS.Bold} style={styles.trendingTitle}>{item.title}</CustomText>
                                    <View style={styles.trendingFooter}>
                                        <CustomText style={styles.trendingSubText}>{item.date}  •  {item.attendance}</CustomText>
                                        <Icon name="chevron-right" size={20} color="#616161" />
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f051a19',
    },
    heroContainer: {
        width: '100%',
        height: height * 0.75,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 45,
    },
    logo: {
        color: '#fff',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    locationText: {
        color: '#fff',
        fontSize: RFValue(9),
    },
    profileBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 2,
        borderColor: '#a884ff',
        padding: 1,
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
    heroContent: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    featuredLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(169, 132, 255, 0.24)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(168,132,255,0.3)',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#a884ff',
    },
    featuredText: {
        color: '#ffffffff',
        fontSize: RFValue(7),
        fontFamily: FONTS.SemiBold,
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: RFValue(38),
        color: '#fff',
        fontFamily: FONTS.heading,
        marginVertical: 10,
        lineHeight: RFValue(36),
        letterSpacing: RFValue(-2.5),
        textShadowColor: 'rgba(255, 255, 255, 0.4)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    heroInfoRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    infoPod: {
        width: "40%",
        backgroundColor: 'rgba(15, 5, 26, 0.6)',
        padding: 9,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    podLabel: {
        color: '#00e5ff',
        fontSize: 7,
        fontFamily: FONTS.Bold,
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    podValue: {
        color: '#fff',
        fontSize: RFValue(11),
        fontFamily: FONTS.Bold,
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
    heroBtn: {
        backgroundColor: '#383739a8',
        paddingVertical: 9,
        paddingHorizontal: 1,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: "#a884ff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 9.3,
        shadowRadius: 15,
        elevation: 0,
        width: "50%",

    },
    heroBtnText: {
        color: '#fff',
        fontSize: RFValue(10),
        letterSpacing: 1,
    },
    categoriesSection: {
        marginTop: -10,
    },
    catScroll: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 15,
    },
    catPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 8,
        borderWidth: 1,
    },
    catPillActive: {
        backgroundColor: '#c4a6ff',
        borderColor: '#c4a6ff',
    },
    catPillInactive: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    catText: {
        fontSize: RFValue(9),
        fontFamily: FONTS.SemiBold,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 15,
    },
    aiPickRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    aiPickText: {
        color: '#00ffff',
        fontSize: 8,
        fontFamily: FONTS.Bold,
        letterSpacing: 2,
    },
    sectionTitle: {
        color: '#fff',
    },
    viewAll: {
        color: '#8b8b8b',
        fontSize: 10,
        fontFamily: FONTS.Bold,
    },
    recomCard: {
        width: width * 0.75,
        height: 320,
        marginRight: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    recomImgContainer: {
        width: '100%',
        height: '60%',
    },
    recomImg: {
        width: '100%',
        height: '100%',
    },
    matchBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(15, 5, 26, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 229, 255, 0.3)',
    },
    matchText: {
        color: '#00e5ff',
        fontSize: 10,
        fontFamily: FONTS.Bold,
    },
    cardInfo: {
        padding: 15,
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: '#fff',
        fontSize: RFValue(14),
        fontFamily: FONTS.Bold,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: -5,
    },
    cardSubText: {
        color: '#aaa',
        fontSize: 11,
        fontFamily: FONTS.Medium,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#1a0b2e',
    },
    moreAvatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#1b1a1a3e',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -12,
        borderWidth: 2,
        borderColor: '#47407587',
    },
    priceText: {
        color: '#fff',
        fontSize: RFValue(13),
        fontFamily: FONTS.Bold,
    },
    trendingLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginLeft: 20,
        marginBottom: 8,
    },
    trendingItem: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
    },
    trendingImg: {
        width: 100,
        height: 80,
        borderRadius: 16,
    },
    trendingInfo: {
        flex: 1,
        marginLeft: 15,
    },
    trendingCat: {
        color: '#00ffff',
        fontSize: 7,
        fontFamily: FONTS.Bold,
        letterSpacing: 1,
    },
    trendingTitle: {
        color: '#fff',
        marginTop: 4,
        marginBottom: 8,
    },
    trendingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    trendingSubText: {
        color: '#616161',
        fontSize: 9,
        fontFamily: FONTS.SemiBold,
    },
    trendingHeaderContainer: {
        position: 'relative',
        marginTop: 10,
    },
    bgSphere: {
        position: 'absolute',
        width: 700,

        height: 790,
        borderRadius: 195,
        top: -395,
        left: -90,
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 50,
        zIndex: -1,
        opacity: 0.15,
    },
});

export default ExploreScreen;
