
import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabIcon = ({source, focused}: {source: ImageSourcePropType, focused: boolean }) => (
  <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "": ""}`}>
    <View className={`rounded-full w-12 h-12 items-center justify-center mb-5 ${focused ? "bg-general-400" : ""}`}>
      <Image source={source} tintColor={"while"} resizeMode='contain' className='w-7 h-7'/>
    </View>
  </View>
)

const Layout = () => {
  return (
    <Tabs 
    initialRouteName='home' 
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingBottom: 0,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 30,
        height: 78,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
      },
    }}>
      <Tabs.Screen name='home' options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }} />
      <Tabs.Screen name='rides' options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }} />
      <Tabs.Screen name='chat' options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }} />
      <Tabs.Screen name='profile' options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.person} />
        ),
      }} />

    </Tabs>
  )
}

export default Layout;

