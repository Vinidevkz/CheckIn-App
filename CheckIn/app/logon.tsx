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

import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";

import { useRouter } from "expo-router";

//components
import Input from "@/src/components/input";
import Header from "@/src/components/header";
import Button from "@/src/components/button";
import Loading from "@/src/components/loading";
import IconBox from "@/src/components/iconBox";

//urls
import axios from "axios";
import UserURLs from "@/src/services/urls/userUrls";

//storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logon() {
  const route = useRouter();

  const [iconImg, setIconImg] = useState<string>("");
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

  const pickImage = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync()

    if(status !== "granted"){
      Alert.alert("Aviso", "Permissão negada.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled){
      console.log("Url da Imagem:", iconImg)
      setIconImg(result.assets[0].uri)
    }
  };

  const userRegister = async () => {
    const url = UserURLs.logon;

    if (!nameUser || !emailUser || !passwordUser || !cpfUser || !ageUser) {
      Alert.alert("Campos obrigatórios.", "Preencha todos os campos.");
    }

    setIsLoading(true)
    try {
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

          AsyncStorage.setItem("user", JSON.stringify(newUser)),
          AsyncStorage.setItem("token", JSON.stringify(token)),
          route.replace("/(tabs)"),
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
              "Verifique sua conexão com a internet e tente mais tarde."
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
    } catch (error) {
      Alert.alert("Houve um erro ao se cadastrar.", "Tente novamente mais tarde.")
      console.log("Erro no cadastro: ", error)
    } finally {
      setIsLoading(false)
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
          <Text style={[texts.subtitle1, { color: colors.white }]}>
            Cadastro
          </Text>
        }
      />
      <Loading isLoading={isLoading} />
      <ScrollView>
        <View style={s.container}>
          <View style={s.imageIconCont}>
            <View>
              <Text style={[texts.subtitle1, {color: colors.white}]}>Foto de Perfil:</Text>
              <Text style={[texts.legend, {color: colors.gray}]}>Selecione uma foto para o seu perfil.</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
              <IconBox
                image={iconImg}
                width={80}
                height={80}
              />
            </TouchableOpacity>
          </View>
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

  imageIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },

  inputCont: {
    margin: 5
  },
});
