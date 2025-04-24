// src/screens/AdminDashboard.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionCard from './business/renderItem';

type Props = {
  navigation: any;
};

const VendorDashboard: React.FC<Props> = ({ navigation }) => {
  // Dummy data
  const totalBusinesses = 5;
  const totalProducts = 42;

  return (
    <ScrollView className={`flex-1 pt-14 bg-primary-100 px-5 `}>

      {/* Dashboard Cards */}
      <View className="flex-row  justify-between mb-4">

        <TouchableOpacity
          activeOpacity={1}
          className="bg-white rounded-2xl p-5 w-[48%]"
          onPress={() => navigation.navigate('Businesses')}
        >
          <Icon name="business-outline" size={28} color="#3B82F6" />
          <Text className="text-gray-800 text-lg font-semibold mt-2"> /{totalBusinesses}</Text>
          <Text className="text-gray-600 text-sm">Businesses </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          className="bg-secondary-50 rounded-2xl p-5 w-[48%]"
          onPress={() => navigation.navigate('Products')}
        >
          <Icon name="cube-outline" size={28} color="#f97316" />
          <Text className="text-gray-800 text-lg font-semibold mt-2">{totalProducts}</Text>
          <Text className="text-gray-600 text-sm">Products</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

export default VendorDashboard;
