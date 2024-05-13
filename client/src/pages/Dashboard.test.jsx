import { act, render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import Chart from "../components/Chart";

jest.mock("../components/Chart", () => () => (
  <div data-testid="mock-chart"></div>
));

jest.mock("../context/globalContext", () => {
  return {
    useGlobalContext: () => ({
      totalIncome: jest.fn().mockResolvedValue({ data: [{ amount: 100 }] }),
      totalExpenses: jest.fn().mockResolvedValue({ data: [{ amount: 200 }] }),
      transactionHistory: jest.fn().mockResolvedValue([]),
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
