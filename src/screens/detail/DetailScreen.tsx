import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./DetailScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailScreenProps {}
interface SelectedImage {
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
}

const DetailScreen: React.FC<DetailScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [result, setResult] = useState<string>("");

  const imagesIngredientsExample =
    "../../assets/images/ingredients-example.png";
  const forveganLogo = "../../assets/images/forvegan-logo.png";

  return (
    <SafeAreaView>
      <View
        style={{
          paddingVertical: 4,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={require(forveganLogo)}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.container}>
        {selectedImage ? (
          <Image
            source={{
              uri: selectedImage.uri,
            }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <Image
            source={require(imagesIngredientsExample)}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Text fontFamily={fonts.poppins.semiBold} color={colors.text} h1>
          Non - Vegan
        </Text>
        <Text
          fontFamily={fonts.poppins.regular}
          style={{ fontSize: 16, paddingTop: 16, textAlign: "center" }}
        >
          All item has been scanned and the search returned 1 flagged ingredient
        </Text>
        <Text>{result}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
