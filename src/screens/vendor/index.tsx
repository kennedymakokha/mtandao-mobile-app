// src/screens/AdminDashboard.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: any;
};

const AdminDashboard: React.FC<Props> = ({ navigation }) => {
  // Dummy data
  const totalBusinesses = 5;
  const totalProducts = 42;

  return (
    <ScrollView className={`flex-1 pt-[100px] bg-white px-5  bg-gray-100`}>

      {/* Dashboard Cards */}
      <View className="flex-row justify-between mb-4">
        {/* Businesses Card */}
        <TouchableOpacity
          activeOpacity={1}
          className="bg-primary-100 rounded-2xl p-5 w-[48%]"
          onPress={() => navigation.navigate('Businesses')}
        >
          <Icon name="business-outline" size={28} color="#3B82F6" />
          <Text className="text-gray-800 text-lg font-semibold mt-2"> /{totalBusinesses}</Text>
          <Text className="text-gray-600 text-sm">Businesses </Text>
        </TouchableOpacity>

        {/* Products Card */}
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

export default AdminDashboard;
