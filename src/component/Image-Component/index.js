import React, { useState } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';



const ImageComponent = props => {
    return (
        <View style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
            <Image style={props.style} resizeMode='cover'
                source={props.source}
            />

        </View>
    );
};


export default ImageComponent;
