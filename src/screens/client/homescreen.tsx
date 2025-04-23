import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';


import { useSearch } from '../../context/searchContext';
import { clientStackParamList, Product } from '../../../types';
import ProductCard from '../../components/productCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const products: Product[] = [
    {
        id: '1',
        name: 'iPhone 15',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 999,
        shopName: 'Gadget World',
        town: 'Nairobi',
        lat: -1.286389,
        lng: 36.817223,
    },
    {
        id: '2',
        name: 'Galaxy S23',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 899,
        shopName: 'Smart Tech',
        town: 'Kitale',
        lat: 1.01572000,
        lng: 35.00622000,
    },
    {
        id: '3',
        name: 'iPhone 15',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 999,
        shopName: 'Gadget World',
        town: 'Nairobi',
        lat: -1.286389,
        lng: 36.817223,
    },
    {
        id: '4',
        name: 'Galaxy S23',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 899,
        shopName: 'Smart Tech',
        town: 'Kitale',
        lat: 1.01572000,
        lng: 35.00622000,
    },
    {
        id: '5',
        name: 'iPhone 15',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 999,
        shopName: 'Gadget World',
        town: 'Nairobi',
        lat: -1.286389,
        lng: 36.817223,
    },
    {
        id: '6',
        name: 'Galaxy S23',
        images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
        price: 899,
        shopName: 'Smart Tech',
        town: 'Kitale',
        lat: 1.01572000,
        lng: 35.00622000,
    },
    // more...
];

const LandingPage = () => {
    const { query } = useSearch();
    type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View className='px-2 pt-14 bg-primary-50'>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
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
