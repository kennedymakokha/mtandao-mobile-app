import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { logout } from '../features/auth.slice';

const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {

  const dispatch = useDispatch()
  const { logout: logoutContext } = useAuth();
  const logoutUser = async () => {
    logoutContext()
    dispatch(await logout())

    navigation.navigate('Home', { screen: `login` });
  }
  return (
    <View className="flex-1 bg-secondary pt-16 px-5">

      {/* Header */}
      <View className="items-center mb-10 border-b">
        <Image
          source={require('../assets/logo-1.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-white text-lg">Welcome!</Text>
      </View>

      {/* Links */}
      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('Home')}
      >
        <Icon name="home-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('transactions')}
      >
        <Icon name="swap-horizontal-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center my-4"
        onPress={() => navigation.navigate('profile')}
      >
        <Icon name="person-outline" size={20} color="#fff" />
        <Text className="text-white text-base ml-3">Profile</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-auto mb-20 border-t border-gray-700 pt-5">
        <TouchableOpacity onPress={logoutUser}>
          <Text className="text-primary-500 text-center text-[24px] text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
