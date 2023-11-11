import React, { useEffect, useMemo, useState } from "react";
import { Image, View } from "react-native";
import { useRoute, useTheme } from "@react-navigation/native";
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
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import Loading from "./components/loading/Loading";
import Toast from "react-native-toast-message";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRoute();
  // const [result, setResult] = useState<string>("");

  const imagesIngredientsExample =
    "../../assets/images/ingredients-example.png";

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        "An unexpected error occurred. Please try again or contact support for assistance.",
    });
  };

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
        setIsLoading(true);
        axios
          .post("https://pear-different-snail.cyclic.app/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log({ res });
            const message = res?.data?.message ?? "";
            // setResult(message);
            NavigationService.navigate(SCREENS.DETAIL, {
              message,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            showToast();
            console.error(err);
          });
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
        setIsLoading(true);
        axios
          .post("https://pear-different-snail.cyclic.app/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log({ res });
            const message = res?.data?.message ?? "";
            // setResult(message);
            NavigationService.navigate(SCREENS.DETAIL, {
              message,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            showToast();
            console.error(err);
          });
      }
    });
  };

  useEffect(() => {
    if ((route?.params as any)?.message === "Done") {
      setIsLoading(false);
    }
  }, [route]);

  return isLoading ? (
    <View style={{ height: "100%" }}>
      <Loading />
    </View>
  ) : (
    <View style={styles.container}>
      <Text fontFamily={fonts.poppins.semiBold} color={colors.black} h1>
        Scan Ingredients
      </Text>
      <Text
        fontFamily={fonts.poppins.regular}
        style={{ fontSize: 16, paddingTop: 16 }}
      >
        Scan the ingredients on your food
      </Text>

      <Image
        source={require(imagesIngredientsExample)}
        style={{ width: 200, height: 200, marginVertical: 80 }}
      />

      <Text fontFamily={fonts.poppins.regular} style={{ fontSize: 14 }}>
        Take a photo of the ingredients lists
      </Text>
      <RNBounceable style={styles.buttonStyle} onPress={handleTakePhoto}>
        <Text fontFamily={fonts.poppins.semiBold} color={colors.white}>
          Take a picture
        </Text>
      </RNBounceable>
      <Text fontFamily={fonts.poppins.regular} style={{ fontSize: 14 }}>
        Or open one from your{" "}
        <Text
          onPress={handleImageSelect}
          style={{
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          Gallery
        </Text>
      </Text>
      {/* <Text>{result}</Text> */}
    </View>
  );
};

export default HomeScreen;
