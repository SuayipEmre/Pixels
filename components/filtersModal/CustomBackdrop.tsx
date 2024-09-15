import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import { BlurView } from "expo-blur"
import { StyleSheet } from "react-native"
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated"
import styles from './styles'


export const CustomBackrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {

    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
        return {
            opacity
        }
    })

    const containerStyles = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]
    return (
        <Animated.View style={containerStyles}>
            <BlurView
                style={StyleSheet.absoluteFill}
                tint='dark'
                intensity={25}
            />


        </Animated.View>
    )
}