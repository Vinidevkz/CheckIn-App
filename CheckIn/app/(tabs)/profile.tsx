import { useState, useEffect } from 'react';
import {View, Text, Pressable, SafeAreaView, StyleSheet, Alert} from 'react-native'
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'

//styles
import texts from '@/src/styles/texts';
import colors from '@/src/styles/colors';
import {FontAwesome6} from '@expo/vector-icons'
//components
import IconBox from '@/src/components/iconBox';
import Button from '@/src/components/button';

export default function Profile(){

    const [user, setUser] = useState<{ [key: string]: any } | null>(null)
    const [date, setDate] = useState<string>("")

    useEffect(() => {
        const getUserData = async () => {
            const data = await AsyncStorage.getItem('user')

            if (data !== null) {
                const userData = JSON.parse(data)
                console.log(userData)
                setUser(userData);
              } else {
                console.log('Nenhum dado encontrado no AsyncStorage.');
                setUser(null)
              }
        }

        const date = new Date(user ? user.createdAt : null)

        const dateFormat = date.toLocaleDateString("pt-br", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })

        if(dateFormat !== null){
            setDate(dateFormat)
        }else{
            console.log("Houve um erro ao formatar a data.")
        }


        getUserData()
    }, [])

    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert("Sair de sua conta", "Deseja sair da sua conta?", [
            {
                text: 'Sim',
                onPress: async () => {
                    try {
            
                        await AsyncStorage.removeItem('user')
                        await AsyncStorage.removeItem('token')
                        router.replace('/logon')
                    } catch (error) {
                        console.log("Erro ao fazer logout: ", error)
                    }
                }
            },
            {
                text: 'Não',
                onPress: () => null,
            }
        ])

    }

    return(
        <SafeAreaView style={s.safeArea}>
            <View style={s.cardContainer}>

                <View style={{borderWidth: 3, borderRadius: 50, borderColor: colors.darkGray, padding: 15, alignItems: 'center'}}>
                    <View style={{width: 20, height: 150, backgroundColor: colors.gray, zIndex: 1, position: 'absolute', bottom: 5, borderBottomRightRadius: 10, borderBottomLeftRadius: 10,}}/>
                </View>



                <View style={{alignItems: 'center', gap: 50}}>
                    <View style={{alignItems: 'center'}}>
                        <IconBox
                            width={80}
                            height={80}
                        />
                        <Text style={[texts.subtitle1, {color: colors.white}]}>{user ? user.nameUser : "Dado não encontrado."}</Text>
                        <Text style={[texts.legend, {color: colors.gray}]}>Ingressou em {date ? date : "Dado não encontrado."}</Text>
                    </View>

                    <View style={s.qrCodeBox}>
                        <FontAwesome6 name="qrcode" size={54} color={colors.gray} />
                    </View>
                </View>

                <Button
                    title='Sair da conta'
                    titleC={colors.red}
                    width={'80%'}
                    borderW={2}
                    borderR={20}
                    borderC={colors.red}
                    onPress={() => handleLogout()}
                />
            </View>

            <View style={{margin: 15, alignItems: 'center', bottom: 0, position: 'absolute'}}>
                <Text style={[texts.legend, {color: colors.gray, textAlign: 'center'}]}>Este crachá deverá ser utilizado quando for entrar em alguma sessão, como forma de identificação de usuário.</Text>
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },

    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: colors.darkGray,
        padding: 20,
        width: '70%',
        elevation: 20
    },

    qrCodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.darkGray,
        padding: 20,
    }
})