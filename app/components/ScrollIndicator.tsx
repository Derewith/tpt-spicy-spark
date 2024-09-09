import { dimensions } from "app/theme"
import React from "react"
import { ViewStyle } from "react-native"
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated"

export function ScrollIndicator({ index, scrollX }: { index: number; scrollX: any }) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * dimensions.appWidth,
      index * dimensions.appWidth,
      (index + 1) * dimensions.appWidth,
    ]
    const backgroundColor = interpolateColor(scrollX.value, inputRange, ["gray", "white", "gray"])
    return { backgroundColor }
  })

  return <Animated.View style={[$indicatorStyle, animatedStyle]} />
}

const $indicatorStyle: ViewStyle = {
  width: 10,
  height: 2,
  borderRadius: 5,
  marginHorizontal: 3,
}
