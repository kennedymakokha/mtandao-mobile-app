import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, PermissionsAndroid, Platform, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Product } from '../../../types';
import polyline from '@mapbox/polyline';
import { useUser } from '../../context/UserContext';
// const ProductDetail = ({ product }: { product: Product }) => {
const ProductDetail: React.FC = ({ route, navigation }: any) => {
    const { product } = route.params;
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const { user } = useUser()
    const [routeCoords, setRouteCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);
    const flatListRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { width } = Dimensions.get('window');

    const locationOptions = Platform.select({
        android: {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000,
            showLocationDialog: true,
        },
        ios: {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000,
        }
    });

    useEffect(() => {
        const requestLocation = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Location permission denied');
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                position => {
                    console.log('Position:', position);
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                error => {
                    console.warn('Error getting location:', error.message);
                },
                locationOptions as any // Cast to bypass strict TS typing
            );
        };

        requestLocation();
    }, []);
    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            position => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.warn('Watch error:', error.message);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
            }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const fetchRoute = async () => {
            if (!userLocation) return;

            const origin = `${userLocation.latitude},${userLocation.longitude}`;
            const destination = `${product.lat},${product.lng}`;
            const apiKey = 'AIzaSyBBYlYdpbci4zBhCSyLAJngOBLR3cRCGJA'; // Use env-safe storage or config file

            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&mode=driving`;

            try {
                const response = await fetch(url);
                const json = await response.json();

                if (json.routes.length) {
                    const points = polyline.decode(json.routes[0].overview_polyline.points);
                    const coords = points.map(([lat, lng]) => ({ latitude: lat, longitude: lng }));
                    setRouteCoords(coords);
                } else {
                    console.warn('No routes found');
                }
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        if (userLocation) {
            fetchRoute();
        }
    }, [userLocation]);

    return (
        <View className="flex-1 bg-white px-4 pt-14">
            <Image
                // source={{ uri: product.image }}
                source={require('../assets/sneaker1.webp')}
                className="w-full h-48 rounded-xl" resizeMode="cover" />
            {/* <View className="relative">
                <FlatList
                    ref={flatListRef}
                    data={['https://via.placeholder.com/150']}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={event => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setActiveIndex(index);
                    }}
                    renderItem={({ item }) => (
                        
                        <Image source={{ uri: item }} style={{ width, height: 250 }}  resizeMode="cover" />
                    )}
                />
            
                <View className="absolute top-2 right-4 bg-black bg-opacity-60 px-3 py-1 rounded-full">
                    <Text className="text-white text-sm font-medium">
                        {activeIndex + 1} / {product.images.length}
                    </Text>
                </View>
            </View> */}

            <Text className="mt-4 text-xl font-bold text-primary-800">{product.name}</Text>
            <Text className="text-lg text-secondary-600">Ksh {product.price}</Text>
            <Text className="text-sm text-gray-500 mt-1">
                Sold by {product.shopName} • {product.town}
            </Text>

            <Text className="mt-4 mb-2 text-base font-semibold text-gray-700">Location</Text>
            {userLocation ? (
                <MapView
                    style={{ width: '100%', height: 250, borderRadius: 12 }}
                    initialRegion={{
                        latitude: product.lat,
                        longitude: product.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: product.lat, longitude: product.lng }}
                        title={product.shopName}
                        description={product.town}
                    />
                    <Marker
                        coordinate={userLocation}
                        pinColor="blue"
                        title={`${user?.name}`}
                    />
                    <Polyline
                        coordinates={routeCoords}
                        strokeColor="#1E90FF"
                        strokeWidth={4}
                    />

                </MapView>

            ) : (
                <View className="absolute inset-0 bottom-0  justify-end  items-center z-50"
                          >
                           <View className="relative bottom-0  opacity-50 bg-black  h-1/3 w-full  z-60" ></View>
                           <View className="relative bottom-48 items-center flex    z-100" >
                               <Image
                                   source={require('../assets/logo-1.png')}
                                   className="w-20 animate-spin h-20 rounded-full mb-2"
                               />
                               <Text className='text-white text-center text-lg text-lg'>Loading map...</Text>
                           </View>
               
                          
                       </View>
            )}

        </View>
    );
};

export default ProductDetail;
