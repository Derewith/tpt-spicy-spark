/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Image, ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { Text } from "../components"
import { spacing } from "../theme"

export const PlaylistCard = ({
  playlist,
  onPress,
  style,
}: {
  playlist: any
  onPressFavorite?: () => void
  isFavorite?: boolean
  onPress: () => void
  style: ViewStyle[]
}) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Image source={{ uri: playlist.picture_big }} style={$itemThumbnail} resizeMode="cover" />
      <View style={$content}>
        <Text text={playlist.title} preset="default" />
        <Text text={`${playlist.nb_tracks} brani`} preset="subtitle" />
      </View>
    </Pressable>
  )
}

const $itemThumbnail: ImageStyle = {
  width: "100%",
  height: 160,
  borderRadius: spacing.xxs,
}

const $content: ViewStyle = {
  paddingTop: spacing.xs,
}
