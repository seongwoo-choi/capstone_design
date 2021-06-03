import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { ApplyList, Home} from "../screens"
import s3  from "../screens/s3";
import VideoScreen from "../screens/VideoScreen"
import { COLORS, icons } from "../constants"
import List from "../screens/ApplyList" //신청리스트 추가
import Profile from "../screens/Profile"

import { TabIcon } from "../components"
import { useState } from "react";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    const [test, settest] = useState('test')
    const [loginINFO, setloginINFO] = useState(null)
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: COLORS.black,
                    borderTopColor: "transparent",
                    height: 100
                }
            }}
        >
            <Tab.Screen
                name="Home"
                children={({navigation}) => <Home loginINFO = {loginINFO}  navigation = {navigation} setloginINFO = {setloginINFO}/>}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                        />
                    )
                }}
            />
            {/* <Tab.Screen
                name="Upload"
                component={s3}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.upload}
                        />
                    )
                }}
            /> */}
            <Tab.Screen
                name="Search"
                component={VideoScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                children={({navigation}) => <Profile loginINFO = {loginINFO}  navigation = {navigation} setloginINFO = {setloginINFO} />}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.profile}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;