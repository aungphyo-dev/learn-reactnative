import React from 'react';
import {Stack} from "expo-router";
import {Image} from "react-native";

const layout = () => {
    function LogoTitle() {
        return (
            <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/favicon.png')}
            />
        );
    }
    return (
        <Stack
            screenOptions={{
                headerTitle: props => <LogoTitle {...props} /> ,
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    );
};
