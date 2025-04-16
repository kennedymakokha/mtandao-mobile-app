import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '../components/productCard';
import { useNavigation } from '@react-navigation/native';




const renderItem = ({ item }: { item: any }) => (

    <ProductCard
        product={{
            id: item.id,
            name: item.title,
            price: 89.99,
            image: '../assets/sneaker1.webp',
            shopName: "Naiboy",
            location: "Kisii"
        }}
        
    />

);
const slides: any = [
    { id: '1', title: 'Cool Sneakers', description: 'This is an awesome app.' },
    { id: '2', title: 'Scan QR', description: 'Easily scan QR codes.' },
    { id: '3', title: 'Chat', description: 'Chat in real time with friends.' },
];
const HomeScreen = () => {
    
    return (
        <View className="flex-1 bg-slate-100 p-2">

            <FlatList

                data={slides}

                pagingEnabled
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, i) => item.id}

                scrollEventThrottle={16}

            />


        </View>
    );
};

export default HomeScreen;
