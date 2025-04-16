import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'


const ImagePreview = ({ item, setSelectedImages, selectedImages }: { item: any, setSelectedImages: any, selectedImages: any }) => {
    const toggleSelect = (path: string) => {
        setSelectedImages((prev: any) => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path); // Unselect
            } else {
                newSet.add(path); // Select
            }
            return newSet;
        });
    };

    return (

        <View className="size-28   relative">
            <Image
                source={{ uri: 'file://' + item }}
                className="w-full h-full "
                resizeMode="cover"
            />

            {/* Overlay checkbox */}
            <Pressable
                onPress={() => toggleSelect(item)}
                style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    backgroundColor: '#136207',
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#136207',
                }}
            >
                {/* {selectedImages?.has(item) && ( */}
                    <Text style={{ color: '#ffaa1d', fontWeight: 'bold' }}>✓</Text>
                {/* )} */}
            </Pressable>
        </View>



    )
};

export default ImagePreview