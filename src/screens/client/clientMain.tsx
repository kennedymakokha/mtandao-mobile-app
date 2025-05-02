import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Button from '../../components/button'
import { useGetbusinessesQuery } from '../../services/businessApi.slice'
import { TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { clientStackParamList } from '../../../types'

const ClientMain = () => {
    const { data, isLoading, isSuccess } = useGetbusinessesQuery({})
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const [text, setText] = useState("")
    type NavigationProp = NativeStackNavigationProp<clientStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const BusinessItem = ({ name, town }: { name: string; town: string }) => (
        <View className="flex px-2">
            <View className={`bg-primary-200 min-w-3/4 rounded-xl shadow p-4 mb-3 `}>
                <Text className="text-lg font-semibold text-gray-800">{name}</Text>
                <Text className="text-sm self-end text-gray-500">{town}</Text>
            </View>
        </View>

    );
    return (
        <View className='flex-1 items-center bg-primary-800 py-20' style={{ width: width,height:height }}>
            <View className="flex border border-2 p-3 border-gray-400  rounded-md">
                <Text className='font-bold text-3xl text-center pt-2'>What Are you Looking For?</Text>
                <TextInput
                    className="h-[40%] border my-5   bg-slate-200 rounded-xl p-4 text-base text-black"
                    multiline
                    numberOfLines={10}
                    textAlignVertical="top" // ensures the text starts at the top
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Find" submit={() => console.log("first")} />
            </View>
            <View className="flex w-full h-full mt-5">
                <FlatList
                    data={data === undefined ? [] : data.businessess}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) =>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('business_detail', { business: item })}>
                            <BusinessItem name={item.business_name} town={item.town} />
                        </TouchableOpacity>

                    }
                    contentContainerStyle={{ padding: 1 }}
                />

            </View>
        </View>
    )
}

export default ClientMain