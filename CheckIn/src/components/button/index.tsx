import React from 'react'
import {Text, TouchableOpacity, TouchableOpacityProps, DimensionValue} from 'react-native'

import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface ButtonProps {
    title: string,
    titleC: string,
    width?: DimensionValue,
    bgColor: string,
    borderW: number,
    borderR: number,
    borderC: string,
    onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({title, titleC, width = '100%', bgColor, borderW, borderR, borderC, ...rest}) => {
    return(
        <TouchableOpacity
            activeOpacity={0.5}
            style={{width: width, backgroundColor: bgColor, borderWidth: borderW, borderRadius: borderR, borderColor: borderC, alignItems: 'center', justifyContent: 'center', padding: 15}}
            {...rest}
        >
            <Text style={[texts.text,{ color: titleC}]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button