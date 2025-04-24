import React from 'react';
import { View, ActivityIndicator, Dimensions, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <View
            style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
            className="flex-1 items-center justify-center bg-primary-100">
            <View className="flex items-center  jstify-center">
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
export const NoData = ({ title }: any) => {
    return (
        <View className="flex-1 items-center h-screen justify-center bg-primary-100">
            <View className="flex items-center  jstify-center">
                <Icon name="database-plus-outline" size={200} color="#d4af37" className="animate-bounce" />
                <Text className="text-black uppercase text-center font-semibold">{`${title ? title : "No data"}...`}</Text>
            </View>
        </View>

    );
};



export default OverlayLoader;
