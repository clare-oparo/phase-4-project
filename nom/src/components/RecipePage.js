import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data.recipe))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [recipeId]);

  return (
    <Box mt={8} mx="auto" maxWidth="800px">
      {recipe ? (
        <div>
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Ingredients:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.ingredients}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.instructions}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1">
          Loading...
        </Typography>
      )}
    </Box>
  );
  
}

export default RecipePage;
