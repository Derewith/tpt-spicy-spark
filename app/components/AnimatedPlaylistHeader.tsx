import React, { useState } from "react"
import { View, Pressable, Image, LayoutChangeEvent, ViewStyle, ImageStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
  SharedValue,
} from "react-native-reanimated"
import { SvgXml } from "react-native-svg"
import { Text } from "./Text"
import { Header } from "./Header"
import { Icon } from "./Icon"
import { colors, dimensions } from "app/theme"
import { ScrollIndicator } from "./ScrollIndicator"

// @ts-ignore - bug in typescript
import optionsSVG from "../../assets/icons/svg/options_deezer-icons.svg"

interface PlaylistScreenProps {
  navigation: any
  playlistTitle: string
  playlistUser: { name: string }
  playlistInfo: {
    picture_xl: string
    description: string
    nb_tracks: number
    creation_date: string
    duration: number
    fans: number
  }
  tracks: any[]
  scrollY: SharedValue<number>
}

export function AnimatedPlaylistHeader(props: PlaylistScreenProps) {
  const { navigation, playlistTitle, playlistUser, playlistInfo, tracks, scrollY } = props

  const scrollX = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
  })
  const [heights, setHeights] = useState({
    header: 0,
    sticky: 0,
  })
  const onLayoutStickyElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, sticky: event.nativeEvent.layout.height })
  }
  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    setHeights({ ...heights, header: event.nativeEvent.layout.height })
  }

  const animatedStickyStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-dimensions.appHeight, heights.sticky],
            [dimensions.appHeight, -heights.sticky],
          ),
        },
      ],
      opacity: interpolate(scrollY.value, [0, heights.sticky], [1, 0]),
    }
  })

  const headerTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, heights.header], [0, 1]),
    }
  })

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [0, heights.sticky],
        ["transparent", colors.background],
      ),
      zIndex: 999,
    }
  })

  return (
    <View style={{ marginBottom: heights.sticky - heights.header }}>
      <Animated.View>
        <Animated.View style={animatedHeaderStyle} onLayout={onLayoutHeaderElement}>
          <Header
            backgroundColor={colors.transparent}
            LeftActionComponent={
              <Pressable onPress={() => navigation.goBack()} style={$pressableStyle}>
                <Icon icon="back" color={colors.palette.neutral100} size={20} />
              </Pressable>
            }
            RightActionComponent={
              <Pressable onPress={() => navigation.goBack()} style={$pressableStyle}>
                <SvgXml width={20} height={20} xml={optionsSVG} color={colors.palette.accent100} />
              </Pressable>
            }
            safeAreaEdges={["top"]}
          >
            <Animated.View style={[headerTitleStyle, $headerTitle]}>
              <Text preset="bold" text={playlistTitle} numberOfLines={1} />
              <Text preset="subtitle" text={`di ${playlistUser.name}`} numberOfLines={1} />
            </Animated.View>
          </Header>
        </Animated.View>
        {tracks && tracks.length > 0 && (
          <Animated.View style={animatedStickyStyle} onLayout={onLayoutStickyElement}>
            <Animated.ScrollView
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: dimensions.appWidth }}>
                <Image
                  source={{ uri: playlistInfo.picture_xl }}
                  style={$image}
                  resizeMode="stretch"
                />
              </View>
              <View style={$descriptionContainer}>
                <Text text={playlistInfo.description} />
              </View>
              <View style={$infoContainer}>
                <Text preset="bold">{"Brani"}</Text>
                <Text preset="subtitle" text={`${playlistInfo.nb_tracks}`} />
                <Text preset="bold">{"Aggiornamento"}</Text>
                <Text preset="subtitle" text={playlistInfo.creation_date} />
              </View>
              <View style={$infoContainer}>
                <Text preset="bold">{"Lunghezza"}</Text>
                <Text preset="subtitle" text={`${playlistInfo.duration}`} />
                <Text preset="bold">{"Fans"}</Text>
                <Text preset="subtitle" text={`${playlistInfo.fans}`} />
              </View>
            </Animated.ScrollView>
            <View style={$indicatorWrap}>
              <View style={$indicatorContent}>
                {new Array(4).fill(4).map((_, index) => (
                  <ScrollIndicator key={index} index={index} scrollX={scrollX} />
                ))}
              </View>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  )
}

const $pressableStyle: ViewStyle = {
  backgroundColor: colors.transparent,
  flexBasis: 40,
  height: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  overflow: "hidden",
}
const $headerTitle: ViewStyle = {
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  maxWidth: "50%",
}
const $image: ImageStyle = {
  width: "100%",
  height: 380,
}
const $descriptionContainer: ViewStyle = {
  width: dimensions.appWidth,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
}
const $infoContainer: ViewStyle = {
  width: dimensions.appWidth,
  justifyContent: "center",
  alignItems: "flex-start",
  paddingHorizontal: 20,
}

const $indicatorWrap: ViewStyle = {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
}

const $indicatorContent: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "black",
  padding: 5,
  borderRadius: 8,
  width: 75,
  alignSelf: "center",
}
