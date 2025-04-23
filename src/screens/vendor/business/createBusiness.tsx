import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5'
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
import InputContainer from '../../../components/input';
import { Business, Product } from '../../../../types';
import Button from '../../../components/button';
import SelectInput from '../../../components/selectInput';


const CreateBusiness: React.FC = ({ route, navigation }: any) => {

    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const [item, setItem] = useState({
        name: "",
        desc: "",
        town: "",
        category: "",
        lat: "",
        lng: "",

    })
    const {
        name,
        desc,
        town,
        category,
        lat,
        lng, } = item

    const handleChange = (key: keyof Business, value: string) => {
        // setMsg({ msg: "", state: "" });

        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = () => {
        console.log(item)
        // if (!name || !price || !image || !shopName || !location || !description) {
        //     Alert.alert('Missing Fields', 'Please fill in all fields');
        //     return;
        // }



        console.log('Submitted Product:', item);
        Alert.alert('Success', 'Product added!');
    };
    useEffect(() => {
        if (useCurrentLocation && route.params === undefined) {
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
    useEffect(() => {
        if (route.params !== undefined) {
            const { item } = route.params
            setItem({
                name: item.name,
                desc: item.desc,
                town: item.town,
                category: item.category,
                lat: item.lat,
                lng: item.lng,


            })
        }
    }, [])

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white pt-[100px]"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView className="px-4 ">
                <InputContainer value={name} onchange={(e: any) => handleChange("name", e)} placeholder="Product Name" />
                <SelectInput
                    label="Select Category"
                    value={category}
                    onChange={(e: any) => handleChange("category", e)}
                    options={[
                        { label: 'Cosmetics', value: 'Cosmetics' },
                        { label: 'Agriculture', value: 'Agriculture' },
                        { label: 'Stationaries', value: 'Stationaries' },
                    ]}
                />
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

                <SelectInput
                    label="Select Town"
                    value={town}
                    onChange={(e: any) => handleChange("town", e)}
                    options={[
                        { label: 'Kitale', value: 'Kitale' },
                        { label: 'Mombasa', value: 'Mombasa' },
                        { label: 'Nairobi', value: 'Nairobi' },
                    ]}
                />
                <TextInput
                    className="border border-primary rounded-xl px-4 py-3 mb-6 text-base h-28"
                    placeholder="Description"
                    multiline
                    textAlignVertical="top"
                    value={desc}
                    onChangeText={(e: any) => handleChange("desc", e)}
                />


                <Button title={route.params !== undefined ? "update" : "Submit"} submit={handleSubmit} />

            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export default CreateBusiness;
