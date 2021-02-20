import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Image, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import HeadlineComponent from '../../component/Headline-Component';
import HeadlineSubComponent from '../../component/Sub-Headline-Component';
import ImageComponent from '../../component/Image-Component';
import TxtInput from '../../component/TxtInput';
import BtnComponent from '../../component/Btn-Component';
import Service from '../../services/auth';
class App extends Component {

    state = {
        email: '',
        fullname: '',
        mobilenumber: '',
        password: '',
        username: ''

    };


    componentDidMount() {
    }

    callServiceFunc = async () => {
        const data = {
            email: this.state.email,
            fullName: this.state.fullname,
            mobileNo: this.state.mobilenumber,
            password: this.state.password,
            username: this.state.username

        };
        await Service.signup(data)
            .then((response) => {
                if (response.responseCode === 2000) {
                    this.props.navigation.navigate({ routeName: 'SignInScreen' });
                } else {
                    ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
                }
            });
    };

    testValidator = () => {
        if (this.state.email.trim() === '') {
            ToastAndroid.show("Email can't be empty", ToastAndroid.SHORT);
            return false;
        } else {
            if (this.state.fullname.trim() === '') {
                ToastAndroid.show("Fullname can't be empty", ToastAndroid.SHORT);
                return false;
            } else {
                if (this.state.mobilenumber.trim() === '') {
                    ToastAndroid.show("Mobile Number can't be empty", ToastAndroid.SHORT);
                    return false;
                } else {
                    if (this.state.password.trim() === '') {
                        ToastAndroid.show("Password can't be empty", ToastAndroid.SHORT);
                        return false;
                    } else {
                        if (this.state.username.trim() === '') {
                            ToastAndroid.show("Username can't be empty", ToastAndroid.SHORT);
                            return false;
                        } else {
                            return true
                        }
                    }
                }
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
                                Let's Get Started
                    </Text>
                        </HeadlineComponent>
                        <HeadlineSubComponent>
                            <Text>
                                Create an new account
                    </Text>
                        </HeadlineSubComponent>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <ImageComponent style={{ width: 235, height: 185 }} source={require('../../assets/img/sigupicon.png')}></ImageComponent>
                    </View>

                    <View>
                        <TxtInput
                            value={this.state.email}
                            onChangeText={(value) => {
                                this.setState({
                                    email: value.trim()
                                });
                            }} style={{ width: 20, height: 15 }} source={require('../../assets/icon/email.png')} placeholder={"Email"}></TxtInput>
                        <TxtInput
                            value={this.state.fullname}
                            onChangeText={(value) => {
                                this.setState({
                                    fullname: value
                                });
                            }} style={{ width: 20, height: 20 }} source={require('../../assets/icon/user.png')} placeholder={"Full Name"}></TxtInput>
                        <TxtInput
                            value={this.state.mobilenumber}
                            onChangeText={(value) => {
                                this.setState({
                                    mobilenumber: value.trim()
                                });
                            }} style={{ width: 20, height: 15 }} source={require('../../assets/icon/email.png')} placeholder={"Mobile Number"}></TxtInput>
                        <TxtInput
                            value={this.state.password}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value.trim()
                                });
                            }} style={{ width: 20, height: 20 }} source={require('../../assets/icon/password.png')} placeholder={"Password"}></TxtInput>
                        <TxtInput
                            value={this.state.username}
                            onChangeText={(value) => {
                                this.setState({
                                    username: value.trim()
                                });
                            }} style={{ width: 20, height: 20 }} source={require('../../assets/icon/password.png')} placeholder={"Username"}></TxtInput>
                    </View>

                    <View style={{ marginTop: 30, marginBottom: 30 }}>
                        <BtnComponent onPress={this.checkValidation}>
                            <Text>Sign Up</Text>
                        </BtnComponent>
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 0 }}>
                            <Text style={{ color: '#9098B1', fontSize: 12, textAlign: 'center' }}>have a account?</Text>
                            <TouchableOpacity onPress={this.signupHandler}>
                                <Text style={{ color: '#40BFFF', fontSize: 12, textAlign: 'center' }}>  Sign In</Text>
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
