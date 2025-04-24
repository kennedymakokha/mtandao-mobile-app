import React from 'react';
import { View, ActivityIndicator, Dimensions, Image, Text } from 'react-native';
const OverlayLoader = () => {
    return (
        <View
            className="absolute inset-0  size-32 bg-secondary justify-center items-center z-50"
            style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
            }}
        >
            <Image
                source={require('../assets/logo-1.png')}
                className="w-20 animate-spin h-20 rounded-full mb-2"
            />
            {/* <ActivityIndicator size="large" color="#d4af37" /> */}
        </View>
    );
};

export const FormLoader = () => {
    return (
        <View className="absolute z-0 inset-0 h-screen  bg-primary-600  justify-end  items-center z-50" >
            <View className="bg-black absolute z-10 opacity-40 w-full h-full justify-center items-center rounded-t-3xl"></View>
            <View className=" z-20 absolute w-full h-full justify-center items-center rounded-t-3xl">
                <Image
                    source={require('../assets/logo-1.png')}
                    className="w-20 animate-spin h-20 rounded-full mb-2"
                />
                <Text className="text-secondary font-semibold">Loading...</Text>
                {/* <ActivityIndicator size="large" color="#d4af37" /> */}
            </View>
        </View>
    );
};


export default OverlayLoader;
