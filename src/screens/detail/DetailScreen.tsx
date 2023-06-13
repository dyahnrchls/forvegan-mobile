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

type RootStackParamList = {
  Home: undefined;
  Detail: { message: string };
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
  const { message } = route.params;

  const vegan = "../../assets/images/vegan.png";
  const nonVegan = "../../assets/images/non-vegan.png";
  const forveganLogo = "../../assets/images/forvegan-logo.png";

  return (
    <View>
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 4,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          zIndex: 99,
          backgroundColor: "white",
        }}
      >
        <Image
          source={require(forveganLogo)}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={
            message === "The product isn't vegan"
              ? require(nonVegan)
              : require(vegan)
          }
          style={{ width: 200, height: 200 }}
        />
        <Text fontFamily={fonts.poppins.semiBold} color={colors.text} h1>
          {message === "The product isn't vegan" ? "Non - Vegan" : "Vegan"}
        </Text>
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
