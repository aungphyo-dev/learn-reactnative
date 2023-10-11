import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import supabase from "../supabase/supabase";
import tw from "twrnc"
import Card from "../components/Card";
import tabs from "expo-router/src/layouts/Tabs";
const index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState(false)
    const [posts, setPosts] = useState({})
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const handleChange = (event,value) => {
        setCurrentPage(value);
    };
    const callerPost = useCallback(async () => {
        setIsLoading(true)
        const data = await supabase
            .from('blogs')
            .select(`*,categories(*),user_profiles(*)`)
            .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
            .ilike('title', `%${query}%`).order('id', {ascending: false})
        setPosts(data)
        const {count} = await supabase
            .from("blogs")
            .select("*",{count:"exact"})
            .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
            .ilike('title', `%${query}%`).order('id', {ascending: false})
        setTotalPages(Math.ceil(count / pageSize));
        setIsLoading(false)
    }, [currentPage,pageSize,query])
    const callerPostAll = useCallback(async () => {
        setIsLoading(true)
        const data = await supabase
            .from('blogs')
            .select(`*,categories(*),user_profiles(*)`)
            .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
            .order('id', {ascending: false})
        setPosts(data)
        const {count} = await supabase
            .from("blogs")
            .select("*",{count:"exact"})
            .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)
            .order('id', {ascending: false})
        setTotalPages(Math.ceil(count / pageSize));
        setIsLoading(false)
    }, [currentPage,pageSize])

    useEffect(() => {
        callerPostAll()
    }, [callerPostAll]);
    useEffect(() => {
        callerPost()
    }, [callerPost]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(true)
        callerPost()
    }
    const handleClick = () => {
        setIsLoading(true)
        setSearchParams({})
        setSearch(false)
        setQuery("")
        callerPostAll()
    }
    const fetchMore = () => {
      if (!isLoading && currentPage <=totalPages){
          setCurrentPage(prevState =>  prevState + 1)
      }
    }
    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={tw`flex-row justify-center items-center p-10`}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={fetchMore}
                    //On Click of button calling getData function to load more data
                    style={tw`bg-[#800000] rounded flex-row justify-center items-center px-10 py-2`}>
                    <Text style={tw`text-center text-white text-[15px]`}>Load More</Text>
                    {isLoading ? (
                        <ActivityIndicator color="white" style={{marginLeft: 8}} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <FlatList
                contentContainerStyle={tw`py-3 gap-y-1`}
                data={posts?.data}
                renderItem={ ({item}) => <Card blog={item}/>}
                keyExtractor={blog=>blog.id}
                enableEmptySections={true}
                ListFooterComponent={renderFooter}
            />
    );
};

export default index;
