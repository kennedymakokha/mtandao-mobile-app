import React from 'react';
import { Image, Text, View } from 'react-native';
import { Product } from '../../types';


const ProductCard = ({ product }: { product: Product }) => {
    return (
        <View className="flex-1 m-2 bg-white rounded-xl p-4 shadow-md">
            <Image
                // source={{ uri: product.image }}
                source={require('../assets/sneaker1.webp')}
                className="w-full h-32 rounded-lg"
                resizeMode="cover"
            />

            <Text className="mt-3 text-base font-semibold text-primary-500">
                {product.name}
            </Text>
            <Text className="text-sm text-secondary-500">
                Ksh {product.price}
            </Text>

            <Text className="mt-1 text-xs text-gray-600">
                {product.shopName} • {product?.town}
            </Text>

            <Text className="text-[11px] text-gray-400">
                Lat: {product?.lat}, Lng: {product?.lng}
            </Text>
        </View>
    );
};

export default ProductCard;
