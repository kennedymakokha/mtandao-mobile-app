import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import InputContainer from '../components/input';
import { Product } from '../../types';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import CameraModal from '../components/cameraModal';
const AddProductScreen = () => {
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const [item, setItem] = useState({
        name: "",
        price: "",
        shopName: "",
        location: "",
        description: "",
        lat: "",
        lng: "",

    })
    const { name, price, lat, lng, shopName, location, description } = item

    const handleChange = (key: keyof Product, value: string) => {
        // setMsg({ msg: "", state: "" });

        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = () => {
        console.log(item)
        if (!name || !price || !image || !shopName || !location || !description) {
            Alert.alert('Missing Fields', 'Please fill in all fields');
            return;
        }

        const product = {
            id: Date.now().toString(),
            name,
            price: parseFloat(price),
            image,
            shopName,
            location,
            description,
        };

        console.log('Submitted Product:', product);
        Alert.alert('Success', 'Product added!');
    };
    useEffect(() => {
        if (useCurrentLocation) {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setItem(prev => ({
                        ...prev,
                        lat: latitude.toString(),
                        lng: longitude.toString()

                    }));

                },
                error => {
                    console.warn(error.message);
                    // Alert.alert('Location Error', error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }, [useCurrentLocation]);
    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView className="px-4 pt-6">
                <Text className="text-2xl font-bold text-gray-900 mb-6">
                    Add New Product
                </Text>


                <InputContainer value={name} onchange={(e: any) => handleChange("name", e)} placeholder="Product Name" />
                <InputContainer value={price} onchange={(e: any) => handleChange("price", e)} placeholder="Product price" />
                <InputContainer value={shopName} onchange={(e: any) => handleChange("shopName", e)} placeholder="Product Name" />
                <InputContainer value={location} onchange={(e: any) => handleChange("location", e)} placeholder="Product location" />
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                    className="mb-4 border border-green-600 rounded-xl py-3"
                >
                    <Text className="text-center text-green-600 font-medium">
                        {useCurrentLocation ? 'Switch to Manual Location' : 'Use My Current Location'}
                    </Text>
                </TouchableOpacity>
                <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lat} latlng="yes" onchange={(e: any) => handleChange("lat", e)} multiline={true} placeholder="latitude" />
                <InputContainer editable={!useCurrentLocation} keyboardType="decimal-pad" value={lng} latlng="yes" onchange={(e: any) => handleChange("lng", e)} multiline={true} placeholder="longitude" />


                <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base h-28"
                    placeholder="Description"
                    multiline
                    textAlignVertical="top"
                    value={description}
                    onChangeText={(e: any) => handleChange("description", e)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)} className={`border border-gray-300 flex items-center justify-center rounded-xl px-4 py-3 mb-4 text-base `}>
                    <Icon name="camera" className='pr-1 text-green-600' size={26} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit}
                    activeOpacity={1}
                    className="bg-green-600 rounded-xl py-4 mb-10"
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Submit Product
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <CameraModal visible={visible} setVisible={() => setVisible(!visible)} />
        </KeyboardAvoidingView>
    );
};

export default AddProductScreen;
