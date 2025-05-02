import React from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = () => {
    return (
        <View className="flex-1 justify-center items-center bg-primary-800">
            <Image
                source={require('../assets/logo-1.png')} // replace with your logo
                className="w-24 h-24 mb-6"
                resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-gray-800">Mtandao</Text>
            <Text className=''> Best deals and services near you</Text>
        </View>
    );
};

export default SplashScreen;
