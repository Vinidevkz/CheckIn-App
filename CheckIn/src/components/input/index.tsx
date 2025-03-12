import React from 'react'
import {View, TextInput, DimensionValue, StyleSheet} from 'react-native'

import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface InputProps {
    onChange?: () => void
}

const Input: React.FC<InputProps> = ({onChange, ...rest}) => {
    return(
        <View style={s.container}>
            <TextInput
                style={[texts.text,{flex: 1}]}
                {...rest}
                onChangeText={onChange}
            />  
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 5,
        width: '100%'
    }
})

export default Input