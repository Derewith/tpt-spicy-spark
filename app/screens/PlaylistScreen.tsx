/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  Pressable,
  View,
  Image,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native"
import {
  AnimatedPlaylistHeader,
  EmptyState,
  Header,
  Icon,
  ScrollIndicator,
  Text,
} from "../components"
import { colors, spacing } from "../theme"

import { useAppDispatch, useAppSelector } from "app/store/store"
import { fetchTracks, PlayListTracks } from "app/store/tracksSlice"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "app/utils/delay"
import { MusicStackScreenProps } from "app/navigators/MusicNavigator"
import { SongItem } from "app/components/SongItem"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { ItemSeparator } from "app/components"

export const PlaylistScreen: FC<MusicStackScreenProps<"DemoPlaylist">> = ({
  navigation,
  route: {
    params: { playlistIndex, title: playlistTitle, user: playlistUser },
  },
}) => {
  const dispatch = useAppDispatch()

  const playlistInfo = useAppSelector((state) => state.tracks.data)
  const tracksStatus = useAppSelector((state) => state.tracks.status)
  const tracks = useAppSelector((state) => state.tracks.data.tracks.data as PlayListTracks[])

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
    await Promise.all([dispatch(fetchTracks(Number(playlistIndex))), delay(750)])
    setRefreshing(false)
  }

  const scrollY = useSharedValue(0)

  const scrollYHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      {isLoading || tracksStatus === "loading" ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={colors.palette.neutral100} />
        </View>
      ) : (
        <Animated.FlatList
          contentContainerStyle={$listContentContainer}
          data={tracks}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          onScroll={scrollYHandler}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.palette.neutral100} />
              ) : (
                <EmptyState
                  preset="generic"
                  style={$emptyState}
                  buttonOnPress={manualRefresh}
                  imageStyle={$emptyStateImage}
                  ImageProps={{ resizeMode: "contain" }}
                />
              )}
            </View>
          }
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={
            <AnimatedPlaylistHeader
              navigation={navigation}
              playlistTitle={playlistTitle}
              playlistUser={playlistUser}
              playlistInfo={playlistInfo}
              scrollY={scrollY}
              tracks={tracks}
            />
          }
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll={false}
          renderItem={({ item }) => <SongItem item={item} />}
        />
      )}
    </View>
  )
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.lg,
}

const $emptyState: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
  backgroundColor: colors.background,
  paddingTop: 200,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
