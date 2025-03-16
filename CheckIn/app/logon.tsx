import { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
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

//urls
import axios from "axios";
import UserURLs from "@/src/services/urls/userUrls";

//storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logon() {
  const route = useRouter();

  const [nameUser, setNameUser] = useState<string>("");
  const [emailUser, setEmailUser] = useState<string>("");
  const [passwordUser, setPasswordUser] = useState<string>("");
  const [cpfUser, setCpfUser] = useState<string>("");
  const [ageUser, setAgeUser] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const dateValidate = (data: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    const dataObj = new Date(year, month, day);
    const isValid =
      dataObj.getFullYear() === year &&
      dataObj.getMonth() === month &&
      dataObj.getDate() === day;

    return isValid;
  };

  const handleValidate = () => {
    let formattedDate = ageUser;
     
    if (/^\d{8}$/.test(ageUser)) {
      formattedDate = ageUser.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    }

    console.log("Data formatada:", formattedDate);

    if (!dateValidate(formattedDate)) {
      Alert.alert("Aviso!", "Insira uma data de nascimento válida.");
      return;
    }

    userRegister();
  };

  const userRegister = () => {
    const url = UserURLs.logon;

    if (!nameUser || !emailUser || !passwordUser || !cpfUser || !ageUser) {
      Alert.alert("Campos obrigatórios.", "Preencha todos os campos.");
    } else {
      setIsLoading(true),
        axios
          .post(url, {
            nameUser: nameUser,
            emailUser: emailUser,
            passwordUser: passwordUser,
            cpfUser: cpfUser,
            dataNasc: ageUser,
          })
          .then((response) => {
            const { newUser, token } = response.data;

            AsyncStorage.setItem("user", newUser.toString()),
              AsyncStorage.setItem("token", token.toString()),
              route.push("/(tabs)"),
              setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);

            if (error.response) {
              Alert.alert(
                "Erro ao se cadastrar.",
                "Verifique o email e o CPF, eles podem estar incorretos ou já cadastrados."
              ),
                console.log("Erro do servidor:", error.response.data);
              console.log("Mensagem:", error.response.data.message);
              console.log("Detalhes:", error.response.data.details);
            } else if (error.request) {
              Alert.alert(
                "Erro de rede ou servidor inativo",
                "Verifique sua conexão com a internet."
              ),
                console.log("Erro de rede ou servidor inativo:", error.request);
            } else {
              Alert.alert(
                "Erro ao se cadastrar.",
                "Houve um erro ao tenta realizar o cadastro. Tente novamente mais tarde."
              ),
                console.log("Erro inesperado:", error.message);
            }
          });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <Header
        element1={
          <View>
            <Button
              icon="arrow-left"
              iconLib={Feather}
              bgColor=""
              borderW={1}
              borderC={colors.gray}
              borderR={15}
              onPress={() => route.back()}
            />
          </View>
        }
        element3={
          <Text style={[texts.subtitle1, { color: colors.white }]}>
            Cadastro
          </Text>
        }
      />
      <Text style={{ color: colors.white }}>
        {cpfUser}, {ageUser}
      </Text>
      <Loading isLoading={isLoading} />
      <ScrollView>
        <View style={s.container}>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Nome:
            </Text>
            <Input maxLen={50} onChange={(text) => setNameUser(text ?? "")} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Email:
            </Text>
            <Input maxLen={50} onChange={(text) => setEmailUser(text ?? "")} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Senha:
            </Text>
            <Input
              maxLen={50}
              security={true}
              onChange={(text) => setPasswordUser(text ?? "")}
            />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>CPF:</Text>
            <Input
              maxLen={14}
              placeholder="999.999.999-99"
              mask="999.999.999-99"
              onChange={(text) => setCpfUser(text ?? "")}
            />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Idade:
            </Text>
            <Input
              maxLen={10}
              placeholder="01/01/2001"
              mask="99/99/9999"
              onChange={(text) => setAgeUser(text ?? "")}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 15 }}>
        <Button
          title="Finalizar Cadastro"
          bgColor={colors.white}
          borderR={10}
          onPress={handleValidate}
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

  inputCont: {},
});
