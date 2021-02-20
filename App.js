import React, { Component } from 'react';
import Navigation from './src/navigation';
import {
  Text,
  TextInput
} from 'react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;


class App extends Component {

  componentDidMount() {
    console.disableYellowBox = true;

  }
  render() {
    return (
      <Navigation />
    );
  }
};


export default App;
