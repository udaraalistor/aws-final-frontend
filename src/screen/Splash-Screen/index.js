import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageStrings } from '../../constance/StorageStrings';
import HeadlineSubComponent from '../../component/Sub-Headline-Component';

class App extends Component {

    state = {

    }

    async componentDidMount() {
        let islogin = await AsyncStorage.getItem(StorageStrings.ISLOGIN);
        const unsubscribe = this.props.navigation.addListener('willFocus', async () => {
            setTimeout(() => {

                if (islogin === '1') {
                    this.props.navigation.navigate({ routeName: 'BottomNavigator' });
                } else {
                    this.props.navigation.navigate({ routeName: 'SignInScreen' });
                }
            }, 2000);

        });

        setTimeout(() => {

            if (islogin === '1') {
                this.props.navigation.navigate({ routeName: 'BottomNavigator' });
            } else {
                this.props.navigation.navigate({ routeName: 'SignInScreen' });
            }


        }, 2000);

        return unsubscribe;
    }

    render() {

        return (
            <View
                style={{

                }}
            >
                <View
                    style={{
                        width: '100%', height: '100%', alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#40BFFF'
                    }}
                >

                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{ width: 260, height: 267 }} resizeMode='cover'
                            source={require('../../assets/img/appicon.png')}
                        />
                    </View>
                </View>

            </View>
        )
    }
};



export default App;