import { View, Text } from 'react-native'
import React from 'react'

const ListEmpty = (text: any) => {
    return (
        <View className="mt-4">
            <Text className="text-secondary-400 text-center">
                No {text} found.
            </Text>
        </View>
    )
}

export default ListEmpty