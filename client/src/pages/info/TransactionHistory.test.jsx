import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionHistory from "./TransactionHistory";

const mockHistory = [
  {
    _id: 1,
    title: "Transaction 1",
    amount: 100,
    date: "2024-04-08",
    type: "expense",
    description: "Test Description",
    category: "Test Category",
  },
  {
    _id: 2,
    title: "Transaction 2",
    amount: 200,
    date: "2024-04-09",
    type: "income",
    description: "Test Description",
    category: "Test Category",
  },
];

jest.mock("../../context/globalContext", () => ({
  useGlobalContext: () => ({
    transactionHistory: jest.fn().mockResolvedValue(mockHistory),
  }),
}));

describe("TransactionHistory component", () => {
  it("renders without crashing", async () => {
    render(<TransactionHistory />);
    expect(screen.getByText("Transaction History")).toBeTruthy();
    expect(
      screen.getByText("List of Transactions for Future Reference")
    ).toBeTruthy();
    await screen.findByText("Transaction 1");
    expect(screen.getByText("Transaction 1")).toBeTruthy();
  });

  it("displays transaction history data in DataGrid", async () => {
    render(<TransactionHistory />);

    await screen.findByText("Transaction 1");
    expect(screen.getByRole("grid")).toBeTruthy();
    expect(screen.getByText("Transaction 1")).toBeTruthy();
  });
});
