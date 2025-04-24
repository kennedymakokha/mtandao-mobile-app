import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


import { useSearch } from '../../context/searchContext';
import { clientStackParamList, Product } from '../../../types';
import ProductCard from '../../components/productCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useGetproductsQuery } from '../../services/productApi.slice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesAutocomplete from '../../components/PlacesAutocomplete';



const LandingPage = () => {
    const { query } = useSearch();
    type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const { data, isLoading, refetch, isSuccess } = useGetproductsQuery({})

    // const filtered = data === undefined ? [] : data.products.filter(p =>
    //     p?.product_name?.toLowerCase().includes(query.toLowerCase())
    // );

    const fetchCoordinatedFromPlaceId = async (placeId: string) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyBBYlYdpbci4zBhCSyLAJngOBLR3cRCGJA`);
            const data = await response.json();
            const location = data.result.geometry.location;
            console.log(location);
            // Do something with the location coordinates (latitude and longitude)
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };
    const screenHeight = Dimensions.get('window').height;
    return (
        <View style={{ minHeight: screenHeight }} className='px-2 pt-14 bg-primary-200'>

            {/* <PlacesAutocomplete
                apiKey='AIzaSyBBYlYdpbci4zBhCSyLAJngOBLR3cRCGJA'
                onPlaceSelected={(placeId, description) => {
                    fetchCoordinatedFromPlaceId(placeId); // same as before
                }}
            /> */}

            <FlatList
                data={data === undefined ? [] : data.products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Product_detail', { product: item })}>
                        <ProductCard product={item} />
                    </TouchableOpacity>
                )}
                numColumns={2}
                contentContainerStyle={{ padding: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
});

export default LandingPage;
