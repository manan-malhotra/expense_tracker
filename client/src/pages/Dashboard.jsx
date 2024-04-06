import { Header, StatBox, Chart } from "../components";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { mockTransactions } from "../constants/mockData";
import { tokens } from "../styles/theme";
import React, { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useGlobalContext } from "../context/globalContext";

const Dashboard = () => {
  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    transactionHistory,
    numberOfTransactions,
  } = useGlobalContext();
  const [history, setHistory] = useState([]);
  const [totalI, setTotalI] = useState(0);
  const [totalE, setTotalE] = useState(0);
  const [totalAvailableBalance, setTotalAvailableBalance] = useState(0);
  const [num, setNum] = useState(0);
  useEffect(() => {
    totalIncome().then((income) => {
      setTotalI(income);
    });
    totalExpenses().then((expense) => {
      setTotalE(expense);
    });
    totalBalance().then((balance) => {
      setTotalAvailableBalance(balance);
    });
    numberOfTransactions().then((num) => {
      setNum(num);
    });
    transactionHistory().then((history) => {
      setHistory(history);
    });
  }, []);

  console.log(totalAvailableBalance, totalI, totalE);
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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            increase={
              "+" + ((totalI / totalAvailableBalance) * 100).toFixed(0) + "%"
            }
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
          {history.map((transaction, i) => (
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
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ₹ {transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
