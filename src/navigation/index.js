import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import SplashScreen from '../screen/Splash-Screen';
import SignInScreen from '../screen/Sign-In-Screen';
import SignUpScreen from '../screen/Sign-Up-Screen';
import HomeScreen from '../screen/Home';
import PhotoUploadScreen from '../screen/Photo-Upload-Screen';

import ActiveHome from '../assets/img/Home.png';
import Inactivesearch from '../assets/img/Search.png';
import Inactiveprofile from '../assets/img/Profile.png';
import {
    Image,
} from 'react-native';

const BottomNavigator = createMaterialBottomTabNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            activeColor: '#40BFFF',
            inactiveColor: '#000000',
            tabBarColor: '#FFFFFF',
            tabBarLabel: false,
            showLabel: false,
            barStyle: { backgroundColor: '#FFFFFF' },
            tabBarIcon: ({ color, focused }) => (
                <Image style={{ overflow: 'hidden', resizeMode: 'cover', width: 20, height: 20 }} resizeMode='cover' source={focused ? ActiveHome : ActiveHome} />
            )
        },
        tabBarOptions: {
            showLabel: false
        }
    },

    Search: {
        screen: HomeScreen,
        navigationOptions: {
            activeColor: '#000000',
            inactiveColor: '#000000',
            tabBarColor: '#FFFFFF',
            barStyle: { backgroundColor: '#FFFFFF' },
            tabBarIcon: ({ color, focused }) => (
                <Image style={{ overflow: 'hidden', resizeMode: 'cover', width: 20, height: 20 }} resizeMode='cover' source={focused ? Inactivesearch : Inactivesearch} />
            )
        },
        tabBarOptions: {
            showLabel: false
        }
    },
    Profile: {
        screen: HomeScreen,
        navigationOptions: {
            activeColor: '#000000',
            inactiveColor: '#000000',
            tabBarColor: '#FFFFFF',
            barStyle: { backgroundColor: '#FFFFFF' },
            tabBarIcon: ({ color, focused }) => (
                <Image style={{ overflow: 'hidden', resizeMode: 'cover', width: 20, height: 20 }} resizeMode='cover' source={focused ? Inactiveprofile : Inactiveprofile} />
            )
        },
        tabBarOptions: {
            showLabel: false
        }
    },
}, {
    tabBarOptions: {
        showLabel: false
    }
});

const Navigation = createStackNavigator({
    SplashScreen: SplashScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    BottomNavigator: BottomNavigator,
    HomeScreen: HomeScreen,
    PhotoUploadScreen: PhotoUploadScreen
},
    {
        headerMode: 'none',

    },
);


const App = createAppContainer(Navigation);

export default (App);
