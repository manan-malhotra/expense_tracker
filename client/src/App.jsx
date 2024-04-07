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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import { useGlobalContext } from "./context/globalContext";
import Login from "./pages/Login";
import Paths from "./Paths";
import Register from "./pages/Register";

const App = () => {
    const [theme, coloMode] = useMode();
    const global = useGlobalContext();
    return (
        <ColorModeContext.Provider value={coloMode}>
            <ThemeProvider theme={theme}>
                {/* Rest CSS */}
                <CssBaseline />

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<Paths />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
