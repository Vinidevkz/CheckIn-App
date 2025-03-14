import React from "react";

import { Tabs } from "expo-router";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "@/src/styles/colors";
import texts from "@/src/styles/texts";

export default function TabLayout() {

  let iconSize = 20

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f4f4f4",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgContainer,
          height: 70,
          borderTopWidth: 0,
          elevation: 20,
          paddingTop: 10,
          paddingBottom: 10
        },
        tabBarLabelStyle: {
          fontFamily: texts.text.fontFamily,
          fontSize: texts.text.fontSize
        },
        tabBarIconStyle: {
          fontSize: 20
        }
      }}
      
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
          headerShown: false,
          tabBarIcon: ({ color }) => <Octicons name="home" color={color} size={iconSize}  />,
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Filmes",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="movie" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="cinemas"
        options={{
          title: "Cinemas",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="movie-roll" color={color} size={iconSize}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => <Octicons name="person" color={color} size={iconSize}/>,
        }}
      />
    </Tabs>
  );
}
