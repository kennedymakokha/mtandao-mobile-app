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
import { useGetcategoriesQuery } from '../../../services/categoryApi.slice';
import { toDropdownOptions } from '../../../utils/useDropDown';
import { useRegisterbusinessMutation, useUpdatebusinessMutation } from '../../../services/businessApi.slice';
import Toast from '../../../components/Toastcontainer';
import { Modal } from 'react-native';
import { FormLoader } from '../../../components/loader';

interface CreateBusinessProps {
    showModal: () => void;
    hideModal: () => void;
    isModalVisible: boolean;
    navigation: any;
    route?: any;
    refetch?: () => void;
    dataItem: any
}
const CreateBusiness = ({ route, dataItem, refetch, isModalVisible, hideModal, showModal }: CreateBusinessProps) => {
    console.log(dataItem)
    const [useCurrentLocation, setUseCurrentLocation] = useState(true);
    const { data } = useGetcategoriesQuery({})
    const [updateBusines, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, error: updateErr }] = useUpdatebusinessMutation({})
    const [registerBusiness, { isLoading, error, isSuccess }] = useRegisterbusinessMutation({})
    const [msg, setMsg] = useState({ msg: "", state: "" });
    const [item, setItem] = useState<{
        _id?: string;
        business_name: string;
        description: string;
        town: string;
        category: string;
        lat: string;
        lng: string;
    }>({
        business_name: "",
        description: "",
        town: "",
        category: "",
        lat: "",
        lng: "",
    })
    const {
        business_name,
        description,
        town,
        category,
        lat,
        lng, } = item

    const handleChange = (key: keyof Business, value: string) => {
        setMsg({ msg: "", state: "" });
        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            await registerBusiness(item).unwrap()
            setMsg({ msg: "Vendor added Successfully", state: "success" });
            refetch && refetch()
            hideModal()
        } catch (err) {
            if (error && 'data' in error) {
                setMsg({ msg: `${error.data}`, state: "error" });
            } else {
                setMsg({ msg: "An unknown error occurred", state: "error" });
            }
        }
    };
    const handleUpdate = async () => {
        try {
            await updateBusines(item).unwrap()
            setMsg({ msg: "Vendor added Successfully", state: "success" });
            refetch && refetch()
            hideModal()
        } catch (err) {
            if (error && 'data' in error) {
                setMsg({ msg: `${error.data}`, state: "error" });
            } else {
                setMsg({ msg: "An unknown error occurred", state: "error" });
            }

        }

    };
    useEffect(() => {
        if (useCurrentLocation && dataItem === undefined) {
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
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }, [useCurrentLocation]);
    useEffect(() => {
        if (dataItem !== undefined) {
            setItem({
                _id: dataItem._id,
                business_name: dataItem.business_name,
                description: dataItem.description,
                town: dataItem.town,
                category: dataItem.category,
                lat: dataItem.lat,
                lng: dataItem.lng,
            })
        }
    }, [dataItem])
    if (isLoading && !isSuccess) return (<FormLoader />)
    if (isLoadingUpdate && !isSuccessUpdate) return (<FormLoader />)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={hideModal}
        >
            <KeyboardAvoidingView
                className="flex-1 bg-white pt-14"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {msg.msg && <Toast msg={msg.msg} state={msg.state} />}
                <ScrollView className="px-4 ">
                    <InputContainer value={business_name} onchange={(e: any) => handleChange("business_name", e)} placeholder="Business Name" />
                    <SelectInput
                        label="Select Category"
                        value={category}
                        onChange={(e: any) => handleChange("category", e)}
                        options={toDropdownOptions(data !== undefined ? data?.categories : [], "category_name", "_id")}
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
                            { label: 'Cosmetics', value: 'Cosmetics' },
                            { label: 'Agriculture', value: 'Agriculture' },
                            { label: 'Stationaries', value: 'Stationaries' },
                        ]}

                    />
                    <TextInput
                        className="border border-primary rounded-xl px-4 py-3 mb-6 text-base h-28"
                        placeholder="Description"
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={(e: any) => handleChange("description", e)}
                    />


                    <Button title={route?.params !== undefined ? "update" : "Submit"} submit={item._id ? handleUpdate : handleSubmit} />
                    <Button title="cancel" submit={hideModal} />

                </ScrollView>

            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreateBusiness;


