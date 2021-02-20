import React, { useState } from 'react';
import {
    View,
    Text
} from 'react-native';



const HeadlineSubComponent = props => {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 12, color: '#9098B1' }}>
                {props.children}
            </Text>
        </View>
    );
};


export default HeadlineSubComponent;
