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

// import InputContainer from '../components/input';
// import { Product } from '../../../../types';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Product } from '../../../../../types';
import InputContainer from '../../../../components/input';
import Button from '../../../../components/button';
import CameraModal from '../../../../components/cameraModal';
import { Modal } from 'react-native';
import SelectInput from '../../../../components/selectInput';
import { toDropdownOptions } from '../../../../utils/useDropDown';
import { useRegisterproductMutation } from '../../../../services/productApi.slice';
import Toast from '../../../../components/Toastcontainer';
import { FormLoader } from '../../../../components/loader';
// import CameraModal from '../components/cameraModal';
// import Button from '../components/button';

interface CreateBusinessProps {

    hideModal: () => void;
    isModalVisible: boolean;
    navigation?: any;
    business_id: string
    route?: any;
    refetch?: () => void;
    dataItem: any
}
const CreateProductModal = ({ route, business_id, dataItem, refetch, isModalVisible, hideModal }: CreateBusinessProps) => {

    const [visible, setVisible] = useState(false);
    const [images, setImages] = useState<any>([])
    const [item, setItem] = useState({
        product_name: "",
        price: "",
        business: business_id,
        description: "",
    })
    const [registerProduct, { isLoading, error, isSuccess }] = useRegisterproductMutation({})
    const [msg, setMsg] = useState({ msg: "", state: "" });
    const { product_name, price, business, description } = item

    const handleChange = (key: keyof Product, value: string) => {
        // setMsg({ msg: "", state: "" });

        setItem(prev => ({
            ...prev,
            [key]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            // const product = {
            //     id: Date.now().toString(),
            //     product_name,
            //     price: parseFloat(price),
            //     images,
            //     description,
            // };
            const formData = new FormData();

            formData.append("product_name", product_name);
            formData.append("price", parseFloat(price));
            formData.append("description", description);



            images.forEach((path: any, index: any) => {
                formData.append("images", {
                    uri: `file://${path}`, // make sure it has the `file://` prefix
                    name: `image${index + 1}.jpg`,
                    type: "image/jpeg"
                });
            });
            formData.append("business", business);
            await registerProduct(formData).unwrap()
            setMsg({ msg: "Vendor added Successfully", state: "success" });
            refetch && refetch()
            setVisible(false)
        } catch (err) {
            console.log(error)
            if (error && 'data' in error) {
                setMsg({ msg: `${error.data}`, state: "error" });
            } else {
                setMsg({ msg: "An unknown error occurred", state: "error" });
            }
        }
    };
    //  if ()
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
            onRequestClose={hideModal}
        >

            <KeyboardAvoidingView
                className="flex-1 bg-primary-100 pt-14 "
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {isLoading && !isSuccess && <FormLoader />}
                <Text className="text-2xl text-center font-bold mb-4">Admin Dashboard</Text>
                {msg.msg && <Toast msg={msg.msg} state={msg.state} />}
                <ScrollView className="px-4 pt-6">
                    <InputContainer value={product_name} onchange={(e: any) => handleChange("product_name", e)} placeholder="Product Name" />
                    <InputContainer keyboardType="numeric" value={price} onchange={(e: any) => handleChange("price", e)} placeholder="Product price" />
                    <TextInput
                        className="border border-primary rounded-xl px-4 py-3 mb-6 text-base h-28"
                        placeholder="Description"
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={(e: any) => handleChange("description", e)}
                    />
                    <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)} className={`border border-gray-300 flex items-center justify-center rounded-xl px-4 py-3 mb-4 text-base `}>
                        <Icon name="camera" className='pr-1 text-scondary' size={26} color="#3fa41a" />
                    </TouchableOpacity>

                    <Button title="Submit Product" submit={handleSubmit} />

                </ScrollView>
                <CameraModal
                    images={images}
                    setImages={setImages}
                    visible={visible} setVisible={() => setVisible(!visible)} />
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreateProductModal;
