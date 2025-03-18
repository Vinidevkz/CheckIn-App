import { View, Image } from "react-native";

import colors from "@/src/styles/colors";

import { Octicons } from "@expo/vector-icons";

interface iconBoxProps {
  image?: string;
  width: number;
  height: number;
}

const iconBox: React.FC<iconBoxProps> = ({ image, width, height }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height,
        borderRadius: 50,
        elevation: 2,
        backgroundColor: colors.darkGray,
        overflow: 'hidden'
      }}
    >
      {!image ? (
        <Octicons name="feed-person" size={width - 25} color={"#474747"} />
      ) : (
        <Image
        source={{ uri: image }}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        />
      )}
    </View>
  );
};

export default iconBox;
