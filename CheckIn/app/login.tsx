import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native'

import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

//components
import Input from '@/src/components/input'
import Header from '@/src/components/header'

export default function Login(){
    return(
        <SafeAreaView>
            <Header
                element1={(
                    <View>

                    </View>
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