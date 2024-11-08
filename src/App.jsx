import BatchCalculator from "./BatchCalculator";
import "./App.css";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    console.log("getting recipes");
    fetch("/recipes.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const chooseRecipe = (recipeName) => {
    setSelectedRecipe(recipes[recipeName]);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Recipe Batch Calculator
      </Typography>
      <Box>
        {recipes &&
          Object.keys(recipes).map((recipeName) => (
            <Chip
              key={recipeName}
              variant="contained"
              onClick={() => chooseRecipe(recipeName)}
              label={recipeName}></Chip>
          ))}
      </Box>
      <BatchCalculator recipe={selectedRecipe} />
    </>
  );
}
