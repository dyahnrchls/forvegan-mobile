import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./DetailScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Accordion from "@shared-components/accordion/Accordion";
import { StackNavigationProp } from "@react-navigation/stack";
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";

type RootStackParamList = {
  Home: undefined;
  Detail: { message?: string };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Detail"
>;

type DetailScreenProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { colors } = theme;
  const { message } = route.params || "";

  const vegan = "../../assets/images/vegan.png";
  const nonVegan = "../../assets/images/non-vegan.png";
  const unknownProduct = "../../assets/images/unknown-product.png";

  const getResult = () => {
    if (message === "The product is vegan") {
      return "Vegan";
    }

    if (message === "Unknown product") {
      return "Unidentified";
    }
    return "Non Vegan";
  };

  const getPhoto = () => {
    if (message === "The product is vegan") {
      return require(vegan);
    }

    if (message === "Unknown product") {
      return require(unknownProduct);
    }
    return require(nonVegan);
  };

  return (
    <View>
      <View style={styles.container}>
        <Image source={getPhoto()} style={{ width: 200, height: 200 }} />
        <Text fontFamily={fonts.poppins.semiBold} color={colors.black} h1>
          {getResult()}
        </Text>
        {message === "Unknown product" && (
          <Text
            fontFamily={fonts.poppins.regular}
            style={{ fontWeight: "400", fontSize: 15 }}
            color="#777"
          >
            Item unidentified, please take another picture.
          </Text>
        )}
        <RNBounceable
          style={styles.buttonStyle}
          onPress={() =>
            NavigationService.navigate(SCREENS.HOME, { message: "Done" })
          }
        >
          <Text
            fontFamily={fonts.poppins.semiBold}
            style={{ fontSize: 16, lineHeight: 24 }}
            color={colors.white}
          >
            {message === "Unknown product" ? "Try Again" : "Done"}
          </Text>
        </RNBounceable>
        {/* <Text
          fontFamily={fonts.poppins.regular}
          style={{ fontSize: 16, paddingTop: 16, textAlign: "center" }}
        >
          All item has been scanned and the search returned 1 flagged ingredient
        </Text> */}
        {/* <Accordion
          data={[
            {
              key: "Oats",
              value: true,
            },
          ]}
          title="Lists of Ingredients"
        /> */}
      </View>
    </View>
  );
};

export default DetailScreen;
