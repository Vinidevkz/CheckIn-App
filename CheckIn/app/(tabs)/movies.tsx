import { useState, useEffect } from 'react'
import {View, Text, SafeAreaView, FlatList, StyleSheet, Alert, Image} from 'react-native'

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
    const [latestMovies, setLatestMovies] = useState()

    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        const getToken = async () => {
            const tokenStr = await AsyncStorage.getItem("token")

            if (tokenStr) {
                const tokenParsed = JSON.parse(tokenStr)
                setToken(tokenParsed)
                //console.log("Token do usuário:", tokenParsed)
            } else {
                console.log("Nenhum token encontrado.")
            }

        }

        const getLatestMovies = async () => {
            const url = MovieURLs.latest
            //console.log("URL da requisção: ", url)

            try {
                const response = await axios.post(url, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(async (response) => {
                    const  { movies } = response.data

                    setLatestMovies(movies)
                })
                .catch((error) => {
                    console.log("Houve um erro ao buscar os ultimos lançamentos.", error.response.data)
                    console.log("Mensagem:", error.response.data.message);
                    console.log("Detalhes:", error.response.data.details);
                })

                


            } catch (error) {
                
            }
        }
        getToken()
        getLatestMovies()
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
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={latestMovies}
                keyExtractor={(item) => item.idMovie.toString()}
                renderItem={({item}) => (
                    <View style={s.movieCont}>
                        <View style={s.posterCont}>
                            <Image
                                source={{uri: item.moviePoster}}
                                resizeMode='cover'
                                style={{width: '100%', height: '100%'}}
                            />
                        </View>

                        <View style={s.movieInfos}>
                         <Text style={[texts.subtitle1, {color: colors.white}]}>{item.titleMovie}</Text>
                         <Text style={[texts.legend, {color: colors.white, fontSize: 12}]}>{item.descMovie}</Text>
                         <View>
                            <Text style={[texts.legend, {color: colors.white, fontSize: 12}]}></Text>
                         </View>
                        </View>

                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    titleCont: {
        margin: 15
    },
    movieCont: {
        height: 400,
        width: 200,
        borderRadius: 15,
        elevation: 20,
        backgroundColor: colors.darkGray,
        alignItems: 'center',
        overflow: 'hidden'
    },
    posterCont: {
        width: '100%',
        height: 300
    },
    movieInfos: {

    }
})