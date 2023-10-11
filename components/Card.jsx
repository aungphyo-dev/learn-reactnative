import React from 'react';
import {Image, Text, View} from "react-native";
import tw from "twrnc";
import {Link} from "expo-router";

const Card = ({blog}) => {
    return (
        <View style={tw`pt-1 pb-3 px-4 rounded border-b border-gray-700/40`}>
            <View style={tw`flex-row gap-x-1 mb-[3px]`}>
                <Image source={{uri: blog?.user_profiles?.image}} style={tw`w-11 h-11 rounded`}/>
                <View style={tw`flex justify-center items-start`}>
                    <Text style={tw`font-semibold text-sm text-gray-900`}> {blog?.user_profiles?.name} </Text>
                    <Text style={tw`text-sm text-gray-400`}> {blog?.created_at?.substring(0, 10)} </Text>
                </View>
            </View>
            <View style={tw`flex-row justify-between items-start`}>
                <Link numberOfLines={2} href={`/detail/${blog.id}`} style={tw`flex-1`}>
                    <Text style={tw`text-[15px] font-bold mb-[1px] text-gray-800`}>
                        {blog?.title}
                    </Text>
                </Link>
                <Image source={{uri: blog?.image}} style={tw`w-25 h-25`}/>
            </View>
        </View>
    );
};

export default Card;
