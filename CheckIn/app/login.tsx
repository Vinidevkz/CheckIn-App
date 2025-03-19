import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert
} from "react-native";

import { Feather } from "@expo/vector-icons";
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";

import { useRouter } from "expo-router";

//components
import Input from "@/src/components/input";
import Header from "@/src/components/header";
import Button from "@/src/components/button";
import Loading from "@/src/components/loading";

//services
import UserURLs from "@/src/services/urls/userUrls";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {

  const route = useRouter();

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true)
    const url = UserURLs.login

    if (!email || !password) {
      Alert.alert("Campos de Email e Senha obrigatórios.", "Preencha todos os campos.")
      setIsLoading(false)
    }else{
      axios.post(url, {
        emailUser: email,
        passwordUser: password
      })
      .then((response) => {
        const {user, token} = response.data

        AsyncStorage.setItem("user", JSON.stringify(user)),
        AsyncStorage.setItem("token", JSON.stringify(token)),
        route.replace("/(tabs)"),
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)

        if(error.response){
          Alert.alert("Erro ao fazer login", "Email ou senha incorretos.")
          console.log("Erro do servidor:", error.response.data);
          console.log("Mensagem:", error.response.data.message);
          console.log("Detalhes:", error.response.data.details);
        }else if (error.request){
          Alert.alert(
              "Erro de rede ou servidor inativo",
              "Verifique sua conexão com a internet e tente mais tarde."
          ),
          console.log("Erro de rede ou servidor inativo:", error.request);
        }else{
          Alert.alert(
            "Erro ao se cadastrar.",
            "Houve um erro ao tenta realizar o cadastro. Tente novamente mais tarde."
          ),
            console.log("Erro inesperado:", error.message);
        }
        setIsLoading(true)
      })
    }



    
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Loading isLoading={isLoading} />
      <Header
        element1={
          <View>
            <Button
              icon="arrow-left"
              iconLib={Feather}
              iconSize={15}
              width={50}
              height={50}
              borderW={1}
              borderC={colors.gray}
              borderR={15}
              onPress={() => route.back()}
            />
          </View>
        }
        element3={
          <Text style={[texts.subtitle1, { color: colors.white }]}>Login</Text>
        }
      />

      <ScrollView>
        <View style={s.container}>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Email:
            </Text>
            <Input maxLen={50} onChange={(text) => setEmail(text)}/>
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Senha:
            </Text>
            <Input maxLen={50} security={true} onChange={(text) => setPassword(text)} />
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 15 }}>
        <Button
          title="Fazer Login"
          bgColor={colors.white} borderR={10}
          onPress={() => handleLogin()}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    margin: 15,
    gap: 10,
  },

  inputCont: {
    margin: 5
  },
});
