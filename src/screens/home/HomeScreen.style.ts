import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      alignItems: "center",
      justifyContent: "center",
      // paddingTop: 40,
      height: "100%",
      backgroundColor: "white",
    },
    titleTextStyle: {
      fontSize: 32,
    },
    buttonStyle: {
      height: 45,
      width: "90%",
      marginVertical: 12,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4A6130",
      shadowRadius: 5,
      shadowOpacity: 0.7,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      padding: 12,
    },
    buttonTextStyle: {
      color: colors.text,
      fontWeight: "700",
    },
  });
};
