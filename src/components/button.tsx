import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ submit, title }: { submit: any, title: any }) => {
    return (
        <TouchableOpacity activeOpacity={1}
            className="bg-primary py-3 rounded-xl"
            onPress={submit}
        >
            <Text className="text-center tracking-widest uppercase font-bold text-slate-100 font-semibold text-lg">
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button