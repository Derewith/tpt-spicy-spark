import { Dimensions } from "react-native"

const appWidth = Dimensions.get("window").width
const appHeight = Dimensions.get("window").height

export const dimensions = {
  appWidth,
  appHeight,
}

export type AppDimensions = keyof typeof dimensions
