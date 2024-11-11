import BatchCalculator from "./BatchCalculator";
import "./App.css";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function App() {
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [recipes, setRecipes] = useState(null);
	const [batchSize, setBatchSize] = useState(1);

	useEffect(() => {
		fetch("/batch-calculator/recipes.json")
			.then(async (response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setRecipes(data);
				const params = new URLSearchParams(window.location.search);
				const recipeFromUrl = params.get("recipe");
				const batchSizeFromUrl = params.get("size");

				// If a recipe is specified in the URL and exists in our recipes, set it as selected
				if (
					recipeFromUrl &&
					data[recipeFromUrl] &&
					recipeFromUrl !== selectedRecipe
				) {
					setSelectedRecipe(data[recipeFromUrl]);
				} else {
					setSelectedRecipe(null);
				}
				if (batchSizeFromUrl) {
					setBatchSize(batchSizeFromUrl);
				}
			})
			.catch((error) => {
				console.error(error.message);
			});
	}, []);

	const chooseRecipe = (recipeName) => {
		setSelectedRecipe(recipes[recipeName]);
	};

	const recipeColours = [
		"recipeChipC1",
		"recipeChipC2",
		"recipeChipC3",
		"recipeChipC4",
		"recipeChipC5",
	];
	const getRecipeChipColour = (index) => {
		const c = recipeColours[index % recipeColours.length];
		return c;
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Recipe Batch Calculator
			</Typography>
			<Box>
				{recipes &&
					Object.keys(recipes).map((recipeName, index) => (
						<Chip
							key={recipeName}
							variant="contained"
							onClick={() => chooseRecipe(recipeName)}
							label={recipeName}
							color="customAlpha"
						></Chip>
					))}
				<Chip
					variant="outlined"
					onClick={() => setSelectedRecipe(null)}
					label="New Recipe"
					icon={<AddIcon fontSize="small" />}
				></Chip>
			</Box>
			<BatchCalculator
				recipe={selectedRecipe}
				batchSize={batchSize}
				setBatchSize={setBatchSize}
			/>
		</>
	);
}
