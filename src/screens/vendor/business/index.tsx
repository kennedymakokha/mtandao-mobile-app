import React, { useState } from 'react';
import { View, FlatList, Dimensions, Modal, Pressable } from 'react-native';
import { Business } from '../../../../types';
import RenderItem from './renderItem';
import { useDeletebusinessMutation, useGetbusinessesQuery } from '../../../services/businessApi.slice';
import { useModal } from '../../../context/modalContext';
import { Text } from 'react-native';
import CreateBusiness from './createBusinessModal.tsx';
import { FormLoader } from '../../../components/loader.tsx';




const cardSpacing = 16;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - cardSpacing * 3) / 2;

const Businesses: React.FC = ({ navigation }: any) => {

    const { data: businessesData, isLoading, refetch, isSuccess } = useGetbusinessesQuery({})
    const [deleteBusiness, { isLoading: deleteLoading, error, isSuccess: deletesuccess }] = useDeletebusinessMutation({})

    const { isModalVisible, showModal, toggleModal, hideModal } = useModal();
    const [data, setData] = useState({});

    const openModal = (data: Business) => {
        setData(data)
        showModal()
    }
    const handleDelete = async (id: string) => {
        await deleteBusiness(id).unwrap()
        await refetch()

    }

    const renderItem = ({ item }: { item: Business }) => (
        <RenderItem
            name={item.business_name}
            description={item.description || ''}
            // () => navigation.navigate('BusinessDetails', { id: item.id })
            navigate={() => navigation.navigate('BusinessDetails', { business: item })}
            town={item.town || ''}
            status={item.status}
            category={item.category}
            onEdit={() => openModal(item)}
            onDelete={() => handleDelete(item._id)}
        />
    );
    if (isLoading && !isSuccess) return (<FormLoader />)
    if (deleteLoading && !deletesuccess) return (<FormLoader />)
    return (
        <View className="flex-1 bg-primary-50 pt-16">
            <FlatList
                data={businessesData === undefined ? [] : businessesData.businessess}
                keyboardShouldPersistTaps="always"
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={{ paddingHorizontal: cardSpacing, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
            <CreateBusiness dataItem={data} refetch={refetch} showModal={showModal} hideModal={hideModal} isModalVisible={isModalVisible} navigation={navigation} />


        </View>
    );
};

export default Businesses;
