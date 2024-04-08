import { render, act } from "@testing-library/react";
import Dashboard from "./Dashboard";
import Chart from "../components/Chart";

jest.mock("../components/Chart", () => () => (
  <div data-testid="mock-chart"></div>
));

jest.mock("../context/globalContext", () => {
  return {
    useGlobalContext: () => ({
      totalIncome: jest.fn().mockResolvedValue(1000),
      totalExpenses: jest.fn().mockResolvedValue(500),
      totalBalance: jest.fn().mockResolvedValue(500),
      transactionHistory: jest.fn().mockResolvedValue([]),
      numberOfTransactions: jest.fn().mockResolvedValue(0),
      incomes: [
        {
          _id: "6611891bb8623ee40c9e16cd",
          user: "661103ea604430627715c572",
          title: "Test",
          amount: 5000,
          type: "income",
          date: "2023-11-09T00:00:00.000Z",
          category: "investment",
          description: "Random",
          createdAt: "2024-04-06T17:40:43.020Z",
          updatedAt: "2024-04-06T17:40:43.020Z",
          __v: 0,
        },
      ],
      expenses: [
        {
          _id: "6611891bb8623ee40c9e16cd",
          user: "661103ea604430627715c572",
          title: "Test",
          amount: 500,
          type: "expense",
          date: "2023-11-09T00:00:00.000Z",
          category: "investment",
          description: "Random",
          createdAt: "2024-04-06T17:40:43.020Z",
          updatedAt: "2024-04-06T17:40:43.020Z",
          __v: 0,
        },
      ],
      getIncomes: jest.fn(),
      getExpenses: jest.fn(),
      token: "mockToken",
    }),
  };
});

describe("Dashboard component", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<Dashboard />);
    });
  });
  it("renders without crashing", () => {
    render(<Chart />);
  });
});
