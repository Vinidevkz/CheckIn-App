import React, { useState, useEffect } from 'react';
import {View, ActivityIndicator} from 'react-native'

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import Colors from '@/src/styles/colors'

import 'react-native-reanimated';

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
    <View style={{}}>
      <ActivityIndicator size={'large'} color={Colors.white}/>
    </View>
  }

  return (

      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

  );
}


