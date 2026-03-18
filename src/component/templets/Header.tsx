import { View, Text, StyleSheet, Platform, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import CustomText from '../../utils/ui/ui';
import { FONTS } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated';
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';

const Header: FC = () => {
  const insets = useSafeAreaInsets();
  const { scrollY } = useCollapsibleContext();
  const [location, setLocation] = useState<string>('Fetching location...');
  const [loading, setLoading] = useState(true);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      // Request Android permission
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'eventGo needs your location to show nearby events.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setLocation('Location unavailable');
          setLoading(false);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Free reverse geocoding via OpenStreetMap Nominatim — no API key needed
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              { headers: { 'Accept-Language': 'en', 'User-Agent': 'EventoGoApp/1.0' } },
            );
            const data = await res.json();
            const addr = data.address;
            // Build a concise human-readable label with higher precision
            const building = addr.building || addr.house_number || addr.amenity || '';
            const street = addr.road || addr.pedestrian || '';
            const area = addr.neighbourhood || addr.suburb || addr.village || '';

            let label = '';
            if (building && street) label = `${building}, ${street}`;
            else if (building) label = building;
            else if (street) label = street;
            else label = area || addr.town || addr.city || 'Current Location';

            const city = addr.city || addr.town || addr.suburb || '';
            setLocation(city && !label.includes(city) ? `${label}, ${city}` : label);
          } catch {
            setLocation(`${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E`);
          }
          setLoading(false);
        },
        (_err) => {
          setLocation('Location unavailable');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
      );
    } catch {
      setLocation('Location unavailable');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // Only fade out the location row — brand stays visible
  const locationAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 60], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 60], [0, -8], Extrapolation.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });
  return (
    <View style={[styles.subContainer, { paddingTop: Platform.OS === 'android' ? insets.top + 15 : 10 }]}>
      <View style={styles.leftSection}>
        <View style={styles.brandRow}>
          <TouchableOpacity style={styles.noticeBadge}>
            <CustomText
              fontSize={RFValue(9)}
              fontFamily={FONTS.Bold}
              style={styles.noticeText}>
              🌈 Rain
            </CustomText>
          </TouchableOpacity>
          <CustomText
            fontFamily={FONTS.Bold}
            variant="h3"
            style={styles.brandTitle}>
            eventGo
          </CustomText>
        </View>

        {/* Location row — tappable to refresh */}
        <Animated.View style={[styles.locationRow, locationAnimatedStyle]}>
          <TouchableOpacity
            style={styles.locationTouchable}
            activeOpacity={0.7}
            onPress={fetchLocation}>
            {loading ? (
              <ActivityIndicator size={12} color="#fff" style={{ marginRight: 4 }} />
            ) : (
              <CustomText
                fontFamily={FONTS.SemiBold}
                variant="h8"
                numberOfLines={1}
                style={styles.locationText}>
                {location}
              </CustomText>
            )}
            <Icon name="chevron-down" color="#fff" size={RFValue(18)} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View style={[styles.profileContainer, locationAnimatedStyle]}>
        <Icon name="account-circle" color="#fff" size={RFValue(38)} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: '#0672ff',
  },
  leftSection: {
    flex: 1, // Let this grow and push the profile to the right edge
    paddingRight: 15,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 12,
  },
  noticeBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noticeText: {
    color: '#0672ffff',
  },
  brandTitle: {
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#FFFFFF',
    opacity: 0.95, // Gives a slight contrast between title and subtitle
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
