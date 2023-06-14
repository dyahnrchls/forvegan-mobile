import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./HomeScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
  Asset,
} from "react-native-image-picker";
import axios from "axios";
import fonts from "@fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";

interface HomeScreenProps {}
interface SelectedImage {
  uri: string;
  type: string;
  fileName: string;
  fileSize: number;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
  //   null,
  // );
  // const [result, setResult] = useState<string>("");

  const imagesIngredientsExample =
    "../../assets/images/ingredients-example.png";
  const forveganLogo = "../../assets/images/forvegan-logo.png";

  const handleImageSelect = () => {
    const options: { mediaType: MediaType; includeBase64: boolean } = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.info("User cancelled image picker");
      } else if (response.errorMessage) {
        console.error("ImagePicker Error: ", response.errorMessage);
      } else {
        const assets = response.assets as Asset[];
        const newSelectedImage: SelectedImage = {
          uri: assets[0].uri || "",
          type: assets[0].type || "",
          fileName: assets[0].fileName || "",
          fileSize: assets[0].fileSize || 0,
        };
        const formData = new FormData();
        formData.append("image", {
          uri: newSelectedImage.uri,
          type: newSelectedImage.type,
          name: newSelectedImage.fileName,
        });
        axios
          .post("https://pear-different-snail.cyclic.app/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const message = res?.data?.message ?? "";
            // setResult(message);
            NavigationService.navigate(SCREENS.DETAIL, {
              message,
            });
          })
          .catch((err) => console.error(err));
        // setSelectedImage(newSelectedImage);
      }
    });
  };

  const handleTakePhoto = () => {
    const options: { mediaType: MediaType; includeBase64: boolean } = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.info("User cancelled image picker");
      } else if (response.errorMessage) {
        console.error("ImagePicker Error: ", response.errorMessage);
      } else {
        const assets = response.assets as Asset[];
        const newSelectedImage: SelectedImage = {
          uri: assets[0].uri || "",
          type: assets[0].type || "",
          fileName: assets[0].fileName || "",
          fileSize: assets[0].fileSize || 0,
        };
        const formData = new FormData();
        formData.append("image", {
          uri: newSelectedImage.uri,
          type: newSelectedImage.type,
          name: newSelectedImage.fileName,
        });
        axios
          .post("https://pear-different-snail.cyclic.app/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const message = res?.data?.message ?? "";
            // setResult(message);
            NavigationService.navigate(SCREENS.DETAIL, {
              message,
            });
          })
          .catch((err) => console.error(err));
        // setSelectedImage(newSelectedImage);
      }
    });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          elevation: 0.5,
          marginBottom: 16,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 16,
            marginBottom: -2,
          }}
        >
          <Image
            source={require(forveganLogo)}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text
          fontFamily={fonts.poppins.semiBold}
          color={colors.text}
          style={{ fontSize: 24, fontWeight: "600" }}
        >
          Scan Ingredients
        </Text>
        <Text
          fontFamily={fonts.poppins.regular}
          style={{ fontSize: 16, paddingTop: 16, fontWeight: "400" }}
        >
          Scan the ingredients on your food
        </Text>

        <Image
          source={require(imagesIngredientsExample)}
          style={{ width: 200, height: 200, marginVertical: 80 }}
        />

        <Text
          fontFamily={fonts.poppins.regular}
          style={{ fontSize: 14, fontWeight: "400" }}
        >
          Take a photo of the ingredients lists
        </Text>
        <RNBounceable
          style={styles.buttonStyle}
          onPress={handleTakePhoto}
          // onPress={() => NavigationService.navigate(SCREENS.DETAIL)}
        >
          <Text
            fontFamily={fonts.poppins.semiBold}
            style={{ fontSize: 16, fontWeight: "600", lineHeight: 24 }}
            color={colors.white}
          >
            Take a picture
          </Text>
        </RNBounceable>
        <Text
          fontFamily={fonts.poppins.regular}
          style={{ fontSize: 14, fontWeight: "400" }}
        >
          Or open one from your{" "}
          <Text
            onPress={handleImageSelect}
            style={{ textDecorationLine: "underline", fontWeight: "700" }}
          >
            Gallery
          </Text>
        </Text>
        {/* <Text>{result}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
