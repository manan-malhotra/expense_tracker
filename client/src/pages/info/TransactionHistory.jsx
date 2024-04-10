import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import { Header } from "../../components";
import { Box } from "@mui/material";
import { useGlobalContext } from "../../context/globalContext";
import React, { useState, useEffect } from "react";
import transactionHistoryColumns from "../../constants/transactionHistoryColumns";

const TransactionHistory = () => {
    const { transactionHistory } = useGlobalContext();
    const [history, setHistory] = useState([]);
    useEffect(() => {
        transactionHistory().then((history) => {
            console.log(history);
            setHistory(history);
        });
    }, []);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Header
                title="Transaction History"
                subtitle="List of Transactions for Future Reference"
            />
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
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={history}
                    columns={transactionHistoryColumns(colors)}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default TransactionHistory;
