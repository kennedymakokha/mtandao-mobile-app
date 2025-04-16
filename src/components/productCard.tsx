import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Product, RootStackParamList } from '../../types';


type ProductCardProps = {
    product: Product;
    // onPress: (id: string) => void;
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            activeOpacity={1}
            className="bg-white rounded-2xl shadow-md p-4 m-2 w-full"
            onPress={() => navigation.navigate('Product_detail', {
                product: product
            })}
        >
            <Image

                source={require('../assets/sneaker1.webp')}
                className="w-full h-40 rounded-xl mb-3"
                resizeMode="cover"
            />
            <View className='flex flex-row items-center justify-between'>
                <View className="flex w-1/2">
                    <Text className="text-lg font-semibold text-gray-900">
                        {product.name}
                    </Text>
                    <Text className="text-base text-green-600 mt-1 mb-2">
                        ${product.price.toFixed(2)}
                    </Text>
                </View>
                <View className="flex w-1/2">
                    <View className="flex-row mb-2 items-center space-x-2 gap-x-2 ">
                        <Icon name="store" className='pr-1' size={16} color="#6b7280" />
                        <Text className="text-sm text-gray-600">{product.shopName}</Text>
                    </View>

                    <View className="flex-row items-center  gap-x-2 space-x-2">
                        <Icon name="map-pin" className='pr-4' size={16} color="#6b7280" />
                        <Text className="text-sm text-gray-500">{product.location}</Text>
                    </View>
                </View>
            </View>



        </TouchableOpacity>
    );
};

export default ProductCard;
