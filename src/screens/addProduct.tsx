import React, { useState } from 'react';
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
import Input from '../components/input';
import InputContainer from '../components/input';
import { Product } from '../../types';

const AddProductScreen = () => {

    const [image, setImage] = useState('');

    const [item, setItem] = useState({
        name: "",
        price: "",
        shopName: "",
        location: "",
        description: ""
    })
    const { name, price, shopName, location, description } = item

    const handlePriceChange = (value: string, name: string) => {
        setItem(prev => ({ ...prev, [name]: value }));
    };
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

                {/* <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
                    placeholder="Product Name"
                    value={name}
                    onChangeText={setName}
                /> */}
                <InputContainer value={name} onchange={(e: any) => handleChange("name", e)} placeholder="Product Name" />
                <InputContainer value={price} onchange={(e: any) => handleChange("price", e)} placeholder="Product price" />
                <InputContainer value={shopName} onchange={(e: any) => handleChange("shopName", e)} placeholder="Product Name" />

                <InputContainer value={location} onchange={(e: any) => handleChange("location", e)} placeholder="Product location" />
                <InputContainer value={description} onchange={(e: any) => handleChange("description", e)} multiline={true} placeholder="Product description" />


                <TextInput
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base h-28"
                    placeholder="Description"
                    multiline
                    textAlignVertical="top"
                    value={description}
                // onChangeText={setDescription}
                />

                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-green-600 rounded-xl py-4 mb-10"
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Submit Product
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddProductScreen;
