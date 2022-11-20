import * as React from 'react'
import { StatusBar, FlatList, Image, Animated, Dimensions, View, Text, Button, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('screen')
const imageW = width * 0.7
const imageH = imageW * 1.54


const data: string[] = [
    'https://cdn.dribbble.com/users/12340785/screenshots/19192937/media/0cdd394fc1a5681d8b1272637dc5eacb.png',
    'https://cdn.dribbble.com/users/12340785/screenshots/19060487/media/7c67d2ffa50d66baa2f83c4812297825.png',
    'https://cdn.dribbble.com/userupload/3368816/file/original-836edbd89aaaa866cd207f7871c5ef52.png?compress=1&resize=752x',
    'https://cdn.dribbble.com/userupload/3230530/file/original-de7ae33adeb116fba99c0787cd56e8d9.png?compress=1&resize=1600x1200'
]

export default function HomeScreen() {
    const scrollX = React.useRef(new Animated.Value(0)).current
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar hidden />
            <View
                style={StyleSheet.absoluteFillObject}
            >
                {data.map((image, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0]
                    })
                    return (
                        <Animated.Image
                            key={`image-${index}`}
                            source={{ uri: image }}
                            style={[
                                StyleSheet.absoluteFillObject,
                                {
                                    opacity
                                }
                            ]}
                            blurRadius={50}
                        />
                    )
                })}
            </View>
            <Animated.FlatList
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => (
                    <View style={{
                        width, justifyContent: 'center', alignItems: 'center',
                        shadowColor: '#00',
                        shadowOpacity: 1,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowRadius: 20
                    }}>
                        <Image source={{ uri: item }} style={{
                            width: imageW,
                            height: imageH,
                            resizeMode: 'cover',
                            borderRadius: 16
                        }} />
                    </View>
                )}
            />
        </View >
    )
}
