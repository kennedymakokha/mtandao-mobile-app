import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
const InputContainer = ({ value, keyboardType, latlng, onchange, editable, multiline, placeholder }: { latlng?: string, keyboardType?: string | any, editable?: boolean, multiline?: boolean, value: string, onchange: any, placeholder: string }) => {
    return (
        <View>
            <TextInput

                className={`border border-primary rounded-xl h-[200px] px-4 py-3 mb-4 text-base ${latlng === "yes" && !editable && "bg-slate-200"}`}
                placeholder={placeholder}
                value={value}
                onChangeText={onchange}
                editable={editable}
                keyboardType={keyboardType}
                multiline={multiline}
                textAlignVertical="top"
            />
        </View>
    )
}

export const Input = ({ placeholder, value, onChangeText, keyboard, label, hide, setHide }: { hide?: boolean, setHide?: any, placeholder: string, value: string | any, onChangeText: any, keyboard?: string | any, label?: string }) => {
    return (

        <View className="flex w-full  h-20  mb-4 rounded-md bg-primary-100 justify-center">
            {label && <Text className='px-2  tracking-widest pt-2 uppercase text-primary font-bold'>{label}</Text>}
            <View className="flex flex-row  items-center justify-between px-4">
                <TextInput
                    className=" rounded-xl text-primary"
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={hide}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboard}
                    autoCapitalize="none"
                />
                {hide !== undefined && <Icon onPress={setHide} name={hide ? "eye" : "eye-with-line"} size={30} color="#333333" />}
            </View>

        </View>


    )
}

export default InputContainer