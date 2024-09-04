import React, { FC, useEffect } from "react"
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewBase, ViewStyle } from "react-native"
import { EmptyState, ListView, Screen, Text, Toggle } from "../components"
import { colors, spacing } from "../theme"

import { useAppDispatch, useAppSelector } from "app/store/store"
import { fetchPlaylists } from "app/store/playlistsSlice"
import { fetchTracks } from "app/store/tracksSlice"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "app/utils/delay"
import { PlaylistCard } from "app/components/PlaylistCard"
import { MusicStackScreenProps } from "app/navigators/MusicNavigator"

export const DemoMusicScreen: FC<MusicStackScreenProps<"DemoMusic">> = (_props) => {
  const dispatch = useAppDispatch()

  const playlists = useAppSelector((state) => state.playlists.playlists)
  const playlistsStatus = useAppSelector((state) => state.playlists.status)
  //   const tracks = useAppSelector((state) => state.tracks?.tracks)
  //   const tracksStatus = useAppSelector((state) => state.tracks?.status)
  // dispatch(fetchTracks(playlistId))

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    if (playlistsStatus === "idle") {
      setIsLoading(true)
      dispatch(fetchPlaylists())
      setIsLoading(false)
    }
  }, [playlistsStatus])

  const handlePlaylistClick = (item) => {
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
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ListView
        contentContainerStyle={$listContentContainer}
        data={playlists.slice()}
        extraData={playlists.length + playlists.length}
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
              headingTx={
                false
                  ? "demoPodcastListScreen.noFavoritesEmptyState.heading"
                  : "Non ci sono playlist"
              }
              contentTx={
                false ? "demoPodcastListScreen.noFavoritesEmptyState.content" : "Riprova più tardi"
              }
              button={false ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="bold" text="Playlist che adorerai" />
            {/** // || episodeStore.episodesForList.length > 0 } */}
            {false && (
              <View style={$toggle}>
                <Toggle
                  //   value={episodeStore.favoritesOnly}
                  //   onValueChange={() =>
                  //     episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
                  //   }
                  variant="switch"
                  labelTx="demoPodcastListScreen.onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  //   accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item, index }) => (
          <PlaylistCard
            playlist={item}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              index % 2 ? { paddingRight: spacing.xs } : { paddingLeft: spacing.xs },
              // eslint-disable-next-line react-native/no-inline-styles
              index > 1 ? { paddingTop: spacing.xl } : {},
              // eslint-disable-next-line react-native/no-inline-styles
              { flex: 1, marginHorizontal: spacing.xs },
            ]}
            onPress={() => handlePlaylistClick(item)}
            // isFavorite={episodeStore.hasFavorite(item)}
            // onPressFavorite={() => episodeStore.toggleFavorite(item)}
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

const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

// const $container: ViewStyle = {
//   paddingTop: spacing.lg + spacing.xl,
//   paddingBottom: spacing.xxl,
//   paddingHorizontal: spacing.lg,
// }

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $listContentContainer: ContentStyle = {
  //   paddingHorizontal: spacing.md,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}
const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
// @demo remove-file
