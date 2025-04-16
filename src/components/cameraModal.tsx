import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { StyleSheet } from 'nativewind'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import ImagePreview from './imagePreview'

const CameraModal = ({ visible, setVisible }: any) => {
    const [cam, setCam] = useState<any>("back")
    const [images, setImages] = useState<any>([])
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice(cam)
    const camera = useRef<Camera>(null)
    useEffect(() => {
        (async () => {
            let status = await Camera.getCameraPermissionStatus();
            console.log(status)
            if (status !== 'granted') {
                status = await Camera.requestCameraPermission();
            }

            if (status === 'denied') {
                // show a prompt or navigate away
                console.warn('Camera permission denied');
            }
        })();
    }, []);

    if (!hasPermission) return <View><Text>Not Permitted</Text></View>
    if (device == null) return <View><Text>Not Device selected</Text></View>
    const handleCapture = async () => {
        if (camera.current == null) return;
        const photo = await camera.current.takePhoto();
        setImages((prevItems: any) => [...prevItems, photo.path]);
        console.log("Captured photo:", photo);
    };
    const changeView = () => {
        if (cam === "back") {
            setCam("front")
        } else {
            setCam("back")
        }
    }

    if (!device) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading camera...</Text>
            </View>
        );
    }
    const pickImageFromGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (result.didCancel) {
            console.log('User cancelled');
        } else if (result.errorCode) {
            console.error('Gallery error:', result.errorMessage);
        } else {
            const image = result.assets?.[0];
            setImages((prevItems: any) => [...prevItems, image?.uri]);
            console.log('Image URI:', image?.uri);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View className="flex-1 bg-white">
                <View className="flex-1 relative z-0">
                    <Camera
                        ref={camera}
                        style={{ width: "100%", height: "100%" }}
                        photo={true}
                        device={device}
                        isActive={true}
                    />

                    {/* Capture Button */}
                    <View className={` absolute z-10  ${images.length > 0 ? "bottom-32" : "bottom-12"}  flex flex-row w-full justify-between px-10 `}>
                        <TouchableOpacity
                            onPress={pickImageFromGallery}
                            className="self-center  rounded-full"
                        >
                            <Icon2 name="camera-image" className='pr-1 ' size={56} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCapture}
                            className="self-center  rounded-full"
                        >
                            <Icon name="camera" className='pr-1 ' size={56} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => changeView()}
                            className="self-center rounded-full"
                        >
                            <Icon2 name={`${cam === "back" ? "camera-flip-outline" : "camera-flip"}`} className='pr-1 ' size={56} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View className=' absolute  inset-0 bg-black opacity-50   flex flex-row w-full h-full '></View>
                    <View className=' absolute z-10 bottom-4 px-1  flex flex-row w-full gap-x-2 px-0 '>
                        <FlatList
                            data={[...images].reverse()}
                            horizontal
                            renderItem={({ item }) => <ImagePreview setSelectedImages={setImages} item={item} selectedImages={images} />}
                            keyExtractor={item => item}
                            pagingEnabled
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                        />
                    </View>


                    {/* Close Button */}

                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        className="absolute top-10 right-5  px-4 py-2 rounded-lg"
                    >
                        <Icon name="close" className='pr-1 ' size={56} color="#6b7280" />

                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    )
}

export default CameraModal