import React from 'react'
import {Text, TouchableOpacity, TouchableOpacityProps, DimensionValue, ActivityIndicator} from 'react-native'

import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface ButtonProps {
    title?: string,
    titleC?: string,
    icon?: string,
    iconLib?: any,
    width?: DimensionValue,
    bgColor?: string,
    borderW?: number,
    borderR?: number,
    borderC?: string,
    isLoading?: boolean,
    onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({title, titleC, width = '100%', icon, iconLib: IconLib, bgColor, borderW, borderR, borderC, onPress, isLoading, ...rest}) => {
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width, backgroundColor: bgColor, borderWidth: borderW, borderRadius: borderR, borderColor: borderC, alignItems: 'center', justifyContent: 'center', padding: 15}}
            {...rest}
            onPress={onPress}
        >

            {isLoading ? (
                <ActivityIndicator size={'small'} color={colors.gray}/>
            ) : title ? (
                <Text style={[texts.text,{ color: titleC}]}>
                {title}
                </Text>
            ) : IconLib && icon ? (
                <IconLib name={icon} size={20} color="#f4f4f4" />
            ) : null}



        </TouchableOpacity>
    )
}

export default Button