import React, { useState, useEffect } from 'react';
import api from '../api';


export default function SuggestionsComponent({ query, onSuggestionClick }) {
    const [suggestions, setSuggestions] = useState([]);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSuggestions = async () => {
        try {
            const response = await api.get(`/get-suggestions?q=${query}`);
            console.log(response.data);
            if (Array.isArray(response.data)) {
                setSuggestions(response.data);
            } else {
                setSuggestions([response.data]);
            }
        }
        catch (error) {
            console.error('Failed to fetch suggestions:', error);
        };
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    useEffect(() => {
        debouncedFetchSuggestions();
    }, [query]);

    return (
        <div>
            {suggestions.length === 0 ? (
                <div>no suggestions</div>
            ) : (

                <ul className='p-3 space-y-1'>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => onSuggestionClick(suggestion)}
                            style={{ cursor: 'pointer' }}
                            className='p-3 font-mono font-sans rounded-md border-2 shadow-sm  hover:bg-blue-500'
                        >
                            {suggestion}
                        </li>

                    ))}
                </ul>
            )}
        </div>
    )
};