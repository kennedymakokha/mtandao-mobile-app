import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, PermissionsAndroid, FlatList, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useGetbusinessproductsQuery } from '../../services/productApi.slice';
import { TouchableOpacity } from 'react-native';
import { ProductCardLoader } from './components/productCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { clientStackParamList } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { getDurationFromNow } from '../../components/formatDate';
import Header from './components/header';
import { SafeAreaView } from 'react-native';


// Replace with an actual API key for testing
const GOOGLE_MAPS_API_KEY = 'AIzaSyBBYlYdpbci4zBhCSyLAJngOBLR3cRCGJA';

export default function BusinessDetails({ route }: any) {
    const { business } = route.params;
    const { width, height } = Dimensions.get('window')
    const { data, isLoading, isSuccess } = useGetbusinessproductsQuery(business._id)
    type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [routeCoords, setRouteCoords] = useState([]);
    const [userLocation, setUserLocation] = useState<any>(null);
    console.log(business)
    const businessLocation =
        business?.location?.lat && business?.location?.lng
            ? {
                latitude: parseFloat(business.location.lat),
                longitude: parseFloat(business.location.lng),
            }
            : userLocation;

    useEffect(() => {
        const requestPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('Location permission denied');
                    return;
                }
            }

            // Geolocation.getCurrentPosition(
            //     (pos) => {
            //         setUserLocation(pos.coords);
            //     },
            //     (error) => console.error(error.message),
            //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            // );


            Geolocation.getCurrentPosition(
                (pos) => setUserLocation(pos.coords),
                (err) => {
                    if (err.code === 3) {
                        // Timeout — retry with low accuracy
                        Geolocation.getCurrentPosition(
                            (pos) => setUserLocation(pos.coords),
                            (e) => console.warn('Retry failed', e),
                            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                        );
                    } else {
                        console.warn('Location error:', err.message);
                    }
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
            );
        };

        requestPermission();
    }, []);

    useEffect(() => {
        const getDirections = async () => {
            if (!userLocation) return;

            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLocation.latitude},${userLocation.longitude}&destination=${businessLocation.latitude},${businessLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                if (json.routes.length) {
                    const points = polyline.decode(json.routes[0].overview_polyline.points);
                    const coords: any = points.map(([latitude, longitude]) => ({ latitude, longitude }));
                    setRouteCoords(coords);
                }
            } catch (error) {
                console.error('Failed to get directions:', error);
            }
        };

        getDirections();
    }, [userLocation]); // Wait for userLocation
    const ProductCardrenderItem = useCallback(({ item }: any) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Product_detail', { product: item })}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md"
            style={{
                width: 0.44 * width,
                margin: 4,
                height: 200, // fixed height for consistent image ratio
            }}
        >
            <View style={{ flex: 1 }}>
                {/* Image takes 30% of height */}
                <View style={{ flex: 0.7 }} className="w-full rounded-t-2xl overflow-hidden bg-primary-100 dark:bg-zinc-800">
                    {item.images[0] ? (
                        <Image
                            source={{ uri: item.images[0] }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-gray-400">No Image</Text>
                        </View>
                    )}
                </View>

                {/* Text content takes 70% */}
                <View style={{ flex: 0.3 }} className="p-3">
                    <Text className="text-lg font-semibold text-zinc-900 dark:text-white">{item.product_name}</Text>
                    <Text className="text-xl font-bold text-orange-500 mt-2">
                        Ksh {parseFloat(item.price).toFixed(2)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    ), []);
    const LoaderCard = () => (
        <View className="bg-primary-50 animate-pulse dark:bg-zinc-900 rounded-2xl p-4 shadow-md" style={{ width: 0.44 * width, margin: 2 }}>
            <View className="w-full animate-pulse h-4 rounded-xl m-3" ></View>
            <View className="w-3/4 animate-pulse h-5 rounded mb-2" />
            <View className="w-1/2  animate-pulse h-4 rounded mb-3" />
            <View className="w-1/3 animate-pulse  h-6 rounded" />
            {/* <View className="h-3 w-24 rounded animate-pulse bg-gray-700" ></View> */}
        </View>
    );


    const businessDetails = [
        {
            title: business.town,
            icon: "location-city",

        },
        {
            title: business.description,
            icon: "details",

        },
        {
            title: getDurationFromNow(business.createdAt),
            icon: "date-range",
        }
    ]
    return (
        <View className="flex-1 bg-primary-800 pt-14" style={{ width: width }}>
            <SafeAreaView className="flex-1 " style={{ minHeight: 0.35 * height }} >
                <ScrollView>
                    <View className="my-4 mx-4 border rounded-md border-primary-600 p-2 gap-2">
                        <Header text="Business Details" />
                        {businessDetails.map((buz, i) => (
                            <View key={buz.title} className={`flex ${i == businessDetails.length - 1 && "self-end"} flex-row gap-x-2 py-2 `}>
                                <Icon className='text-primary-300' size={20} name={buz.icon} color="#ffae2e" />
                                <Text className="text-white">{buz.title}</Text>
                            </View>
                        ))}
                    </View>
                    <Header text="Business Location" secondary />
                    <View className="h-64 mb-4 mx-4 overflow-hidden relative rounded-2xl shadow">
                        {businessLocation ? (
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: businessLocation.latitude,
                                    longitude: businessLocation.longitude,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                            >
                                {userLocation && <Marker coordinate={userLocation} title="You" />}
                                <Marker coordinate={businessLocation} title="Business" />
                                {routeCoords.length > 0 && (
                                    <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#3b82f6" />
                                )}
                            </MapView>
                        ) : (
                            <View className="items-center justify-center h-full">
                                {/* {!userLocation && <View className="animate-ping">
                            <Icon className='text-primary-300 animate-ping ' size={40} name="location-off" color="red" />
                        </View>} */}
                                <Text className='text-center font-bold text-white text-xl'> No Details for Business Location</Text>
                            </View>
                        )}
                        {business?.location?.lat === undefined && business?.location?.lng === undefined && (
                            <View className="absolute inset-0 bg-black/40 items-center justify-center">
                                <Text className="text-white text-lg font-semibold">Business location not provided</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View className="flex w-full h-full  px-5">
                <Header text="products" />

                <FlatList
                    data={data === undefined && !isSuccess && isLoading ? [...Array(10)] : data?.products}
                    keyExtractor={(item, index) => data !== undefined ? item._id : index}
                    renderItem={isLoading ? LoaderCard : ProductCardrenderItem}
                    ListFooterComponent={<View style={{ height: 200 }} />}
                    keyboardShouldPersistTaps="handled"
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: 1,
                        paddingTop: 8,
                        paddingBottom: 100,
                    }}
                />

            </View>
        </View>
    );
}




