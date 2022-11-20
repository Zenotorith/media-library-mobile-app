import React, { useState, useEffect } from 'react'
import MapView, { Marker, Circle, Callout } from 'react-native-maps'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { LocationObject } from '../types'

import * as Location from 'expo-location'

export default function MapScreen() {

    const [location, setLocation] = useState<any>(null)
    const [errorMsg, setErrorMsg] = useState<any>(null)
    const [pin, setPin] = useState<LocationObject>({
        latitude: 10.794530738197814,
        longitude: 106.65714971219522
    });

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return;
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location);
            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            console.log(location)
            console.log("Coor: " + { pin })
        })()
    }, [])

    let text = 'Waiting..'
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    latitudeDelta: 0.00192,
                    longitudeDelta: 0.00142,
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={pin}
                >
                    <Callout>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Vincent's home 🏠</Text>
                        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>The place where he's playing with deadline</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});