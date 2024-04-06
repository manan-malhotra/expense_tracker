import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField } from "@mui/material";
import { Header } from "../components";
import React from "react";
import {Select, InputLabel, MenuItem, FormControl } from '@mui/material'
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router-dom";


const IncomeInputForm = () => {
  const {addIncome,incomes} = useGlobalContext()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    addIncome(values);
    navigate(-1);
    console.log(values);
  }

  const handleChangeCategory = (SelectChangeEvent) => {
    setCategory(SelectChangeEvent.target.value);
    console.log(SelectChangeEvent.target.value);
  };


  return (
    <Box m="20px">

      <Header title="ADD INCOME" subtitle="Add a New Income" />
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
                    <MenuItem value={`salary`}>Salary</MenuItem>
                    <MenuItem value={`investment`}>Investments</MenuItem>
                    <MenuItem value={`stocks`}>Stocks</MenuItem>
                    <MenuItem value={`freelancing`}>Freelancing</MenuItem>
                    <MenuItem value={`bank_transfer`}>Bank Transfer</MenuItem>
                    <MenuItem value={`other`}>Other</MenuItem>
                  </Select>
                </FormControl>

              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={() => {handleFormSubmit({category, title, description, amount, date})}}>
                  Add Income
                </Button>
              </Box>
    </Box>
  );
};

export default IncomeInputForm;