import { useState } from 'react'

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";

import { useRouter } from "expo-router";

//components
import Input from "@/src/components/input";
import Header from "@/src/components/header";
import Button from "@/src/components/button";

//urls
import axios from "axios";
import UserURLs from "@/src/services/urls/userUrls";

//storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logon() {

  const route = useRouter();

  const [nameUser, setNameUser] = useState<string>("")
  const [emailUser, setEmailUser] = useState<string>("")
  const [passwordUser, setPasswordUser] = useState<string>("")
  const [cpfUser, setCpfUser] = useState<string>("")
  const [ageUser, setAgeUser] = useState<string>("")

  const [isLoading, setIsLoading] = useState(false)

  const userRegister = () => {
    const url = UserURLs.logon

    if(!nameUser || !emailUser || !passwordUser || !cpfUser || !ageUser){
      Alert.alert("Campos obrigatórios.", "Preencha todos os campos.")
    }

      axios.post(url, {
        nameUser: nameUser,
        emailUser: emailUser,
        passwordUser: passwordUser,
        cpfUser: cpfUser,
        dataNasc: ageUser
      })
      .then(response => {
        const {newUser, token} = response.data;

        setIsLoading(true),
        AsyncStorage.setItem('user', newUser.toString()),
        AsyncStorage.setItem('token', token.toString()),
        route.push('/(tabs)'),
        setIsLoading(false)
      }

      )
      .catch(error => (
        Alert.alert("Erro ao se cadastrar.", "Houve um erro ao tenta realizar o cadastro. Tente novamente mais tarde."),
        console.log('Erro: ', error)
      ))

  }

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
      <ScrollView>
        <View style={s.container}>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Nome:
            </Text>
            <Input maxLen={50} onChange={(text) => setNameUser(text ?? "")}/>
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Email:
            </Text>
            <Input maxLen={50} onChange={(text) => setEmailUser(text ?? "")}/>
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Senha:
            </Text>
            <Input maxLen={50} security={true} onChange={(text) => setPasswordUser(text ?? "")}/>
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>CPF:</Text>
            <Input maxLen={14} onChange={(text) => setCpfUser(text ?? "")}/>
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Idade:
            </Text>
            <Input maxLen={10} onChange={(text) => setAgeUser(text ?? "")}/>
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 15 }}>
        <Button
          title="Finalizar Cadastro"
          bgColor={colors.white}
          borderR={10}
          onPress={() => userRegister()}
        />
        <TouchableOpacity style={{alignSelf: 'center', backgroundColor: 'red', borderRadius: 20, width: 150, alignItems: 'center', justifyContent: 'center', padding: 20}} onPress={() => route.push('/(tabs)')}>
          <Text style={texts.subtitle1}>HOME</Text>
        </TouchableOpacity>
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
