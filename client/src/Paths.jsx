import React from "react";
import {
    Income,
    Dashboard,
    Expenses,
    SidebarMenu,
    TransactionHistory,
    Topbar,
    IncomeInputForm,
    ExpenseInputForm,
} from "./pages";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { useGlobalContext } from "./context/globalContext";
import Login from "./pages/Login";
export default function Paths() {
    const token = localStorage.getItem("token");
    if (token == null) {
        return <Navigate to="/" />;
    }
    return (
        <main className="app">
            <SidebarMenu />

            <section className="content">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/transactionHistory"
                        element={<TransactionHistory />}
                    />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/incomeform" element={<IncomeInputForm />} />
                    <Route path="/expenseform" element={<ExpenseInputForm />} />
                </Routes>
            </section>
        </main>
    );
}
