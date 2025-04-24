import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


import { useSearch } from '../../context/searchContext';
import { clientStackParamList, Product } from '../../../types';
import ProductCard from '../../components/productCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useGetproductsQuery } from '../../services/productApi.slice';



const LandingPage = () => {
    const { query } = useSearch();
    type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const { data, isLoading, refetch, isSuccess } = useGetproductsQuery({})

    // const filtered = data === undefined ? [] : data.products.filter(p =>
    //     p?.product_name?.toLowerCase().includes(query.toLowerCase())
    // );


    const screenHeight = Dimensions.get('window').height;
    return (
        <View style={{ minHeight: screenHeight }} className='px-2 pt-14 bg-secondary-200'>
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
