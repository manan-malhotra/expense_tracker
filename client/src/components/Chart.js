import React, { useEffect } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { tokens } from "../styles/theme";
import { useTheme } from "@mui/material";

import { dateFormat } from "../utils/dateFormat";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
        borderWidth: 1,
        borderColor: "green",
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
        borderWidth: 1,
        borderColor: "red",
      },
    ],
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: `${colors.primary[400]}`,
      }}
    >
      <Line data={data} />
    </div>
  );
}

const ChartStyled = styled.div`
  background: #000000;
  height: 100%;
  width: 100%;
`;

export default Chart;
