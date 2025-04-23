// DashboardScreen.tsx
import { View, Text, ScrollView } from 'react-native';

export  const DashboardScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Admin Dashboard</Text>
      <View className="grid grid-cols-2 gap-4">
        {/* Stat cards */}
        <View className="bg-green-100 p-4 rounded-2xl shadow">
          <Text className="text-lg font-semibold">Total Users</Text>
          <Text className="text-2xl font-bold">1,204</Text>
        </View>
        <View className="bg-blue-100 p-4 rounded-2xl shadow">
          <Text className="text-lg font-semibold">Active Sessions</Text>
          <Text className="text-2xl font-bold">38</Text>
        </View>
      </View>
    </ScrollView>
  );
};
 