import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native'
import { Camera } from 'expo-camera'
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'

export default function CameraScreen() {
    let cameraRef = useRef<any>()
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | undefined>()
    const [photo, setPhoto] = useState<any>()

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === "granted")
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
        })()
    }, [])
    if (hasCameraPermission === undefined) {
        return <Text>Requesting permission...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission denied. Please change this in your mobile setting</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto)
    }

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        }

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        }

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "" + photo.base64 }} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        )
    }

    return (
        <Camera style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cameraIconContainer} onPress={takePic}>
                    <Image style={styles.cameraIcon} source={require("./assets/icons/camera.png")} />
                </TouchableOpacity>
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        marginBottom: 120,
        justifyContent: 'flex-end'
    },
    cameraIconContainer: {
        backgroundColor: '#fff',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30

    },
    cameraIcon: {
        backgroundColor: '#fff',
        width: 32,
        height: 32
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
})