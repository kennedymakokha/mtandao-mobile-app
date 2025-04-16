import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const InputContainer = ({ value, onchange, multiline, placeholder }: { multiline?: boolean, value: string, onchange: any, placeholder: string }) => {
    return (
        <View>
            <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
                placeholder={placeholder}
                value={value}
                onChangeText={onchange}
                multiline={multiline}
                textAlignVertical="top"
            />
        </View>
    )
}

export default InputContainer