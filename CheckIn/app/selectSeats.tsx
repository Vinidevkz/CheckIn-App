import { useState, useEffect } from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import { useRouter } from 'expo-router'
import { Feather } from "@expo/vector-icons";

//styles
import colors from '@/src/styles/colors'
import texts from '@/src/styles/texts'

//components
import Button from '@/src/components/button'
import Header from '@/src/components/header'

//services
import SeatURLs from '@/src/services/urls/seatUrls';
import axios from 'axios';

export default function selectSeats(){
    const route = useRouter()

    const [seats, setSeats] = useState()

    useEffect(() => {
        const getSeats = async () => {
            const url = SeatURLs.getSeats

            try {
                axios.post(url, {
                    headers: 
                })
            } catch (error) {
                
            }
        }
    })

    return(
        <SafeAreaView style={s.safeArea}>
            <Header
                element1={(
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
                )}
                    element3={(
                        <Text style={[texts.subtitle1, {color: colors.white}]}>Selecione o seu assento</Text>
                )}
            />

            <View style={s.container}>
                <Text style={[texts.subtitle2, {color: colors.white}]}>Ver Sessões para: </Text>
                <Text style={[texts.text, {color: colors.white}]}>Nome do cinema: </Text>
                <Text style={[texts.text, {color: colors.white}]}>Localização: </Text>
                <Text style={[texts.text, {color: colors.white}]}>Horário: </Text>
                <Text style={[texts.text, {color: colors.white}]}>Valor do ingresso: </Text>
            </View>

            <View style={{}}>
                <FlatList
                    
                />
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.background,
        flex: 1,
    },

    container: {
        width: '90%',
        alignItems: 'center',
        padding: 10,
        gap: 10
    }
})