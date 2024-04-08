import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Incomes from "./Incomes";

jest.mock("../../context/globalContext", () => ({
  useGlobalContext: () => ({
    addIncome: jest.fn(),
    incomes: [
      {
        _id: 1,
        title: "Income 1",
        amount: 100,
        date: "2022-01-01",
        description: "Description 1",
        category: "Category 1",
      },
      {
        _id: 2,
        title: "Income 2",
        amount: 200,
        date: "2022-01-01",
        description: "Description 1",
        category: "Category 1",
      },
    ],
    getIncomes: jest.fn(),
    deleteIncome: jest.fn(),
    totalIncome: jest.fn(),
  }),
}));

describe("Income component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Incomes />
      </Router>
    );
    expect(screen.getByText("Income")).toBeTruthy();
    expect(
      screen.getByText("List of Income for Future Reference")
    ).toBeTruthy();
  });

  it("renders DataGrid with correct rows and columns", () => {
    render(
      <Router>
        <Incomes />
      </Router>
    );
    expect(screen.getByRole("grid")).toBeTruthy();
    expect(screen.getByText("Income 1")).toBeTruthy();
    expect(screen.getByText("Income 2")).toBeTruthy();
  });

  it('renders "Add Income" link', () => {
    render(
      <Router>
        <Incomes />
      </Router>
    );
    const addIncomeLink = screen.getByText("Add Income");
    expect(addIncomeLink).toBeTruthy();
    expect(addIncomeLink.tagName).toBe("A");
    expect(addIncomeLink.getAttribute("href")).toBe("/incomeform");
  });
});
