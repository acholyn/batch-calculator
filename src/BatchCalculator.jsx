import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export default function BatchCalculator({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [batchSize, setBatchSize] = useState(1);

  useEffect(() => {
    if (recipe) {
      console.log(recipe);
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: 0, unit: "" }]);
  };

  return (
    <div className="calculator__wrapper">
      {recipe && <h4>yield per batch: {recipe.batchYield}</h4>}
      <TextField
        label="Batch Size"
        type="number"
        value={batchSize}
        onChange={(e) => setBatchSize(Number(e.target.value))}
        margin="normal"
        className="calculator__batch-size"
      />
      <TableContainer component={Paper} className="calculator__table">
        <Table size="small">
          <TableHead className="calculator__table-header">
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell align="right">Batch Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index} size="small">
                <TableCell>
                  <TextField
                    value={ingredient.name}
                    size="small"
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell
                  align="right"
                  size="small"
                  className="calculator__table__ingredient-amount">
                  <TextField
                    type="number"
                    size="small"
                    value={ingredient.amount}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "amount",
                        Number(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell
                  size="small"
                  className="calculator__table__ingredient-unit">
                  <TextField
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell
                  align="right"
                  className="calculator__table__batch-amount">
                  {ingredient.amount * batchSize} {ingredient.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={addIngredient}>
        Add Ingredient
      </Button>
    </div>
  );
}
