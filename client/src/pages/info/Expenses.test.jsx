import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Expenses from "./Expenses";

jest.mock("../../context/globalContext", () => ({
  useGlobalContext: () => ({
    expenses: [
      {
        _id: 1,
        title: "Expense 1",
        amount: 100,
        date: "2024-01-01",
        description: "Description 1",
        category: "Category 1",
      },
      {
        _id: 2,
        title: "Expense 2",
        amount: 200,
        date: "2024-01-01",
        description: "Description 2",
        category: "Category 2",
      },
    ],
    getExpenses: jest.fn(),
  }),
}));

describe("Expenses component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Expenses />
      </Router>
    );
    expect(screen.getByText("Expense")).toBeTruthy();
    expect(
      screen.getByText("List of Expenses for Future Reference")
    ).toBeTruthy();
  });

  it("renders DataGrid with correct rows and columns", () => {
    render(
      <Router>
        <Expenses />
      </Router>
    );
    expect(screen.getByRole("grid")).toBeTruthy();
    expect(screen.getByText("Expense 1")).toBeTruthy();
    expect(screen.getByText("Expense 2")).toBeTruthy();
  });
  it('renders "Add Expense" link', () => {
    render(
      <Router>
        <Expenses />
      </Router>
    );
    const addExpenseLink = screen.getByText("Add Expense");
    expect(addExpenseLink).toBeTruthy();
    expect(addExpenseLink.tagName).toBe("A");
    expect(addExpenseLink.getAttribute("href")).toBe("/expenseform");
  });
});
