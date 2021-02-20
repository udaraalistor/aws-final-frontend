import React, { useState } from 'react';
import {
    View,
    Text
} from 'react-native';



const HeadlineComponent = props => {
    return (
        <View style={{ marginTop: 30 }}>
            <View style={{ width: 70, height: 70, backgroundColor: '#40BFFF', borderRadius: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            </View>
            <View style={{marginTop: 20}}>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#223263' }}>
                    {props.children}
                </Text>
            </View>
        </View>
    );
};


export default HeadlineComponent;
