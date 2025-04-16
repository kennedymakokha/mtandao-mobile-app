import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-gray-800">🏠 Home Screen</Text>
            <Text className="text-base text-gray-600 mt-2">Welcome back!</Text>
        </View>
    );
};

export default HomeScreen;
