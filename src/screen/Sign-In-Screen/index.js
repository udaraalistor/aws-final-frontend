import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Image, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import HeadlineComponent from '../../component/Headline-Component';
import HeadlineSubComponent from '../../component/Sub-Headline-Component';
import ImageComponent from '../../component/Image-Component';
import TxtInput from '../../component/TxtInput';
import BtnComponent from '../../component/Btn-Component';
import Service from '../../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageStrings } from '../../constance/StorageStrings';
class App extends Component {

    state = {
        username: '',
        password: ''

    };


    componentDidMount() {
    }

    callServiceFunc = async () => {
        const data = {
            username: this.state.username,
            password: this.state.password,

        };
        await Service.signin(data)
            .then(async (response) => {
                if (response.responseCode === 2000) {
                    this.props.navigation.navigate({ routeName: 'BottomNavigator' });
                    let token = response.token;
                    await AsyncStorage.setItem(StorageStrings.USERTOKEN, token);
                    await AsyncStorage.setItem(StorageStrings.ISLOGIN, '1');

                } else {
                    ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
                }
            });
    };

    signupHandler = () => {
        this.props.navigation.navigate({ routeName: 'SignUpScreen' });
    }

    homeHandler = () => {
        this.props.navigation.navigate({ routeName: 'HomeScreen' });
    }

    testValidator = () => {
        if (this.state.username.trim() === '') {
            ToastAndroid.show("Username can't be empty", ToastAndroid.SHORT);
            return false;
        } else {
            if (this.state.password.trim() === '') {
                ToastAndroid.show("Password can't be empty", ToastAndroid.SHORT);
                return false;
            } else {
                return true;
            }
        }
    };

    checkValidation = () => {
        let formvalidation = this.testValidator();
        if (formvalidation) {
            this.callServiceFunc();
        }
    };

    render() {
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={{ paddingLeft: 30, paddingRight: 30, height: '100%' }}>

                    <View>
                        <HeadlineComponent>
                            <Text>
                                Welcome to Instagram
                    </Text>
                        </HeadlineComponent>
                        <HeadlineSubComponent>
                            <Text>
                                Sign in to continue
                    </Text>
                        </HeadlineSubComponent>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <ImageComponent style={{ width: 267, height: 197 }} source={require('../../assets/img/siginicon.png')}></ImageComponent>
                    </View>

                    <View>
                        <TxtInput
                            style={{ width: 20, height: 15 }}
                            source={require('../../assets/icon/email.png')}
                            placeholder={"Username"}
                            value={this.state.username}
                            onChangeText={(value) => {
                                this.setState({
                                    username: value.trim()
                                });
                            }}

                        >
                        </TxtInput>
                        <TxtInput
                            style={{ width: 20, height: 20 }}
                            source={require('../../assets/icon/password.png')}
                            placeholder={"Password"}
                            value={this.state.password}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value.trim()
                                });
                            }}
                        ></TxtInput>
                    </View>

                    <View style={{ marginTop: 30, marginBottom: 30 }}>
                        <BtnComponent onPress={this.checkValidation}>
                            <Text>Sign In</Text>
                        </BtnComponent>
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <Text style={{ color: '#9098B1', fontSize: 14, textAlign: 'center' }}>OR</Text>
                        <Text style={{ color: '#40BFFF', fontSize: 12, textAlign: 'center', marginTop: 20 }}>Forgot Password?</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#9098B1', fontSize: 12, textAlign: 'center' }}>Don't have a account?</Text>
                            <TouchableOpacity onPress={this.signupHandler}>
                                <Text style={{ color: '#40BFFF', fontSize: 12, textAlign: 'center' }}>  Register</Text>
                            </TouchableOpacity>
                        </View>
                        <Text></Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
};


export default App;
