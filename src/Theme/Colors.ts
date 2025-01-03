/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const black = "black";

const Colors = {
  red: "#FF2700",
  primary: "#4D09CD",
  white: "aliceblue",
  pureWhite: "#fff",
  lightPrimary: "#d1c0e3",
  lighterPrimary:  "rgba(110, 124, 230, 0.2)",
  purple: "#b400a6",
  gray: "#7c7484",
  //gray:"gray",
  green:"#1dac08",
  lightGray:"#E4E4E4",
  light: {
    text: black,
    background: "#eaeaea",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    darkGray: "#c6c7c7",
  },
  dark: {
    darkGray: "#1B1B1C",
    text: "aliceblue",
    background: black,
    lightBackGround: "#1B1B1C",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const {
  dark,
  light,
  primary,
  lightPrimary,
  red,
  white,
  pureWhite,
  gray,
  purple,
  green,
  lightGray,
  lighterPrimary,
} = Colors;
