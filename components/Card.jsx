import React from 'react';
import {Image, Text, View} from "react-native";
import tw from "twrnc";

const Card = ({blog}) => {
    return (
        <View style={tw`p-1 rounded bg-slate-700 flex-row`}>
                <View style={tw`flex-1 p-2`}>
                    <View style={tw`flex-row gap-x-2 mb-[3px]`}>
                        <Image source={{uri:blog?.user_profiles?.image}} style={tw`w-11 h-11 rounded`}/>
                        <View style={tw`flex justify-center items-start`}>
                            <Text style={tw`font-semibold text-sm text-white`}> {blog?.user_profiles?.name} </Text>
                            <Text style={tw`text-sm text-gray-400`}> {blog?.created_at?.substring(0,10)} </Text>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={tw`text-lg font-bold mb-[1px] text-white`}>
                        {blog?.title}
                    </Text>
                    <Text numberOfLines={5} style={tw`text-gray-200`}>
                        {blog?.description}
                    </Text>
                </View>
                <Image source={{uri:blog?.image}} style={tw`w-25 h-full`}/>
        </View>
    );
};

export default Card;
