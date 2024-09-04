import React from "react"
import { View, ViewStyle } from "react-native"

export const ItemSeparator = () => {
  return <View style={$separator} />
}
const $separator: ViewStyle = {
  backgroundColor: "rgb(44,44,52)",
  height: 1,
}
