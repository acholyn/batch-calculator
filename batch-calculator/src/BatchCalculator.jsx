import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function BatchCalculator() {
  const [ingredients, setIngredients] = useState([
    { name: "Flour", amount: 100, unit: "g" },
    { name: "Sugar", amount: 50, unit: "g" },
    { name: "Butter", amount: 75, unit: "g" },
  ]);
  const [batchSize, setBatchSize] = useState(1);

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
      <Typography variant="h4" gutterBottom>
        Recipe Batch Calculator
      </Typography>
      <TextField
        label="Batch Size"
        type="number"
        value={batchSize}
        onChange={(e) => setBatchSize(Number(e.target.value))}
        margin="normal"
        className="calculator__batch-size"
      />
      <TableContainer component={Paper} className="calculator__table">
        <Table>
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
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
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
                <TableCell>
                  <TextField
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  {ingredient.amount * batchSize} {ingredient.unit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={addIngredient}
        style={{ marginTop: "20px" }}>
        Add Ingredient
      </Button>
    </div>
  );
}
