/* eslint-disable react-native/no-inline-styles */
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "../i18n"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MusicNavigator } from "./MusicNavigator"

import { SvgXml } from "react-native-svg"

// @ts-expect-error -- TSCONVERSION
import musicSVG from "../../assets/icons/svg/mp3_deezer-icons.svg"
// @ts-expect-error -- TSCONVERSION
import podcastSVG from "../../assets/icons/svg/podcast_deezer-icons.svg"
// @ts-expect-error -- TSCONVERSION
import favouritesSVG from "../../assets/icons/svg/love_deezer-icons.svg"
// @ts-expect-error -- TSCONVERSION
import searchSVG from "../../assets/icons/svg/search_deezer-icons.svg"
// @ts-expect-error -- TSCONVERSION
import premiumSVG from "../../assets/icons/svg/deezer-short_deezer-icons.svg"

export type DemoTabParamList = {
  Music: undefined
  Podcast: undefined
  Favourites: undefined
  Search: undefined
  Premium: undefined
}

/**
 * Demo screen that is used for each tab.
 */
const DemoScreen = () => <View style={{ backgroundColor: colors.background, flex: 1 }} />

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
      >
        {() => <DemoScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Favourites"
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
      >
        {() => <DemoScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
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
      >
        {() => <DemoScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Premium"
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
      >
        {() => <DemoScreen />}
      </Tab.Screen>
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
