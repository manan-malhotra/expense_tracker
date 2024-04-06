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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { useGlobalContext } from "./context/globalContext";

const App = () => {
    const [theme, coloMode] = useMode();
    const global = useGlobalContext();
    return (
        <ColorModeContext.Provider value={coloMode}>
            <ThemeProvider theme={theme}>
                {/* Rest CSS */}
                <CssBaseline />

                <BrowserRouter>
                    <main className="app">
                        <SidebarMenu />

                        <section className="content">
                            {/* <Topbar /> */}

                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/transactionHistory"
                                    element={<TransactionHistory />}
                                />
                                <Route path="/income" element={<Income />} />
                                <Route
                                    path="/expenses"
                                    element={<Expenses />}
                                />
                                <Route
                                    path="/incomeform"
                                    element={<IncomeInputForm />}
                                />
                                <Route
                                    path="/expenseform"
                                    element={<ExpenseInputForm />}
                                />
                            </Routes>
                        </section>
                    </main>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
