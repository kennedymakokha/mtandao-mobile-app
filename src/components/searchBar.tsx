import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useSearch } from '../context/searchContext';


const SearchBar = (title: string | any) => {
    const { query, setQuery } = useSearch();

    return (
        <View className='w-[80%]  px-4'>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={`Search ...`}
                // style={styles.input}
                className='w-full  px-3  bg-secondary-50 rounded-md '
                placeholderTextColor="#000"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        height: 36,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        color: '#000',
    },
});

export default SearchBar;
