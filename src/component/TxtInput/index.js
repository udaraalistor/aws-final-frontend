import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image

} from 'react-native';


import styles from './styles';

const TxtInput = props => {
    return (
        <View style={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#D7D7D7',
            marginTop: 10,
            flexDirection: 'row'
        }}>
            <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginLeft: 20 }}>
                <Image style={props.style} resizeMode='cover'
                    source={props.source}
                />

            </View>

            <View style={{ marginLeft: 20, width: 200, paddingRight: 30 }}>
                <TextInput
                    secureTextEntry={props.secureTextEntry}
                    editable={props.editable}
                    keyboardType={props.keyboardType}
                    placeholder={props.placeholder}
                    style={styles.Input}
                    value={props.value}
                    onChangeText={props.onChangeText}

                />
            </View>
        </View>

    );
};


export default TxtInput;
