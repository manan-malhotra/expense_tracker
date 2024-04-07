import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:4001/transactions/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    axios.defaults.headers.common["Authorization"] =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTEwM2VhNjA0NDMwNjI3NzE1YzU3MiIsInVzZXJuYW1lIjoibWFuYW4iLCJpYXQiOjE3MTI0MjQ5NzcsImV4cCI6MTcxNTAxNjk3N30.JEGfe_G7vNiYy1NoF4IERBUEZhqxLPKHDr5-48OEa0I";

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios
            .post(`${BASE_URL}addIncome`, income)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}getIncome`);
        setIncomes(response.data);
        console.log(response.data);
    };

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}deleteIncome/${id}`);
        getIncomes();
    };

    const totalIncome = async () => {
        const responseIncome = await axios.get(`${BASE_URL}getIncome`);
        let totalIncome = 0;
        responseIncome.data.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });

        return totalIncome;
    };

    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios
            .post(`${BASE_URL}addExpense`, income)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}getExpense`);
        setExpenses(response.data);
        console.log(response.data);
    };

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}deleteExpense/${id}`);
        getExpenses();
    };

    const totalExpenses = async () => {
        const responseExpense = await axios.get(`${BASE_URL}getExpense`);
        let totalIncome = 0;
        responseExpense.data.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });

        return totalIncome;
    };

    const totalBalance = async () => {
        const responseIncome = await axios.get(`${BASE_URL}getIncome`);
        let totalIncome = 0;
        responseIncome.data.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });
        const responseExpense = await axios.get(`${BASE_URL}getExpense`);
        let totalExpense = 0;
        responseExpense.data.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });
        return totalIncome - totalExpense;
    };

    const transactionHistory = async () => {
        const responseExpense = await axios.get(`${BASE_URL}getExpense`);
        const responseIncome = await axios.get(`${BASE_URL}getIncome`);
        const history = [...responseExpense.data, ...responseIncome.data];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return history;
    };

    const numberOfTransactions = async () => {
        const responseExpense = await axios.get(`${BASE_URL}getExpense`);
        const responseIncome = await axios.get(`${BASE_URL}getIncome`);
        const history = [...responseExpense.data, ...responseIncome.data];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return history.length;
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                numberOfTransactions,
                error,
                setError,
                token,
                setToken,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
