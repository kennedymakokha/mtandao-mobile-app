import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { StyleSheet } from 'nativewind'

const CameraScreen = ({ visible, setVisible }: any) => {
    const [cam, setCam] = useState<any>("back")
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice("back")
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
    return (
        <View  className="flex-1 h-20 w-full "style={{ flex: 1 }}>
            <Camera
             style={{ width: 200, height: 200 }}
                // style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
        </View>



    )
}

export default CameraScreen