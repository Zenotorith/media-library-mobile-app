import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import PostScreen from '../screens/PostScreen';
import CameraScreen from '../screens/CameraScreen';

const Tab = createBottomTabNavigator();

export default function CustomTabBarButton() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    bottom: 10,
                    left: 10,
                    right: 10,
                    height: 60,
                    position: 'absolute',
                    backgroundColor: '#f2e3d1',
                    borderRadius: 10
                },
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/icons/home.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#b25829' : '#93877b'
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Add Picture"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/icons/add.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#b25829' : '#93877b'
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="See your location"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/icons/location.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#b25829' : '#93877b'
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Take a Photo"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image
                                source={require('../assets/icons/camera.png')}
                                resizeMode="contain"
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: focused ? '#b25829' : '#93877b'
                                }}
                            />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.16,
        shadowRadius: 3.5,
        elevation: 5
    }
});