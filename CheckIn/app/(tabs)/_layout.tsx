import React from 'react';

import { Link, Tabs } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f4f4f4',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Octicons name="code" color={color} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Octicons name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
