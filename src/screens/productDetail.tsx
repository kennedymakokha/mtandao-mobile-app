import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Product, RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';






const ProductDetailScreen: React.FC = ({ route, navigation }: any) => {
    const { product } = route.params;
   

    // useEffect(() => {
    //     // Set the product name as the screen title
    //     navigation.setOptions({ title: product.name });
    // }, [navigation, product.name]);

    return (
        <ScrollView className="flex-1 bg-white px-4 pt-4">
            <Image
                // source={{ uri: product.image }}
                source={require('../assets/sneaker1.webp')}
                className="w-full h-80 rounded-2xl mb-4"
                resizeMode="contain"
            />

            <Text className="text-2xl font-bold text-gray-900 mb-1">
                {product.name}
            </Text>

            <Text className="text-xl text-green-600 font-semibold mb-3">
                ${product.price.toFixed(2)}
            </Text>

            <View className="flex-row items-center space-x-2 mb-2">
                {/* <Store size={18} color="#6b7280" /> */}
                <Text className="text-gray-600 text-sm">{product.shopName}</Text>
            </View>

            <View className="flex-row items-center space-x-2 mb-4">
                {/* <MapPin size={18} color="#6b7280" /> */}
                <Text className="text-gray-500 text-sm">{product.location}</Text>
            </View>

            <Text className="text-base text-gray-700 leading-relaxed mb-6">
                {product.description}
            </Text>

            <TouchableOpacity
                className="bg-green-600 rounded-xl py-4 mb-10"
            // onPress={() => onAddToCart(product.id)}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Add to Cart
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProductDetailScreen;
