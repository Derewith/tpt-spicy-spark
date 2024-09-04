/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Image, ImageStyle, Pressable, View, ViewStyle } from "react-native"
import { Text } from "../components"
import { spacing } from "../theme"

export const PlaylistCard = ({
  playlist,
  isFavorite,
  onPressFavorite,
  onPress,
  style,
}: {
  playlist: any
  onPressFavorite?: () => void
  isFavorite?: boolean
  onPress: () => void
  style: ViewStyle
}) => {
  //   const liked = useSharedValue(isFavorite ? 1 : 0)

  //   // Grey heart
  //   const animatedLikeButtonStyles = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
  //         },
  //       ],
  //       opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  //     }
  //   })

  //   // Pink heart
  //   const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           scale: liked.value,
  //         },
  //       ],
  //       opacity: liked.value,
  //     }
  //   })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  //   const accessibilityHintProps = useMemo(
  //     () =>
  //       Platform.select<AccessibilityProps>({
  //         ios: {
  //           accessibilityLabel: playlist.title,
  //           accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
  //             action: isFavorite ? "unfavorite" : "favorite",
  //           }),
  //         },
  //         android: {
  //           accessibilityLabel: playlist.title,
  //           accessibilityActions: [
  //             {
  //               name: "longpress",
  //               label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
  //             },
  //           ],
  //           onAccessibilityAction: ({ nativeEvent }) => {
  //             if (nativeEvent.actionName === "longpress") {
  //               handlePressFavorite()
  //             }
  //           },
  //         },
  //       }),
  //     [playlist, isFavorite],
  //   )

  //   const handlePressFavorite = () => {
  //     onPressFavorite()
  //     liked.value = withSpring(liked.value ? 0 : 1)
  //   }

  //   const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
  //     () =>
  //       function ButtonLeftAccessory() {
  //         return (
  //           <View>
  //             <Animated.View
  //               style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
  //             >
  //               <Icon
  //                 icon="heart"
  //                 size={ICON_SIZE}
  //                 color={colors.palette.neutral800} // dark grey
  //               />
  //             </Animated.View>
  //             <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
  //               <Icon
  //                 icon="heart"
  //                 size={ICON_SIZE}
  //                 color={colors.palette.primary400} // pink
  //               />
  //             </Animated.View>
  //           </View>
  //         )
  //       },
  //     [],
  //   )

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

// const $iconContainer: ViewStyle = {
//   height: ICON_SIZE,
//   width: ICON_SIZE,
//   flexDirection: "row",
//   marginEnd: spacing.sm,
// }

// const $metadata: TextStyle = {
//   color: colors.textDim,
//   marginTop: spacing.xs,
//   flexDirection: "row",
// }

// const $metadataText: TextStyle = {
//   color: colors.textDim,
//   marginEnd: spacing.md,
//   marginBottom: spacing.xs,
// }

// const $favoriteButton: ViewStyle = {
//   borderRadius: 17,
//   marginTop: spacing.md,
//   justifyContent: "flex-start",
//   backgroundColor: colors.palette.neutral300,
//   borderColor: colors.palette.neutral300,
//   paddingHorizontal: spacing.md,
//   paddingTop: spacing.xxxs,
//   paddingBottom: 0,
//   minHeight: 32,
//   alignSelf: "flex-start",
// }

// const $unFavoriteButton: ViewStyle = {
//   borderColor: colors.palette.primary100,
//   backgroundColor: colors.palette.primary100,
// }
