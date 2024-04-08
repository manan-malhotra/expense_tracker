import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import { Header } from "../../components";
import { Box } from "@mui/material";
import incomeColumns from "../../constants/incomeColumns";
import { useGlobalContext } from "../../context/globalContext";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Expenses = () => {
  const { expenses, getExpenses } = useGlobalContext();
  useEffect(() => {
    getExpenses();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header
        title="Expense"
        subtitle="List of Expenses for Future Reference"
      />
      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/expenseform"
        params={{ sentFrom: "expenses" }}
      >
        Add Expense
      </Link>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={expenses}
          columns={incomeColumns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Expenses;
