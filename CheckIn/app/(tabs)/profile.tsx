import { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

//styles
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";
import { FontAwesome6 } from "@expo/vector-icons";
//components
import IconBox from "@/src/components/iconBox";
import Button from "@/src/components/button";

export default function Profile() {
  const [user, setUser] = useState<any>();
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem("user");

      if (data !== null) {
        const userData = JSON.parse(data);
        console.log(userData);
        setUser(userData);

        if (userData.createdAt) {
          const date = new Date(userData.createdAt);
  
          const dateFormat = date.toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
  
          setDate(dateFormat);
        } else {
          console.log("createdAt não encontrado no usuário.");
        }
      } else {
        console.log("Nenhum dado encontrado no AsyncStorage.");

      }
    };



    getUserData();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert("Sair de sua conta", "Deseja sair da sua conta?", [
      {
        text: "Sim",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("token");
            router.replace("/logoutLoading");
          } catch (error) {
            console.log("Erro ao fazer logout: ", error);
          }
        },
      },
      {
        text: "Não",
        onPress: () => null,
      },
    ]);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <ImageBackground
        source={require("@/src/img/profileBg.png")}
        resizeMode="cover"
        style={s.background}
        imageStyle={{ opacity: 0.1 }}
      >
        <View style={s.cardContainer}>
          <View
            style={{
              borderWidth: 3,
              borderRadius: 50,
              borderColor: colors.darkGray,
              padding: 15,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 20,
                height: 180,
                backgroundColor: colors.gray,
                zIndex: 1,
                position: "absolute",
                bottom: 5,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </View>

          <View style={{ alignItems: "center", gap: 20 }}>
            <View style={{ alignItems: "center", gap: 5 }}>
              <IconBox width={80} height={80} />
              <Text style={[texts.subtitle1, { color: colors.white }]}>
                {user ? user.nameUser : "Dado não encontrado."}
              </Text>
              <Text style={[texts.legend, { color: colors.gray }]}>
                Ingressou em {date ? date : "Dado não encontrado."}
              </Text>
            </View>

            <View style={s.qrCodeBox}>
              <FontAwesome6 name="qrcode" size={54} color={colors.gray} />
            </View>
          </View>

          <View style={{ width: "80%", alignItems: "center", gap: 10 }}>
            <Button
              title="Alteral Perfil"
              titleC={colors.white}
              width={"100%"}
              borderW={2}
              borderR={20}
              borderC={colors.white}
            />
            <Button
              title="Sair"
              titleC={colors.red}
              width={"100%"}
              borderW={2}
              borderR={20}
              borderC={colors.red}
              onPress={() => handleLogout()}
            />
          </View>
        </View>

        <View
          style={{
            margin: 15,
            alignItems: "center",
            bottom: 0,
            position: "absolute",
          }}
        >
          <Text
            style={[texts.legend, { color: colors.gray, textAlign: "center" }]}
          >
            Este crachá é sua identificação e deve ser apresentado sempre que
            for acessar uma sessão. Ele garante seu acesso e confirma sua
            autenticação como usuário.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    backgroundColor: colors.bgContainer,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: colors.darkGray,
    padding: 20,
    width: "75%",
    elevation: 20,
  },

  qrCodeBox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.darkGray,
    padding: 20,
  },
});
