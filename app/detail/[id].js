import React from 'react';
import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

const Detail = () => {
    const {id} = useLocalSearchParams()
    return (
        <View>
            <Text>
                {id}
            </Text>
            </View>
    );
};

export default Detail;
