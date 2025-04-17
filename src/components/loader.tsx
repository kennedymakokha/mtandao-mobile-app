import React from 'react';
import { View, ActivityIndicator, Dimensions, Image } from 'react-native';
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

export default OverlayLoader;
