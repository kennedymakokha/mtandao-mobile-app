import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const InputContainer = ({ value, keyboardType, latlng, onchange, editable, multiline, placeholder }: { latlng?: string, keyboardType?: string | any, editable?: boolean, multiline?: boolean, value: string, onchange: any, placeholder: string }) => {
    return (
        <View>
            <TextInput
                className={`border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base ${latlng === "yes" && !editable && "bg-slate-200"}`}
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

export default InputContainer