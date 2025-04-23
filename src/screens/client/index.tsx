import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    stock: 15,
    image: 'https://via.placeholder.com/400x300.png?text=Headphones',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 99.49,
    stock: 8,
    image: 'https://via.placeholder.com/400x300.png?text=Watch',
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 79.99,
    stock: 25,
    image: 'https://via.placeholder.com/400x300.png?text=Speaker',
  },
];

const ClientDashboard: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 mx-4 flex-row"
    //   onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center">
        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-secondary font-bold mt-1">Ksh {item.price.toFixed(2)}</Text>
        <Text className="text-gray-500 text-sm mt-1">Stock: {item.stock}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 pt-[100px]">

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ClientDashboard;
