import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetbusinessproductsQuery } from '../../../services/productApi.slice';
import { FormLoader, NoData } from '../../../components/loader';
import { FAB } from 'react-native-paper';
import { useModal } from '../../../context/modalContext';
import CreateProductModal from './product/addProduct';

type Product = {
  id: string;
  product_name: string;
  price: number;
  images: [string];
  stock: number;
};



const BusinessDetails: React.FC = ({ route }: any) => {

  let business = route.params.business
  const navigation = useNavigation();
  const { data, isLoading, refetch, isSuccess } = useGetbusinessproductsQuery(business._id)

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 mx-4 flex-row"
    //   onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image
        source={{ uri: item.images ? item.images[0] : 'https://via.placeholder.com/400x300.png?text=Product' }}

        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-center">
        <Text className="text-lg font-semibold text-gray-800">{item.product_name}</Text>
        <Text className="text-secondary font-bold mt-1">Ksh {item.price}</Text>
        <Text className="text-gray-500 text-sm mt-1">Stock: {item.stock}</Text>
      </View>
    </TouchableOpacity>
  );
  useEffect(() => {
    refetch()
  }, [business])
  const [show, setShow] = useState(false)
  // const { isModalVisible, showModal, toggleModal, hideModal } = useModal();
  return (
    <View className="flex-1 bg-primary-100 pt-16">
      {isLoading && !isSuccess && data === undefined && <FormLoader />}
      {data?.products?.length === 0 && <Text>{`Add a product under ${business.business_name}`}</Text>}
      <FlatList
        data={data === undefined ? [] : data.products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        icon="plus"
        className="bg-secondary-500 text-white"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => setShow(true)}
      />
      <CreateProductModal business_id={business._id} dataItem={data} refetch={refetch} hideModal={() => setShow(false)} isModalVisible={show} navigation={navigation} />

    </View>
  );
};

export default BusinessDetails;
