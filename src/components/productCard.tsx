import React from 'react';
import { Image, Text, View } from 'react-native';
import { Product } from '../../types';
import { truncate } from '../utils/trancate';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth / 2) - 16; // Adjust 16 based on your margin/padding

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <View style={{ width: itemWidth }}  className="flex-1 m-2  bg-white rounded-xl p-4 shadow-md">
            <Image
                source={{ uri: product.images[0] }}
                // source={require('../assets/sneaker1.webp')}
                className="w-full h-32 w-[130px] rounded-lg"
                resizeMode="cover"
            />

            <Text className="mt-3 text-base font-semibold text-primary-500">
                {truncate(product.product_name,10 ) }
            </Text>
            <Text className="text-sm text-secondary-500">
                Ksh {product.price}
            </Text>

            {/* <Text className="mt-1 text-xs text-gray-600">
                {product.shopName} • {product?.town}
            </Text>

            <Text className="text-[11px] text-gray-400">
                Lat: {product?.lat}, Lng: {product?.lng}
            </Text> */}
        </View>
    );
};

export default ProductCard;
