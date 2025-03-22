import React from 'react'
import {Text, TouchableOpacity, TouchableOpacityProps, DimensionValue, ActivityIndicator} from 'react-native'

import texts from '@/src/styles/texts'
import colors from '@/src/styles/colors'

interface ButtonProps {
    title?: string,
    titleC?: string,
    icon?: string,
    iconC?: any,
    iconSize?: number,
    iconLib?: any,
    width?: DimensionValue,
    height?: DimensionValue,
    padding?: number,
    bgColor?: string,
    borderW?: number,
    borderR?: number,
    borderC?: string,
    isLoading?: boolean,
    onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({title, titleC, width = '100%', height, padding = 15, icon, iconC, iconSize = 20, iconLib: IconLib, bgColor, borderW, borderR, borderC, onPress, isLoading, ...rest}) => {
    return(
        <TouchableOpacity
            activeOpacity={0.7}
            style={{width: width, height: height, backgroundColor: bgColor, borderWidth: borderW, borderRadius: borderR, borderColor: borderC, alignItems: 'center', justifyContent: 'center', padding: padding}}
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
                <IconLib name={icon} size={iconSize} color={iconC ? iconC : "#f4f4f4"} />
            ) : null}



        </TouchableOpacity>
    )
}

export default Button