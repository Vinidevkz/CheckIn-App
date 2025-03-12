import {SafeAreaView, ScrollView, StyleSheet, StatusBar, View, Text} from 'react-native'

import { Feather } from "@expo/vector-icons";
import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

import { useRouter } from "expo-router";

//components
import Input from '@/src/components/input'
import Header from '@/src/components/header'
import Button from '@/src/components/button'

export default function Logon(){

    const route = useRouter()

    return(
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1}}>
            <Header
                element1={(
                        <View>
                            <Button
                                icon='arrow-left'
                                iconLib={Feather}
                                bgColor=''
                                borderW={1}
                                borderC={colors.gray}
                                borderR={15}
                                onPress={() => route.back()}
                            />
                        </View>
                )}
                element2={(
                    <Text style={[texts.subtitle2, {color: colors.white}]}>Cadastro</Text>
                )}
            />
            <ScrollView>
                <Text>logon</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {

    }
})