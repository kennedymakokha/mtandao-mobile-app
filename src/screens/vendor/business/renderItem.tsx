
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

type RenderItemProps = {
    name: string;
    description: string;
    town: string;
    status: boolean,
    category: string
    avatarUrl?: string;
    onEdit: () => void;
    onDelete: () => void;
};

const RenderItem: React.FC<RenderItemProps> = ({
    name,
    description,
    town,
    category,
    status,
    avatarUrl,
    onEdit,
    onDelete,
}) => {
    return (
        <View className="bg-white  rounded-2xl shadow p-4 mb-4 flex-row items-start justify-between">
            {/* Left Section - Avatar + Content */}

            <TouchableOpacity onPress={() => Alert.alert("Tested")} className="flex-1">
                <Text className="text-lg font-bold text-primary">{name}</Text>
                <Text className="text-sm text-gray-600 mt-1">{description}</Text>
                <View className='flex-row justify-between'>
                    <View className="flex-row items-center mt-2">
                        <Feather name="map-pin" size={14} color="gray" />
                        <Text className="text-sm text-gray-500 ml-1">{town}</Text>
                    </View>
                    <View className="flex-row items-center mt-2">
                        <Feather name="map-pin" size={14} color="gray" />
                        <Text className={`text-sm ${status ? "text-red-500" : "text-green-500"} ml-1`}>{town}</Text>
                    </View>
                    <View className="flex-row items-center mt-2">
                        <Feather name="map-pin" size={14} color="gray" />
                        <Text className="text-sm text-gray-500 ml-1">{category}</Text>
                    </View>
                </View>
            </TouchableOpacity>


            {/* Right Menu */}
            <Menu>
                <MenuTrigger>
                    <Entypo name="dots-three-vertical" size={20} color="gray" />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            padding: 8,
                            backgroundColor: 'white',
                            borderRadius: 8,
                            elevation: 4,
                            minWidth: 120,
                        },
                        optionText: {
                            fontSize: 16,
                            paddingVertical: 6,
                        },
                    }}
                >
                    <MenuOption onSelect={onEdit} text="Edit" />
                    <MenuOption onSelect={onDelete} text="Delete" />
                </MenuOptions>
            </Menu>
        </View>
    );
};

export default RenderItem;
