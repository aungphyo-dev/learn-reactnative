import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import {useLocalSearchParams,Stack} from "expo-router";
import supabase from "../../supabase/supabase";
import tw from "twrnc"
const Detail = () => {
    const {id} = useLocalSearchParams()
    const change =  (payload) => {
        console.log('Change received!', payload)
    }
    const dd = supabase
        .channel('custom-all-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, change)
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'comments' }, change)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'comments' }, change)
        .subscribe()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const getPost = async () => {
        const {data} = await supabase.from('blogs').select(`*,user_profiles(*),comments(*,user_profiles(*))`).eq("id",id)
        setPost(data[0])
        setIsLoading(false)
    }
    useEffect(() => {
        getPost()
    }, [dd]);
    return (
        <ScrollView>
            <Stack.Screen
                options={{
                    title: 'Detail',
                    headerStyle: { backgroundColor: '#f4511e' },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle:"Detail",
                }}
            />

            <View>
                <Image source={{uri:post?.image}} style={tw`w-full h-64`}/>
            </View>
            <View style={tw`p-3`}>
                <View>
                    <Text style={tw`text-[15px] font-semibold mb-1`}>
                        {!isLoading && post.title}
                    </Text>
                    <Text style={tw`text-[8px]`}>
                         {!isLoading && `by ${post.user_profiles?.name}`}
                    </Text>
                </View>
                <Text>
                    {post.description}
                </Text>
            </View>
            </ScrollView>
    );
};

export default Detail;
