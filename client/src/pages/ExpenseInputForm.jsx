
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField } from "@mui/material";
import { Header } from "../components";
import React from "react";
import { useNavigate } from "react-router-dom";
import {Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import { useGlobalContext } from "../context/globalContext";
const ExpenseInputForm = () => {
  const {addExpense,expenses} = useGlobalContext()



  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    addExpense(values);
    navigate(-1);
    console.log(values);
  }

  const handleChangeCategory = (SelectChangeEvent) => {
    setCategory(SelectChangeEvent.target.value);
    console.log(SelectChangeEvent.target.value);
  };


  return (
    <Box m="20px">

      <Header title="ADD Expense" subtitle="Add a New Expense" />
      <Box
                display="grid"
                gap="30px"
              >
              <TextField
                key='title'
                fullWidth
                variant="filled"
                type="text"
                label={'Title'}
                value={title}
                name={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                key='date'
                fullWidth
                variant="filled"
                type="date"
                label={'Date'}
                value={date}
                name={title}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                key='Amount'
                fullWidth
                variant="filled"
                type="number"
                label={'Amount'}
                value={amount}
                name={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <TextField
                key='description'
                fullWidth
                variant="filled"
                type="text"
                label={'Description'}
                value={description}
                name={description}
                onChange={(e) => setDescription(e.target.value)}
              />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    variant="filled"
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={`education`}>Education</MenuItem>
                    <MenuItem value={`groceries`}>Groceries</MenuItem>
                    <MenuItem value={`health`}>Health</MenuItem>
                    <MenuItem value={`subscriptions`}>Subscriptions</MenuItem>
                    <MenuItem value={`takeaways`}>Takeaways</MenuItem>
                    <MenuItem value={`clothing`}>Clothing</MenuItem>
                    <MenuItem value={`other`}>Other</MenuItem>

                  </Select>
                </FormControl>

              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={() => {handleFormSubmit({category, title, description, amount, date})}}>
                  Add Expense
                </Button>
              </Box>
    </Box>
  );
};

export default ExpenseInputForm;