/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Text } from "./Text"
import { colors, spacing } from "app/theme"
import { SvgXml } from "react-native-svg"

import favouritesSVG from "../../assets/icons/svg/love_deezer-icons.svg"
import optionsSVG from "../../assets/icons/svg/options_deezer-icons.svg"

export const SongItem = ({
  item,
}: //   isFavorite,
//   onPressFavorite,
{
  item: any
  //   onPressFavorite?: () => void
  //   isFavorite?: boolean
}) => {
  return (
    <View style={$containerStyle}>
      <View style={$rightContentStyle}>
        <Image source={{ uri: item.album.cover_medium }} style={$imageStyle} />
        <View style={$textContentStyle}>
          <Text preset="bold" numberOfLines={2}>
            {item.title}
            {item.explicit_lyrics && (
              <Text preset="formHelper" size="xxs">
                {" "}
                [E]
              </Text>
            )}
          </Text>

          <Text preset="subtitle">{item.artist.name}</Text>
        </View>
      </View>
      <View style={$leftContentStyle}>
        <SvgXml width={20} height={20} xml={favouritesSVG} color={colors.grey} />
        <SvgXml width={20} height={20} xml={optionsSVG} color={colors.grey} />
      </View>
    </View>
  )
}

const $containerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  alignContent: "center",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
}

const $textContentStyle: ViewStyle = {
  width: "70%",
}

const $rightContentStyle: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
}

const $leftContentStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
}

const $imageStyle: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 4
}
