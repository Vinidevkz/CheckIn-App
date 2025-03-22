import { useState, useEffect } from 'react'
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native'

//styles
import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

//components
import Header from '@/src/components/header'
import Input from '@/src/components/input'
import Button from '@/src/components/button'
import { FontAwesome } from '@expo/vector-icons'

//services
import MovieURLs from '@/src/services/urls/movieUrls'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Movies(){

    const [token, setToken] = useState<string>("")

    useEffect(() => {
        const getToken = async () => {
            const tokenStr = await AsyncStorage.getItem("token")

            if (tokenStr) {
                setToken(tokenStr)
                console.log("Token do usuário:", tokenStr)
            } else {
                console.log("Nenhum token encontrado.")
            }

        }

        const getLatestMovies = async () => {
            const url = MovieURLs.latest

            try {
                const response = axios.get(url,)
            } catch (error) {
                
            }
        }
        console.log("Token do usuario: ", token)
        getToken
    }, [])

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <Header
                element1={(
                    <View style={{width: '80%'}}>
                        <Input
                            placeholder='Pesquise por filmes'
                            height={50}
                            paddingH={10}
                            paddingV={0}
                        />
                    </View>
                )}
                element3={(
                    <Button
                        icon='search'
                        iconLib={FontAwesome}
                        iconC={colors.background}
                        width={50}
                        height={50}
                        borderR={15}
                        bgColor={colors.white}
                    />
                )}
            />

            <View style={s.titleCont}>
                <Text style={[texts.subtitle1, {color: colors.white}]}>Lançamentos:</Text>
            </View>

            <FlatList

            />
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    titleCont: {
        margin: 15
    },
    movieCont: {

    }
})