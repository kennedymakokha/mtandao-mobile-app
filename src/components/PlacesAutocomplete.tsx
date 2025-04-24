// components/PlacesAutocomplete.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import axios from 'axios';

type Place = {
    description: string;
    place_id: string;
};

type Props = {
    apiKey: string;
    onPlaceSelected: (placeId: string, description: string) => void;
};

export default function PlacesAutocomplete({ apiKey, onPlaceSelected }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        if (query.length < 3) return;

        const fetchSuggestions = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
                    {
                        params: {
                            input: query,
                            key: apiKey,
                            language: 'en',
                            types: 'geocode',
                        },
                    },
                );

                if (res.data?.predictions) {
                    setResults(res.data.predictions);
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.warn('Autocomplete error:', err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search for a location"
                style={styles.input}
                placeholderTextColor="#999"
            />
            {results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={item => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setQuery(item.description);
                                setResults([]);
                                onPlaceSelected(item.place_id, item.description);
                               
                            }}
                            style={styles.item}>
                            <Text style={styles.itemText}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10000,
        marginTop: 65,
        width: '100%',
        paddingHorizontal: 30,
        position: 'absolute',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        elevation: 3,
        color: '#000',
    },
    list: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderRadius: 8,
        maxHeight: 200,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        color: '#000',
    },
});
