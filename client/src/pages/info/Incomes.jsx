import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import { Header } from "../../components";
import { Box } from "@mui/material";
import incomeColumns from "../../constants/incomeColumns";
import { useGlobalContext } from "../../context/globalContext";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate } from "react-router-dom";

const Income = () => {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
        useGlobalContext();
    const [totalI, setTotalI] = useState([]);
    useEffect(() => {
        getIncomes().then((income) => {
            setTotalI(income);
        });
    }, []);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header
                title="Income"
                subtitle="List of Income for Future Reference"
            />
            <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/incomeform"
            >
                Add Income
            </Link>
            <Box
                m="40px 0 0 0"
                height="75vh"
                // custom css for material ui
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
                    // 🟧🟧🟧 data filter tool-bar present here 🟧🟧🟧
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {totalI && totalI.length === 0 ? (
                    <h1>No Incomes</h1>
                ) : (
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={totalI}
                        columns={incomeColumns}
                        components={{ Toolbar: GridToolbar }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Income;
