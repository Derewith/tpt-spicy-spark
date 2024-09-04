import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MusicNavigator } from "./MusicNavigator"

import { SvgXml } from "react-native-svg"
import musicSVG from "../../assets/icons/svg/mp3_deezer-icons.svg"
import podcastSVG from "../../assets/icons/svg/podcast_deezer-icons.svg"

import favouritesSVG from "../../assets/icons/svg/love_deezer-icons.svg"
import searchSVG from "../../assets/icons/svg/search_deezer-icons.svg"
import premiumSVG from "../../assets/icons/svg/deezer-short_deezer-icons.svg"

export type DemoTabParamList = {
  Music: undefined
  Podcast: undefined
  Favourites: undefined
  Search: undefined
  Premium: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `TPTNavigator`.
 */
export function TPTNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 50 }],
        tabBarActiveTintColor: colors.palette.neutral100,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Music"
        component={MusicNavigator}
        options={{
          tabBarLabel: translate("tpt.musicTab"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              width={20}
              height={20}
              xml={musicSVG}
              color={focused ? colors.palette.neutral100 : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Podcast"
        component={MusicNavigator}
        options={{
          tabBarLabel: translate("tpt.podcastTab"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              width={20}
              height={20}
              xml={podcastSVG}
              color={focused ? colors.palette.neutral100 : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={MusicNavigator}
        options={{
          tabBarLabel: translate("tpt.favouritesTab"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              width={20}
              height={20}
              xml={favouritesSVG}
              color={focused ? colors.palette.neutral100 : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={MusicNavigator}
        options={{
          tabBarLabel: translate("tpt.searchTab"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              width={20}
              height={20}
              xml={searchSVG}
              color={focused ? colors.palette.neutral100 : colors.grey}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={MusicNavigator}
        options={{
          tabBarLabel: translate("tpt.premiumTab"),
          tabBarIcon: ({ focused }) => (
            <SvgXml
              width={20}
              height={20}
              xml={premiumSVG}
              color={focused ? colors.palette.neutral100 : colors.grey}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="podcast" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.xs,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
