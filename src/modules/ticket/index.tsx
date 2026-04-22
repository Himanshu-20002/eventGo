import React, { FC } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../utils/ui/ui';
import { FONTS } from '../../utils/Constants';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Ticket: FC = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a0b2e', '#0f051a']}
                style={StyleSheet.absoluteFill}
            />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <CustomText variant="h3" fontFamily={FONTS.Bold} style={styles.title}>My Tickets</CustomText>
                    <CustomText style={styles.subtitle}>Your upcoming cosmic experiences</CustomText>
                </View>

                {/* Empty State / Simple Ticket Mock */}
                <View style={styles.ticketCard}>
                    <View style={styles.ticketTop}>
                        <View>
                            <CustomText variant="h6" fontFamily={FONTS.Bold} style={styles.eventName}>COSMIC TECH SUMMIT</CustomText>
                            <CustomText style={styles.eventDetails}>PIER 57, NYC • OCT 24</CustomText>
                        </View>
                        <IonIcon name="qr-code-outline" size={40} color="#00ffff" />
                    </View>
                    
                    <View style={styles.divider}>
                        <View style={styles.dotLeft} />
                        <View style={styles.line} />
                        <View style={styles.dotRight} />
                    </View>

                    <View style={styles.ticketBottom}>
                        <View>
                            <CustomText style={styles.label}>SECTION</CustomText>
                            <CustomText style={styles.value}>VIP-A</CustomText>
                        </View>
                        <View>
                            <CustomText style={styles.label}>SEAT</CustomText>
                            <CustomText style={styles.value}>12B</CustomText>
                        </View>
                        <View>
                            <CustomText style={styles.label}>PRICE</CustomText>
                            <CustomText style={styles.value}>$149.00</CustomText>
                        </View>
                    </View>
                </View>

                <View style={styles.emptyState}>
                    <IonIcon name="ticket-outline" size={80} color="rgba(255,255,255,0.1)" />
                    <CustomText style={styles.emptyText}>No other tickets found</CustomText>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 120,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        color: '#fff',
    },
    subtitle: {
        color: '#a884ff',
        fontSize: 14,
        marginTop: 5,
    },
    ticketCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    ticketTop: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventName: {
        color: '#fff',
    },
    eventDetails: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 4,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: -10,
    },
    dotLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0f051a',
        marginLeft: -10,
    },
    line: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 10,
    },
    dotRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0f051a',
        marginRight: -10,
    },
    ticketBottom: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#666',
        fontSize: 10,
        fontFamily: FONTS.Bold,
        marginBottom: 4,
    },
    value: {
        color: '#fff',
        fontSize: 14,
        fontFamily: FONTS.Bold,
    },
    emptyState: {
        marginTop: 50,
        alignItems: 'center',
        opacity: 0.5,
    },
    emptyText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
    },
});

export default Ticket;
