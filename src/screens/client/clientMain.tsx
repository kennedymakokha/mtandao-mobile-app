import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Button from '../../components/button'
import { useGetbusinessesQuery } from '../../services/businessApi.slice'
import { TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { clientStackParamList } from '../../../types'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'

const ClientMain = () => {
    const [filter, setFilter] = useState({
        limit: 4, page: 1
    })
    const { data, isLoading, isSuccess, refetch } = useGetbusinessesQuery(filter)
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const [text, setText] = useState("")
    const [show, setShow] = useState(false)
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

    const loadMoreData = async () => {
        setFilter(prev => ({ ...prev, page: prev.page + 1 }))
        setTimeout(async () => {
            await refetch()
        }, 2000);
    };

    return (
        <View className='flex-1 items-center bg-primary-800 py-20' style={{ width: width, height: height }}>
            <View className="flex border border-2 p-3 border-gray-400  rounded-md">
                <Text className='font-bold text-3xl text-center pt-2'>What Are you Looking For?</Text>
                <TextInput
                    className="min-h-[30%] border my-5   bg-slate-200 rounded-xl p-4 text-base text-black"
                    multiline
                    numberOfLines={10}
                    textAlignVertical="top" // ensures the text starts at the top
                    placeholder="Type your message..."
                    placeholderTextColor="#999"
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Find" submit={() => setTimeout(async () => {

                    setShow(true)
                }, 2000)} />
            </View>
            <View className="flex w-full h-full mt-5">
                {show && <FlatList
                    data={data === undefined ? [] : data.businessess}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) =>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('business_detail', { business: item })}>
                            <BusinessItem name={item.business_name} town={item.town} />
                        </TouchableOpacity>

                    }
                    contentContainerStyle={{
                        paddingHorizontal: 1,
                        paddingTop: 8,
                        paddingBottom: 100,
                    }}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoading ? <ActivityIndicator className="my-4 text-secondary" /> : null}
                />}
                {isLoading && !isSuccess && <View className='w-full h-1/2  bg-primary-700 flex items-center justify-center '>
                    <Image
                        source={require('../../assets/logo-1.png')}
                        className="w-20 animate-spin h-20 rounded-full mb-2"
                    />
                </View>}

            </View>
        </View>
    )
}

export default ClientMain