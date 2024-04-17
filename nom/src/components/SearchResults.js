import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
    const query = useQuery();
    const searchQuery = query.get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if(searchQuery) {
            fetch(`http://localhost:5000/search?query=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setResults(data);  
                })
                .catch(error => console.error('Error:', error));
        }
    }, [searchQuery]);  

    return (
        <div>
            {results.map((recipe, index) => (
                <Card key={index} style={{ margin: '10px' }}>
                    <CardContent>
                        <Typography variant="h5">{recipe.name}</Typography>
                        <Typography color="textSecondary">{recipe.ingredients}</Typography>
                        <Typography color="textSecondary">{recipe.instructions}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SearchResults;
