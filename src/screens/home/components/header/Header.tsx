// eslint-disable-next-line import/no-named-as-default-member
import React, { Image, View } from "react-native";

const Header = () => {
  const forveganLogo = "../../../../assets/images/forvegan-logo.png";

  return (
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
  );
};

export default Header;
