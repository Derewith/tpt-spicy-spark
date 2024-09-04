/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewBase,
  Image,
  ViewStyle,
  Dimensions,
} from "react-native"
import { EmptyState, Header, Icon, ListView, Screen, Text, Toggle } from "../components"
import { colors, spacing } from "../theme"
import optionsSVG from "../../assets/icons/svg/options_deezer-icons.svg"

import { useAppDispatch, useAppSelector } from "app/store/store"
import { fetchPlaylists } from "app/store/playlistsSlice"
import { fetchTracks } from "app/store/tracksSlice"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "app/utils/delay"
import { MusicStackScreenProps } from "app/navigators/MusicNavigator"
import { SongItem } from "app/components/SongItem"
import { SvgXml } from "react-native-svg"
import { ScrollView } from "react-native-gesture-handler"
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { ItemSeparator } from "app/components/ItemSeparator"
const windowWidth = Dimensions.get("window").width

export const PlaylistScreen: FC<MusicStackScreenProps<"DemoPlaylist">> = ({
  navigation,
  route: {
    params: { playlistIndex, title: playlistTitle, user: playlistUser },
  },
}) => {
  const dispatch = useAppDispatch()

  const playlistInfo = useAppSelector((state) => state.tracks.tracks)
  console.log("🚀 ~ playlistInfo:", playlistInfo)
  const tracks = useAppSelector((state) => state.tracks?.tracks?.tracks?.data)
  //   const tracksStatus = useAppSelector((state) => state.tracks?.status)
  //   console.log("🚀 ~ tracksStatus:", tracksStatus)

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (playlistIndex) {
      setIsLoading(true)
      dispatch(fetchTracks(Number(playlistIndex)))
      setIsLoading(false)
    }
  }, [playlistIndex])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([dispatch(fetchPlaylists()), delay(750)])
    setRefreshing(false)
  }

  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
  })

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer}>
      <ListView
        contentContainerStyle={$listContentContainer}
        data={tracks}
        // extraData={tracks.length + tracks.length}
        refreshing={refreshing}
        estimatedItemSize={177}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={colors.palette.neutral100} />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={
          <React.Fragment>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
              }}
            >
              <Header
                backgroundColor={colors.transparent}
                // title={playlistTitle}
                // titleMode="center"
                // subtitle={`di ${playlistUser.name}`}
                LeftActionComponent={
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={{
                      backgroundColor: colors.transparent,
                      flexBasis: 40,
                      height: "100%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <Icon icon="back" color={colors.palette.neutral100} size={20} />
                  </Pressable>
                }
                RightActionComponent={
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={{
                      backgroundColor: colors.transparent,
                      flexBasis: 40,
                      height: "100%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <SvgXml
                      width={20}
                      height={20}
                      xml={optionsSVG}
                      color={colors.palette.accent100}
                    />
                  </Pressable>
                }
                safeAreaEdges={["top"]}
              />
            </View>
            <Animated.ScrollView
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: windowWidth }}>
                <Image
                  source={{ uri: playlistInfo?.picture_xl }}
                  style={{ width: "100%", height: 380 }}
                  resizeMode="stretch"
                />
              </View>
              <View
                style={{
                  width: windowWidth,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text text={playlistInfo?.description} />
              </View>
              <View
                style={{
                  width: windowWidth,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingHorizontal: 20,
                }}
              >
                <Text preset="bold">Brani</Text>
                <Text preset="subtitle" text={playlistInfo?.nb_tracks} />
                <Text preset="bold">Aggiornamento</Text>
                <Text preset="subtitle" text={playlistInfo?.creation_date} />
              </View>
              <View
                style={{
                  width: windowWidth,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingHorizontal: 20,
                }}
              >
                <Text preset="bold">Lunghezza</Text>
                <Text preset="subtitle" text={playlistInfo?.duration} />
                <Text preset="bold">Fans</Text>
                <Text preset="subtitle" text={playlistInfo?.fans} />
              </View>
            </Animated.ScrollView>
            <View style={$indicatorWrap}>
              <View style={$indicatorContent}>
                {[1, 2, 3, 4].map((_, index) => (
                  <Indicator key={index} index={index} scrollX={scrollX} />
                ))}
              </View>
            </View>
          </React.Fragment>
        }
        renderItem={({ item }) => <SongItem item={item} />}
      />
    </Screen>
  )
}

const Indicator = ({ index, scrollX }: { index: number; scrollX: any }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * windowWidth, index * windowWidth, (index + 1) * windowWidth]
    const backgroundColor = interpolateColor(scrollX.value, inputRange, ["gray", "white", "gray"])
    return { backgroundColor }
  })

  return <Animated.View style={[$indicatorStyle, animatedStyle]} />
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

const $indicatorStyle: ViewStyle = {
  width: 10,
  height: 2,
  borderRadius: 5,
  marginHorizontal: 3,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.lg,
}
const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
