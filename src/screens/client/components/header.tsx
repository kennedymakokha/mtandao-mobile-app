import { View, Text } from 'react-native'
import React from 'react'

const Header = ({ text, primary, secondary }: { text: string, primary?: boolean, secondary?: boolean }) => {
    return (
        <View>
            <Text className={`${primary ? "text-primary" : secondary ? "text-secondary" : "text-white"} uppercase underline text-xl tracking-widest font-bold text-center py-2`}>{text}</Text>
        </View>
    )
}

export default Header