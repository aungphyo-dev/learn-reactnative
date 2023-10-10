import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView} from "react-native";
import supabase from "../supabase/supabase";
import tw from "twrnc"
import Card from "../components/Card";
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
    return (
        <FlatList
                contentContainerStyle={tw`py-3 px-1.5 gap-y-1`}
                data={posts?.data}
                renderItem={ ({item}) => <Card blog={item}/>}
                keyExtractor={blog=>blog.id}
            />
    );
};

export default index;
