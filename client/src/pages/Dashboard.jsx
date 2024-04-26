import { Header, StatBox, Chart } from "../components";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../styles/theme";
import React, { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useGlobalContext } from "../context/globalContext";
import { dateFormat } from "../utils/dateFormat";

const Dashboard = () => {
  const { totalIncome, totalExpenses, transactionHistory } = useGlobalContext();
  const [history, setHistory] = useState([]);
  const [totalI, setTotalI] = useState(0);
  const [totalE, setTotalE] = useState(0);
  const [totalAvailableBalance, setTotalAvailableBalance] = useState(0);
  const [num, setNum] = useState(0);
  const getData = async () => {
    const responseIncome = await totalIncome();
    const responseExpense = await totalExpenses();
    let incomes = 0;
    let expenses = 0;
    responseIncome.data.forEach((i) => {
      incomes = incomes + i.amount;
    });
    responseExpense.data.forEach((expense) => {
      expenses = expenses + expense.amount;
    });
    setTotalI(incomes);
    setTotalE(expenses);
    setTotalAvailableBalance(incomes - expenses);
    const hist = await transactionHistory(responseIncome, responseExpense);
    setHistory(hist);
    setNum(hist.length);
  };
  useEffect(() => {
    getData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"₹ " + totalAvailableBalance}
            subtitle="Total Balance"
            icon={
              <AccountBalanceIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"₹ " + totalI}
            subtitle="Income"
            progress={totalI / totalAvailableBalance}
            increase={""}
            icon={
              <AttachMoneyIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"₹ " + totalE}
            subtitle="Expenses"
            progress={totalE / totalAvailableBalance}
            increase={
              "+" + ((totalE / totalAvailableBalance) * 100).toFixed(0) + "%"
            }
            icon={
              <ShoppingCartIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={num}
            subtitle="Total Transactions"
            icon={
              <ReceiptIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px",
                }}
              />
            }
          />
        </Box>

        {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}
        <Box
          gridColumn="span 8"
          height="60vh"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="30px"
            p="0 30px"
            // display="flex"
            // justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ₹ {totalI}
              </Typography>
            </Box>
            <Box>
              <IconButton></IconButton>
            </Box>
          </Box>
          <Box height="50vh" m="0px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            <Chart />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          height="60vh"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {history && history.length > 0 ? (
            history.map((transaction, i) => (
              <Box
                key={`${transaction._id}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.title}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.type.toUpperCase()}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {dateFormat(transaction.date)}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ₹ {transaction.amount}
                </Box>
              </Box>
            ))
          ) : (
            <Typography
              color={colors.grey[100]}
              variant="body1"
              textAlign="center"
              p="20px"
            >
              No transactions found
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
