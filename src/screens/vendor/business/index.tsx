import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { Business } from '../../../../types';
import RenderItem from './renderItem';



const businessesData: Business[] = [
    { id: '1', name: 'Green Leaf Café', category: 'Restaurant', status: true },
    { id: '2', name: 'Urban Styles', category: 'Fashion Store', status: false },
    { id: '3', name: 'TechHaven Solutions', category: 'IT Services', status: true },
    { id: '4', name: 'Glow Spa & Wellness', category: 'Beauty' },
];

const cardSpacing = 16;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - cardSpacing * 3) / 2;

const Businesses: React.FC = ({ navigation }: any) => {


    const renderItem = ({ item }: { item: Business }) => (
        <RenderItem
            name={item.name}
            description="A beautiful space for community events."
            town="Springfield"
            status={item.status}
            category={item.category}
            onEdit={() => console.log('Edit clicked')}
            onDelete={() => console.log('Delete clicked')}
        />
    );

    return (
        <View className="flex-1 bg-gray-100 pt-[100px]">
            <FlatList
                data={businessesData}
                keyboardShouldPersistTaps="always"
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={{ paddingHorizontal: cardSpacing, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

export default Businesses;
