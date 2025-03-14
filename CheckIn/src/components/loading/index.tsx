import { View, ActivityIndicator } from "react-native";

import colors from "@/src/styles/colors";

interface loadingProps {
  isLoading: boolean;
}

const Loading: React.FC<loadingProps> = ({ isLoading = false }) => {
  return isLoading ? (
    <View
      style={{
        flex: 1,
        zIndex: 999,
        position: "absolute",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.white} />
    </View>
  ) : null;
};

export default Loading;
