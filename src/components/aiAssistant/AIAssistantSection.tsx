import React, { FC, useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '../../utils/ui/ui';
import { FONTS } from '../../utils/Constants';
import { RootState } from '../../store/store';
import { submitAIQuery, clearHistory } from '../../store/aiAssistant/slice';

interface AIAssistantSectionProps {
    isDark?: boolean;
}

const AIAssistantSection: FC<AIAssistantSectionProps> = ({ isDark }) => {
    const dispatch = useDispatch();
    const { history, loading, recommendedProps, externalSuggestions } = useSelector(
        (state: RootState) => state.aiAssistant
    );
    const [localQuery, setLocalQuery] = useState('');
    const [showExternal, setShowExternal] = useState(false);
    const scrollRef = useRef<ScrollView>(null);

    const handleSend = () => {
        if (localQuery.trim()) {
            dispatch(submitAIQuery(localQuery));
            setLocalQuery('');
        }
    };

    const handleClear = () => {
        dispatch(clearHistory());
    };

    useEffect(() => {
        if (history.length > 0) {
            scrollRef.current?.scrollToEnd({ animated: true });
        }
    }, [history]);

    const row1 = recommendedProps.slice(0, Math.ceil(recommendedProps.length / 2));
    const row2 = recommendedProps.slice(Math.ceil(recommendedProps.length / 2));

    const textColor = isDark ? '#fff' : '#222';
    const subTextColor = isDark ? '#aaa' : '#666';
    const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';

    return (
        <View style={styles.container}>
            {/* Artistic Header */}
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <Icon name="brain" size={RFValue(16)} color="#0672ff" />
                    <CustomText variant="h9" fontFamily={FONTS.Bold} style={[styles.title, { color: isDark ? '#00ffff' : '#0672ff' }]}>
                        NEURAL ASSISTANT
                    </CustomText>
                </View>
                <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                    <CustomText variant="h9" style={{ color: '#ff4d4d' }}>Wipe</CustomText>
                </TouchableOpacity>
            </View>

            {/* Chat History */}
            <View style={styles.chatArea}>
                {history.map((msg, index) => (
                    <View
                        key={msg.id || index}
                        style={[
                            styles.bubble,
                            msg.sender === 'user' ? styles.userBubble : [styles.aiBubble, { backgroundColor: isDark ? 'rgba(6, 114, 255, 0.15)' : '#f1f4f9' }],
                        ]}
                    >
                        <CustomText style={{ color: msg.sender === 'user' ? '#fff' : textColor, fontSize: RFValue(10) }}>
                            {msg.text}
                        </CustomText>
                    </View>
                ))}

                {loading && (
                    <View style={[styles.bubble, styles.aiBubble, styles.loadingBubble, { backgroundColor: isDark ? 'rgba(0, 255, 255, 0.1)' : '#eee' }]}>
                        <Icon name="dots-horizontal" size={RFValue(18)} color="#0672ff" />
                    </View>
                )}
            </View>

            {/* Premium Recommendations */}
            {recommendedProps.length > 0 && (
                <View style={styles.recomBlock}>
                    <CustomText variant="h9" fontFamily={FONTS.Bold} style={[styles.sectionTitle, { color: subTextColor }]}>
                        CURATED SELECTIONS
                    </CustomText>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recomRow}>
                        {row1.map((item, index) => (
                            <View key={item.id || index} style={[styles.propCard, { backgroundColor: inputBg, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                                <Image source={{ uri: item.image }} style={styles.propImage} />
                                <View style={styles.propInfo}>
                                    <CustomText variant="h9" fontFamily={FONTS.Bold} numberOfLines={1} style={{ color: textColor }}>
                                        {item.name}
                                    </CustomText>
                                    <CustomText variant="h9" style={styles.priceText}>
                                        ₹{item.price.toLocaleString()}
                                    </CustomText>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recomRow}>
                        {row2.map((item, index) => (
                            <View key={item.id || index} style={[styles.propCard, { backgroundColor: inputBg, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                                <Image source={{ uri: item.image }} style={styles.propImage} />
                                <View style={styles.propInfo}>
                                    <CustomText variant="h9" fontFamily={FONTS.Bold} numberOfLines={1} style={{ color: textColor }}>
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

            {/* Smart Input */}
            <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                <TextInput
                    style={[styles.input, { color: textColor }]}
                    placeholder="Refine search..."
                    placeholderTextColor={subTextColor}
                    value={localQuery}
                    onChangeText={setLocalQuery}
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                    <Icon name="arrow-up-circle" size={RFValue(28)} color={localQuery.trim() ? '#0672ff' : subTextColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 8,
        marginTop: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128, 128, 128, 0.08)',
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: RFValue(8),
        letterSpacing: 2,
    },
    clearBtn: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'rgba(255, 77, 77, 0.05)',
        borderRadius: 8,
    },
    chatArea: {
        gap: 10,
        marginBottom: 15,
    },
    bubble: {
        maxWidth: '85%',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#0672ff',
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    loadingBubble: {
        paddingVertical: 8,
    },
    recomBlock: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: RFValue(7),
        letterSpacing: 1.5,
        marginBottom: 10,
        marginLeft: 5,
    },
    recomRow: {
        marginBottom: 10,
    },
    propCard: {
        width: 130,
        borderRadius: 20,
        marginRight: 12,
        overflow: 'hidden',
        borderWidth: 1,
    },
    propImage: {
        width: '100%',
        height: 100,
    },
    propInfo: {
        padding: 10,
    },
    priceText: {
        color: '#0672ff',
        marginTop: 5,
        fontFamily: FONTS.Bold,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 18,
        paddingVertical: 4,
        marginTop: 5,
    },
    input: {
        flex: 1,
        fontSize: RFValue(11),
        fontFamily: FONTS.Regular,
        height: 55,
    },
    sendBtn: {
        marginLeft: 10,
    },
});

export default AIAssistantSection;
