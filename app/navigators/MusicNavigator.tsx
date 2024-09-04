import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { colors } from "app/theme"
import { DemoMusicScreen } from "app/screens/DemoMusicScreen"
import { PlaylistScreen } from "app/screens/PlaylistScreen"

type UserType = {
  id: number
  name: string
}

export type MusicStackParamList = {
  DemoMusic: undefined
  DemoPlaylist: {
    playlistIndex: number
    picture: string
    title: string
    user: UserType
  }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */

export type MusicStackScreenProps<T extends keyof MusicStackParamList> = NativeStackScreenProps<
  MusicStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<MusicStackParamList>()

const MusicStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: colors.background }}>
      <Stack.Screen name="DemoMusic" component={DemoMusicScreen} />
      <Stack.Screen name="DemoPlaylist" component={PlaylistScreen} />
    </Stack.Navigator>
  )
}

export const MusicNavigator = () => {
  return <MusicStack />
}
