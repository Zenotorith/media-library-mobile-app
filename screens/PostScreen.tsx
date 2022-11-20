import * as React from 'react'

import { StatusBar, FlatList, Image, Animated, Dimensions, View, Text, Button, StyleSheet } from 'react-native'

export default function PostScreen() {
    return (
        <View style={styles.container}>
            <Text>Form Input Here!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})