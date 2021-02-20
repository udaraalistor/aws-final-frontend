import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';

import styles from './styles';

const BtnComponent = props => {
    return (
        <TouchableOpacity style={{ ...styles.button, ...props.style }} activeOpacity={0.8} onPress={props.onPress} disabled={props.disabled}>
            <View style={{marginTop: 20}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>

    );
};


export default BtnComponent;
