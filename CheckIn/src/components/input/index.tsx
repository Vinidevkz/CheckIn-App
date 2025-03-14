import React from 'react'
import {View, TouchableOpacity, TextInput, DimensionValue, StyleSheet} from 'react-native'
import { useState } from 'react'

import {Octicons} from '@expo/vector-icons'
import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface InputProps {
    maxLen?: number,
    security?: boolean,
    onChange?: (text: string) => void
}

const Input: React.FC<InputProps> = ({maxLen, security = false, onChange, ...rest}) => {

    const [isVisible, setIsVisible] = useState(security)

    return(
        <View style={s.container}>
            <TextInput
                style={[texts.text,{flex: 1, color: colors.white}]}
                {...rest}
                maxLength={maxLen}
                secureTextEntry={isVisible}
                onChangeText={onChange}
            />

            {security ? (
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{ margin: 10 }}>
                    <Octicons name={isVisible ? "eye" : "eye-closed"} size={24} color={colors.white} />
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    }
})

export default Input