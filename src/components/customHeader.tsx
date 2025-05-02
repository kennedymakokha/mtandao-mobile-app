import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
function CustomHeader({ title }: { title: string }) {
    const navigation = useNavigation();

    return (
        <View className="flex-row items-center p-4 bg-primary-900 shadow-md">
            <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                className="mr-4"
            >
                <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-lg text-secondary-500 uppercase  text-center  font-semibold">{title}</Text>
        </View>
    );
}

export default CustomHeader
