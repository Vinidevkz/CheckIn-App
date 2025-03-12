import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import texts from "@/src/styles/texts";
import colors from "@/src/styles/colors";

import { useRouter } from "expo-router";

//components
import Input from "@/src/components/input";
import Header from "@/src/components/header";
import Button from "@/src/components/button";

export default function Logon() {
  const route = useRouter();

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
        element2={
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
            <Input maxLen={50} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Email:
            </Text>
            <Input maxLen={50} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Senha:
            </Text>
            <Input maxLen={50} security={true} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>CPF:</Text>
            <Input maxLen={14} />
          </View>
          <View style={s.inputCont}>
            <Text style={[texts.subtitle2, { color: colors.white }]}>
              Idade:
            </Text>
            <Input maxLen={10} />
          </View>
        </View>
      </ScrollView>
      <View style={{ margin: 15 }}>
        <Button
          title="Finalizar Cadastro"
          bgColor={colors.white}
          borderR={10}
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
