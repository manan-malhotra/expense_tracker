import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "https://shepherd-casual-subtly.ngrok-free.app/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const axiosSetter = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  const login = async (user) => {
    const response = await axios
      .post(`${BASE_URL}users/login`, user)
      .catch((err) => {
        setError(err.response.data.message);
      });
    if (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("id", response.data.id);
      window.location.reload();
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
    }
  };
  const register = async (user) => {
    console.log(user);
    const response = await axios
      .post(`${BASE_URL}users/register`, user)
      .catch((err) => {
        setError(err.response.data.message);
      });
    console.log(response);
    if (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("id", response.data.id);
      window.location.reload();
    }
  };

  //calculate incomes
  const addIncome = async (income) => {
    const response = await axiosSetter
      .post(`${BASE_URL}transactions/addIncome`, income)
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axiosSetter.get(`${BASE_URL}transactions/getIncome`);
    setIncomes(response.data);
    return response.data;
  };

  const deleteIncome = async (id) => {
    const res = await axiosSetter.delete(
      `${BASE_URL}transactions/deleteIncome/${id}`
    );
    getIncomes();
  };

  const totalIncome = async () => {
    const responseIncome = await axiosSetter.get(
      `${BASE_URL}transactions/getIncome`
    );
    return responseIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    const response = await axiosSetter
      .post(`${BASE_URL}transactions/addExpense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axiosSetter.get(
      `${BASE_URL}transactions/getExpense`
    );
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axiosSetter.delete(
      `${BASE_URL}transactions/deleteExpense/${id}`
    );
    getExpenses();
  };

  const totalExpenses = async () => {
    const responseExpense = await axiosSetter.get(
      `${BASE_URL}transactions/getExpense`
    );
    return responseExpense;
  };

  const transactionHistory = async (responseIncome, responseExpense) => {
    // const responseExpense = await axiosSetter.get(
    //   `${BASE_URL}transactions/getExpense`
    // );
    // const responseIncome = await axiosSetter.get(
    //   `${BASE_URL}transactions/getIncome`
    // );
    const history = [...responseExpense.data, ...responseIncome.data];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history;
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
        transactionHistory,
        error,
        setError,
        login,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
