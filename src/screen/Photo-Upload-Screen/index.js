import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Image, Button, ToastAndroid, TouchableOpacity, Platform, PermissionsAndroid, Modal } from 'react-native';
import HeadlineComponent from '../../component/Headline-Component';
import HeadlineSubComponent from '../../component/Sub-Headline-Component';
import ImageComponent from '../../component/Image-Component';
// import TxtInput from '../../component/TxtInput';
import BtnComponent from '../../component/Btn-Component';
import CarouselScreen from '../../component/Carousel-Screen';
import ImagePicker from 'react-native-image-picker';
import Service from '../../services/dashboard';
class App extends Component {

    state = {
        feed: [],
        ismodal: false,
        img: '',
        caption: '',
        imgname: 'aws_image'
    };
    componentDidMount() {
        // this.callServiceFunc();
        this.changeImageHandler();
    }

    callServiceFunc = async () => {
        const data = {
            postImage: this.state.img,
            caption: this.state.caption,
            postImageName: this.state.imgname
        };

        await Service.post(data)
            .then(async (response) => {
                if (response.responseCode === 2000) {
                    this.props.navigation.navigate({ routeName: 'BottomNavigator' });
                } else {
                    ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
                }
            });
    };

    changeImageHandler = async () => {

        this.setState({
            ismodal: true
        })

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.showImagePicker(
                    async (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        } else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                            console.log('User tapped custom button: ', response.customButton);
                        } else {
                            console.log(response)
                            const source = 'data:image/jpeg;base64,' + response.data;
                            // let fileName = response.fileName.split('.');

                            // console.log(fileName)
                            const uri = response.uri;
                            this.setState({
                                img: source
                            })

                        }
                    });
            }
        } else {
            ImagePicker.showImagePicker(
                async (response) => {

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {
                        console.log(response)
                        const uri = response.uri;
                        const source = 'data:image/jpeg;base64,' + response.data;
                        this.setState({
                            img: source
                        })

                    }
                });
        }
    };
    render() {
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}
            >
                <View style={{ paddingLeft: 30, paddingRight: 30, height: '100%', marginTop: 100 }}>
                    <View style={{ marginTop: -15, paddingBottom: 50 }}>
                        <View style={{
                            width: '100%', height: 300, borderRadius: 20, marginTop: 15, shadowColor: 'blue',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 10,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'


                        }}>
                            <Image style={this.state.img === '' ? { width: 250, height: 200 } : { width: '100%', height: 300, borderRadius: 20 }} resizeMode='cover'
                                source={{ uri: this.state.img !== '' ? this.state.img : require('../../assets/img/post.png') }}
                                source={this.state.img === '' ? require('../../assets/img/post.png') : { uri: this.state.img }}
                            />
                        </View>

                        <View style={{
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#D7D7D7',
                            marginTop: 30,
                            flexDirection: 'row'
                        }}>
                            <TextInput
                                style={{ width: '90%', height: 50, marginLeft: 20 }}
                                // source={require('../../assets/icon/email.png')}
                                // placeholder={"Caption"}
                                value={this.state.caption}
                                onChangeText={(value) => {
                                    this.setState({
                                        caption: value
                                    });
                                }}
                            >
                            </TextInput>
                        </View>

                        <View style={{ marginTop: 30, marginBottom: 30 }}>
                            <BtnComponent onPress={this.callServiceFunc}>
                                <Text>Upload</Text>
                            </BtnComponent>
                        </View>

                    </View>
                </View>
            </ScrollView>
        );
    }
};


export default App;
