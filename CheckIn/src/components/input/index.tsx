import React from 'react'
import {View, TouchableOpacity, TextInput, DimensionValue, StyleSheet} from 'react-native'
import { useState } from 'react'

import { MaskedTextInput } from 'react-native-mask-text';

import {Octicons} from '@expo/vector-icons'
import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface InputProps {
    maxLen?: number,
    security?: boolean,
    mask?: string,
    placeholder?: string,
    paddingH?: number,
    paddingV?: number,
    height?: number,
    onChange?: (text: string) => void
}

const Input: React.FC<InputProps> = ({maxLen, mask, height, paddingH, paddingV, placeholder, security = false, onChange, ...rest}) => {

    const [isVisible, setIsVisible] = useState(security)
    const [maskedValue, setMaskedValue] = useState('');

    return(
        <View style={[s.container, {height: height, paddingHorizontal: paddingH, paddingVertical: paddingV}]}>
        {mask ? (
            <MaskedTextInput
                mask={mask}
                style={[texts.text,{flex: 1, color: colors.white}]}
                value={maskedValue}
                placeholder={placeholder}
                placeholderTextColor={'#4f4f4f'}
                maxLength={maxLen}
                onChangeText={(text, rawText) => {
                    setMaskedValue(text);
                    if (onChange) onChange(rawText); 
                }}
                {...rest}
            />
        ) : (

            <TextInput
                style={[texts.text,{flex: 1, color: colors.white}]}
                {...rest}
                maxLength={maxLen}
                placeholder={placeholder}
                placeholderTextColor={'#4f4f4f'}
                secureTextEntry={isVisible}
                onChangeText={onChange}
            />


        
        )}

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