import AsyncStorage from '@react-native-async-storage/async-storage'
import {View, Text, Pressable} from 'react-native'
import { useRouter } from "expo-router";

export default function Profile(){

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('token')
            router.replace('/logon')
        } catch (error) {
            console.log("Erro ao fazer logout: ", error)
        }
    }

    return(
        <View>
            <Text>Tela de perfil</Text>
            <Pressable style={{borderWidth: 3, borderColor: 'red', padding: 20, marginTop: 50}} onPress={handleLogout}>
                <Text>Sair da conta</Text>
            </Pressable>
        </View>
    )
}