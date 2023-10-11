import React from 'react';
import {Stack} from "expo-router";
import {Image, TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const layout = () => {
    function LogoTitle() {
        return (
            <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/favicon.png')}
            />
        );
    }
    return (
        <Stack
            screenOptions={{
                headerTitle: props => <LogoTitle {...props} /> ,
                headerRight:()=><TouchableOpacity>
                    <FontAwesome name="user-circle-o" size={25} color="black" />
                </TouchableOpacity>,
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
            }}
        />
    );
};
export default layout