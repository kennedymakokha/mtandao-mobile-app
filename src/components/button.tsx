import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ submit, title }: { submit: any, title: any }) => {
    return (
        <TouchableOpacity activeOpacity={1}
            className="bg-secondary py-3 rounded-xl"
            onPress={submit}
        >
            <Text className="text-center tracking-widest uppercase font-bold  tracking-widest font-semibold text-lg">
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button