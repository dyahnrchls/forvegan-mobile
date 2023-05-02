import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./DetailScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import RNBounceable from "@freakycoder/react-native-bounceable";
import {
  launchImageLibrary,
  ImagePickerResponse,
  MediaType,
  Asset,
} from "react-native-image-picker";
import axios from "axios";

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

  const handleImageSelect = () => {
    const options: { mediaType: MediaType; includeBase64: boolean } = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
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
        console.log({
          formData,
        });
        axios
          .post("https://pear-different-snail.cyclic.app/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => setResult(res?.data?.message))
          .catch((err) => console.error(err));
        setSelectedImage(newSelectedImage);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Detail Screen
      </Text>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <RNBounceable style={styles.buttonStyle} onPress={handleImageSelect}>
        <Text color={colors.white}>Upload Photo</Text>
      </RNBounceable>
      <Text>{result}</Text>
    </View>
  );
};

export default DetailScreen;
