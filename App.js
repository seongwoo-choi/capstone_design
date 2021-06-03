import React from "react";
import { ApplyList, YoutuberDetail } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import s3 from "./screens/s3";
import Apply from './screens/Apply'
import VideoScreen from "./screens/VideoScreen";
import CelebrityDetail from "./screens/CelebrityDetail"
import ApplyDetails from "./screens/ApplyDetails"
import { useState } from "react/cjs/react.development";
import { View, Text,StyleSheet, TextInput } from "react-native";
import {youtubers,dummyData,COLORS,SIZES,FONTS,icons,images,} from "./constants";

const Stack = createStackNavigator();

const App = () => {


  return (
    
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />

        <Stack.Screen name="s3" component={s3} />

        <Stack.Screen name="Apply" component={Apply} />

        <Stack.Screen name="YoutuberDetail" component={YoutuberDetail} />

        <Stack.Screen name="CelebrityDetail" component={CelebrityDetail} />

        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="ApplyList" component={ApplyList} />
        <Stack.Screen name="ApplyDetails" component={ApplyDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 66,
    color: COLORS.white,
    ...FONTS.h1,
  },
  formStyle: {
    margin: 16,
    color: COLORS.white,
    ...FONTS.h2,
  },
  formContents: {
    color: COLORS.black,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    width: 330,
    paddingTop: 10,
    padding: 13,
  },
  formSubmit: {
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
    ...FONTS.h2,
    paddingTop: 10,
    padding: 13,
    marginTop: 30,
  },
});


export default App;
