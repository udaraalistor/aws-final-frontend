import React, { useRef, useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  FlatList,
  ToastAndroid

} from 'react-native';

import Carousel from 'react-native-anchor-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import Service from '../../services/dashboard';
import BtnComponent from '../../component/Btn-Component';


// const carouselRef = useRef(null);
const { width, height } = Dimensions.get('window');

class App extends Component {

  state = {
    data: [],
    isfollow: false
  }

  componentDidMount() {
    this.callServiceFunc();
  }

  callServiceFunc = async () => {
    await Service.suggest()
      .then(async (response) => {
        if (response.responseCode === 2000) {
          this.setState({
            data: response.searchResult
          })
        } else {
          ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
        }
      });
  };

  followHandler = async (id) => {
    await Service.follow(id)
      .then(async (response) => {
        if (response.responseCode === 2000) {
          this.callServiceFunc();
          await this.setState({
            isfollow: true
          })
        } else {
          ToastAndroid.show(response.responseMsg, ToastAndroid.SHORT);
        }
      });
    this.props.callHandler(this.state.isfollow);
  }

  render() {
    return (
      <ScrollView style={{}}>
        <View style={styles.carouselContentContainer}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            <View style={styles.carouselContentContainerView}>
              <Carousel style={styles.carousel}
                data={this.state.data}
                renderItem={({ item, index }) => {
                  let id = item.profileId
                  return (
                    <View>
                      <View
                      >
                        <Image
                          source={{ uri: item.profilePicture !== null && item.profilePicture !== undefined ? item.profilePicture.imageUrl : 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80' }}
                          style={styles.carouselImage}
                        />
                        <Text style={styles.carouselText}>{item.fullName}</Text>
                        <View>
                          <TouchableOpacity
                            onPress={() => this.followHandler(id)}
                            style={{
                              width: '100%',
                              height: 20,
                              position: 'absolute',
                              bottom: 10,
                              left: 0,
                              backgroundColor: '#40BFFF',
                              borderRadius: 30,
                              shadowColor: 'blue',
                              shadowOffset: { width: 0, height: 1 },
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                              elevation: 3
                            }}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 12 }}>FOLLOW</Text>
                          </TouchableOpacity>
                        </View>


                      </View>
                    </View>
                  )
                }}
                itemWidth={140}
                containerWidth={300}
                separatorWidth={0}
                // ref={carouselRef}
                inActiveOpacity={0.4}
              />

            </View>
          </View>
        </View>
      </ScrollView>

    )
  }
};

const styles = StyleSheet.create({
  carouselContentContainer: {
    flex: 1,
    height: 350,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF'
  },

  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start'

  },
  searchBoxContainer: {
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '3%'

  },
  SearchBox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16
  },
  searchBoxIcon: {
    position: 'absolute',
    right: 20,
    top: 14
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10
  },
  carouselContentContainerView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center'

  },

  carousel: {
    flex: 1,
    overflow: 'visible'

  },
  carouselImage: {
    width: 150,
    height: 210,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'

  },
  carouselText: {
    padding: 14,
    color: 'white',
    position: 'absolute',
    bottom: 30,
    left: 2,
    fontWeight: 'bold',
    textAlign: 'center'

  },

  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15
  },

  movieInfoContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 14
  },

  movieName: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6
  },

  movieStat: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.6
  },

  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderWidth: 4,
    borderColor: 'rgba(2,173,148,0.2)',
    marginBottom: 14

  }







});

export default App;
