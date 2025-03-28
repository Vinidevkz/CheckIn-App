import React from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
const marginTopValue = StatusBar.currentHeight || 0

import colors from '@/src/styles/colors'



interface HeaderProps {
    element1?: any,
    element2?: any,
    element3?: any,
}

const Header: React.FC<HeaderProps> = ({element1, element2, element3, ...rest}) => {
    return(
        <View style={s.container}>
            {element1}
            {element2}
            {element3}
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        paddingTop: marginTopValue + 10,
        flexDirection: 'row',
        height: 100,
        backgroundColor: colors.bgContainer,
        elevation: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,

    }
})

export default Header