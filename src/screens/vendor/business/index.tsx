import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, Pressable } from 'react-native';
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
        //     <TouchableOpacity
        //     activeOpacity={1}
        //     className={`${bg ? bg : "border border-primary"} mx-1   p-5 w-[100%] rounded-md flex-1 items-center justify-center`}
        //     // className="bg-secondary-50 rounded-2xl p-5 w-[48%]"
        //     onPress={() => {
        //                 console.log('Button pressed');
        //                 action?.(); 
        //             }}
        //   >
        //      {title ? <Text className="text-secondary text-center text-xs">{title}  </Text> : <Icon name={icon} size={20} color="#fff" />}
        //   </TouchableOpacity>
        <View

            className={`${bg ? bg : "border border-primary"} mx-1 px-5 py-5 w-full rounded-md flex-1 items-center justify-center`}

        >
            <TouchableOpacity
                activeOpacity={1}
                // className={`${bg ? bg : "border border-primary"} mx-1 px-5 py-5 w-full rounded-md flex-1 items-center justify-center`}
                onPress={() => {
                    console.log('Button pressed');
                    action?.();
                }}>
                {title ? <Text className="text-secondary w-full text-center text-xs">{title}  </Text> :
                    <Icon name={icon} size={20} color="#fff" />}
            </TouchableOpacity>
        </View>
    )
}
const Businesses: React.FC = ({ navigation }: any) => {


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
                    action={() => navigation.navigate('Createbusiness', { item: item })}
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

            {/* <TouchableOpacity
            // style={{ backgroundColor: 'red', position: 'absolute', zIndex: 999 }}
                className="mt-2 bg-primary-600 px-3 py-1.5 rounded-md"
                onPress={() => {navigation.navigate('ProductsList', { item: item });console.log("first")}}
            >
                <Text className="text-white text-center text-xs">Products</Text>
            </TouchableOpacity> */}



        </View>
    );

    return (
        <View className="flex-1 bg-gray-100 pt-[100px]">
            <FlatList
                data={businessesData}
                keyboardShouldPersistTaps="always"
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
