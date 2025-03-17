import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

//styles
import colors from "@/src/styles/colors";
import texts from "@/src/styles/texts";
import { Entypo, FontAwesome6, AntDesign } from "@expo/vector-icons";

//components
import Button from "@/src/components/button";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '@/src/contexts/userContext';
import { AuthProvider } from '@/src/contexts/userContext';



export default function Index() {
  
  const openLinkGitHub = () => {
    const link = "https://github.com/Vinidevkz";
    Linking.openURL(link).catch((err) => {
      Alert.alert(
        "Erro ao abrir o link",
        "Verifique sua conexão com a internet e tente novamente."
      );
    });
  };
  const openLinkX = () => {
    const link = "https://x.com/vinidevkz";
    Linking.openURL(link).catch((err) => {
      Alert.alert(
        "Erro ao abrir o link",
        "Verifique sua conexão com a internet e tente novamente."
      );
    });
  };
  const openLinkLinkedIn = () => {
    const link = "https://www.linkedin.com/in/vinicius-eduardo2024/";
    Linking.openURL(link).catch((err) => {
      Alert.alert(
        "Erro ao abrir o link",
        "Verifique sua conexão com a internet e tente novamente."
      );
    });
  };

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data !== null) {
          const userData = JSON.parse(data);
          router.replace('/(tabs)'); 
        } else {
          router.push('/'); 
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log('Erro ao verificar usuário:', error);
        setIsLoading(false);
      }
    };
  
    checkUser();
  }, []);


  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={colors.white} />
      </View>
    );
  }else{
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <ImageBackground
          source={require("@/src/img/cinemabg.jpg")}
          resizeMode="cover"
          style={s.Background}
          imageStyle={{ opacity: 0.2 }}
        >
          <View style={s.container}>
            <Image
              source={require("@/src/img/logo.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "30%" }}
            />
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              o próximo nível do cinema.
            </Text>
          </View>
  
          <View style={s.container}>
            <Button
              title="Cadastre-se"
              titleC={colors.white}
              bgColor=""
              borderW={2}
              borderR={20}
              borderC={colors.white}
              onPress={() => router.push("/logon")}
            />
            <Button
              title="Login"
              titleC={colors.fullBlack}
              bgColor={colors.white}
              borderW={2}
              borderR={20}
              borderC={colors.white}
              onPress={() => router.push("/login")}
            />
  
            <View style={s.container}>
              <Text
                style={[
                  texts.legend,
                  { color: colors.white, textAlign: "center" },
                ]}
              >
                Vinicius Eduardo 2025. Todos os direitos reservados.
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={openLinkGitHub}
                >
                  <Entypo name="github" size={24} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={openLinkX}
                >
                  <FontAwesome6 name="x-twitter" size={24} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center", justifyContent: "center" }}
                  onPress={openLinkLinkedIn}
                >
                  <AntDesign
                    name="linkedin-square"
                    size={24}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
  );
  }



}

const s = StyleSheet.create({
  Background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  container: {
    margin: 10,
    gap: 15,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
