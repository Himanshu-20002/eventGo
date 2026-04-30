import React, { FC, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
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
    const { history, loading, recommendedProps } = useSelector(
        (state: RootState) => state.aiAssistant
    );
    const scrollRef = useRef<ScrollView>(null);

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
        <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
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
        </ScrollView>
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
    priceText: {
        color: '#0672ff',
        marginTop: 5,
        fontFamily: FONTS.Bold,
    },
});

export default AIAssistantSection;
