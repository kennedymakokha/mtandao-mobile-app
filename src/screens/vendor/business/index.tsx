import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Business } from '../../../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateEditModal from './createBusiness';



const businessesData: Business[] = [
    { id: '1', name: 'Green Leaf Café', category: 'Restaurant', status: 'Active' },
    { id: '2', name: 'Urban Styles', category: 'Fashion Store', status: 'Inactive' },
    { id: '3', name: 'TechHaven Solutions', category: 'IT Services', status: 'Active' },
    { id: '4', name: 'Glow Spa & Wellness', category: 'Beauty' },
];

const cardSpacing = 16;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - cardSpacing * 3) / 2;
const Button = ({ icon, action, bg, title }: any) => {


    return (
        <TouchableOpacity
            className={`${bg ? bg : "border border-primary="} mx-1 px-3 py-1.5 rounded-md flex-1 items-center justify-center`}
            onPress={action}
        >
            {title ? <Text className="text-secondary text-center text-xs">{title}</Text> : <Icon name={icon} size={20} color="#fff" />}
        </TouchableOpacity>
    )
}
const Businesses: React.FC = ({ navigation }: any) => {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [businesses, setBusinesses] = useState(businessesData);

    const openEditModal = (business: Business) => {
        setSelectedBusiness(business);
        setEditModalVisible(true);
    };

    const handleEditSave = () => {
        if (selectedBusiness) {
            const updated = businesses.map((b) =>
                b.id === selectedBusiness.id ? selectedBusiness : b
            );
            setBusinesses(updated);
        }
        setEditModalVisible(false);
    };
    const renderItem = ({ item }: { item: Business }) => (
        <View
            className="bg-white p-4 rounded-xl shadow-sm mb-4"
            style={{ width: cardWidth, marginHorizontal: cardSpacing / 2 }}
        >
            <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
            <View className="flex flex-row justify-between">
                <Text className="text-gray-500 text-sm">{item.category}</Text>
                {item.status && (
                    <Text
                        className={`mt-1 text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-red-500'
                            }`}
                    >
                        {item.status}
                    </Text>
                )}
            </View>

            <View className="flex-row my-3 space-x-2">
                <Button icon="edit"
                    action={openEditModal}
                    bg="bg-primary-500"
                />
                <Button icon="eye"
                    action={() => navigation.navigate('BusinessDetails', { id: item.id })}
                    bg="bg-secondary-500"
                />
            </View>
            <Button icon="eye"
                title="Products"
                action={() => navigation.navigate('ProductsList', { item: item })}
            />
        </View>
    );

    return (
        <View className="flex-1 bg-gray-100 pt-[100px]">
            <FlatList
                data={businessesData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: cardSpacing, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
          
        </View>
    );
};

export default Businesses;
