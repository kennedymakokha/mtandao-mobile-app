import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { clientStackParamList } from '../../../../types';
import { useNavigation } from '@react-navigation/native';

type Props = {
    item: any
    onPress?: () => void;
};
const { width, height } = Dimensions.get('window')
type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
const navigation = useNavigation<NavigationProp>();


export function ProductCardLoader() {
    return (
        
            <View className="bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-4" style={{ width: 0.5 * width }}>
                {/* Image Placeholder */}
                <View className="w-full h-40 rounded-xl mb-3" />

                {/* Product Name */}
                <View className="w-3/4 h-5 rounded mb-2" />

                {/* Town */}
                <View className="w-1/2 h-4 rounded mb-3" />

                {/* Price */}
                <View className="w-1/3 h-6 rounded" />
            </View>
        
    );
}


