import React, { useState, useEffect } from 'react';
import {View, ActivityIndicator} from 'react-native'

import { Stack } from 'expo-router';

import Colors from '@/src/styles/colors'

import {
  useFonts,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

export default function RootLayoutNav() {

  let [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
  });

  if(!fontsLoaded){
    return(
      <View style={{flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={Colors.white}/>
      </View>
    )

  }

  return (
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="logon" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}


