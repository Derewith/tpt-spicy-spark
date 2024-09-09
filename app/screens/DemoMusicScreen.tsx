import React, { FC, useEffect } from "react"
import { ActivityIndicator, ImageStyle, View, ViewStyle } from "react-native"
import { EmptyState, ListView, Screen, Text } from "../components"
import { colors, spacing } from "../theme"

import { useAppDispatch, useAppSelector } from "app/store/store"
import { fetchPlaylists } from "app/store/playlistsSlice"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "app/utils/delay"
import { PlaylistCard } from "app/components/PlaylistCard"
import { MusicStackScreenProps } from "app/navigators/MusicNavigator"

export const DemoMusicScreen: FC<MusicStackScreenProps<"DemoMusic">> = (_props) => {
  const dispatch = useAppDispatch()

  const playlists = useAppSelector((state) => state.playlists.data)
  const playlistsStatus = useAppSelector((state) => state.playlists.status)

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (playlistsStatus === "idle" || playlistsStatus === undefined) {
      setIsLoading(true)
      dispatch(fetchPlaylists())
      setIsLoading(false)
    }
  }, [playlistsStatus])

  const handlePlaylistClick = (item: any) => {
    _props.navigation.navigate("DemoPlaylist", {
      playlistIndex: item.id,
      picture: item.picture,
      title: item.title,
      user: item.user,
    })
  }

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([dispatch(fetchPlaylists()), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
      statusBarStyle="light"
    >
      <ListView
        contentContainerStyle={$listContentContainer}
        data={playlists}
        refreshing={refreshing}
        estimatedItemSize={177}
        numColumns={2}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={colors.palette.neutral100} />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              heading={"Non ci sono playlist"}
              content={"Riprova più tardi."}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            {playlists && <Text preset="bold" text="Playlist che adorerai" />}
          </View>
        }
        renderItem={({ item, index }) => (
          <PlaylistCard
            playlist={item}
            style={[
              index % 2 ? { paddingRight: spacing.xs } : { paddingLeft: spacing.xs },
              index > 1 ? { paddingTop: spacing.xl } : {},
              // eslint-disable-next-line react-native/no-inline-styles
              { flex: 1, marginHorizontal: spacing.xs },
            ]}
            onPress={() => handlePlaylistClick(item)}
          />
        )}
      />
    </Screen>
  )
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
  paddingHorizontal: spacing.md,
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingBottom: spacing.lg,
}
const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
