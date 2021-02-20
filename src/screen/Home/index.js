import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Image, Button, ToastAndroid, TouchableOpacity, Platform, PermissionsAndroid, Modal } from 'react-native';
import HeadlineComponent from '../../component/Headline-Component';
import HeadlineSubComponent from '../../component/Sub-Headline-Component';
import ImageComponent from '../../component/Image-Component';
import TxtInput from '../../component/TxtInput';
import BtnComponent from '../../component/Btn-Component';
import CarouselScreen from '../../component/Carousel-Screen';
import ImagePicker from 'react-native-image-picker';
import Service from '../../services/dashboard';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageStrings } from '../../constance/StorageStrings';
class App extends Component {

    state = {
        feed: [],
        ismodal: false
    };
    componentDidMount() {
        this.callServiceFunc();

        this.props.navigation.addListener('willFocus', async () => {
            this.callServiceFunc();
        });
    }

    callServiceFunc = async () => {
        await Service.feed()
            .then(async (response) => {
                if (response.responseCode === 2000) {
                    this.setState({
                        feed: response.postList
                    })

                } else {
                    ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
                }
            });
    };

    changeImageHandler = async () => {
        this.props.navigation.navigate({ routeName: 'PhotoUploadScreen' });
    };

    logoutHandler = () => {
        this.props.navigation.navigate({ routeName: 'SignInScreen' });
        AsyncStorage.clear();
    }

    callHandler = (isfollow) => {
        if (isfollow) {
            this.callServiceFunc();
        }
    }

    render() {
        console.log("feed", this.state.feed);
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}
            >
                <View style={{ paddingLeft: 30, paddingRight: 30, height: '100%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={this.changeImageHandler}>
                            <Image style={{ width: 24, height: 21 }} resizeMode='cover'
                                source={require('../../assets/icon/camera.png')}
                            />
                        </TouchableOpacity>

                        <View>
                            <Image style={{ width: 105, height: 30 }} resizeMode='cover'
                                source={require('../../assets/img/logo.png')}
                            />
                        </View>
                        <TouchableOpacity onPress={this.logoutHandler}>
                            <Image style={{ width: 23, height: 21 }} resizeMode='cover'
                                source={require('../../assets/icon/message.png')}
                            />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 24 }}>Welcome to Instagram</Text>
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>Follow people to start seeing the photos and videos they share</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 0 }}>
                        <CarouselScreen
                            callHandler={(isfollow) => this.callHandler(isfollow)}
                        ></CarouselScreen>

                    </View>

                    {this.state.feed.map((value, index) => {
                        return (
                            <View style={{ marginTop: -15, paddingBottom: 50 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 30, height: 30, borderRadius: 15 }}>
                                        <Image style={{ width: 30, height: 30, borderRadius: 15 }} resizeMode='cover'
                                            source={{ uri: value.profileDTO.profilePicture.imageUrl !== undefined && value.profileDTO.profilePicture.imageUrl !== null ? value.profileDTO.profilePicture.imageUrl : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
                                        />
                                    </View>
                                    <View style={{ width: '100%', marginLeft: 5 }}>
                                        <Text style={{ fontSize: 10 }}>{value.profileDTO.fullName}</Text>
                                        <Text style={{ fontSize: 10 }}>Colombo, Srilanka</Text>
                                    </View>

                                </View>

                                <View style={{
                                    width: '100%', height: 300, borderRadius: 20, marginTop: 15, shadowColor: 'blue',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 10,
                                }}>
                                    <Image style={{ width: '100%', height: 300, borderRadius: 20 }} resizeMode='cover'
                                        source={{ uri: value.imageUrl !== undefined ? value.imageUrl : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 23, height: 21 }} resizeMode='cover'
                                            source={require('../../assets/img/Heart.png')}
                                        />
                                        <Image style={{ width: 21, height: 21, marginLeft: 10 }} resizeMode='cover'
                                            source={require('../../assets/img/Comment.png')}
                                        />
                                        <Image style={{ width: 23, height: 20, marginLeft: 10 }} resizeMode='cover'
                                            source={require('../../assets/img/Direct.png')}
                                        />
                                    </View>


                                </View>

                                <View style={{ marginTop: 5 }}>
                                    <Text>
                                        {value.caption}
                                    </Text>
                                </View>

                                <View>
                                    <Text style={{ color: '#40BFFF' }}>
                                        #Hashtag #Hashtag #Hashtag
                            </Text>
                                </View>

                            </View>
                        )
                    })}

                </View>


            </ScrollView>
        );
    }
};


export default App;
