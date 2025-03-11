import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native'

import colors from '@/src/styles/colors'
import texts from '@/src/styles/texts'

export default function Index(){
    return(
        <SafeAreaView style={s.SafeAreaView}>
            <View style={s.container}>
                <Image
                    source={require('@/src/img/logo.png')}
                    resizeMode='contain'
                    style={{width: '100%', height: '30%'}}
                />
            <Text style={{color: colors.white, fontFamily: 'Poppins_500Medium', fontSize: texts.subtitle2}}>o próximo nível do cinema.</Text>
            </View>

        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    SafeAreaView: {
        backgroundColor: colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        margin: 10,
        gap: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})