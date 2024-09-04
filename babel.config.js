/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/guides/web-support/ */
  "@babel/plugin-transform-export-namespace-from",
  [
    "babel-plugin-inline-import",
    {
      extensions: [".svg"],
    },
  ],
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      "babel-preset-expo",
      // "module:metro-react-native-babel-preset"
    ],
    env: {
      production: {},
    },
    plugins,
  }
}
