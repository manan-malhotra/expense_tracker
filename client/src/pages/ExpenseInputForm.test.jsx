import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ExpenseInputForm from "./ExpenseInputForm";
import { useGlobalContext } from "../context/globalContext";

jest.mock("../context/globalContext", () => ({
  useGlobalContext: () => ({
    addExpense: jest.fn(),
    expenses: [],
  }),
}));

describe("ExpenseInputForm component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <ExpenseInputForm />
      </Router>
    );

    expect(screen.getByText("ADD Expense")).toBeTruthy();
    expect(screen.getByText("Add a New Expense")).toBeTruthy();
  });

  it("renders input fields properly", () => {
    render(
      <Router>
        <ExpenseInputForm />
      </Router>
    );
    expect(screen.getByLabelText("Title")).toBeTruthy();
    expect(screen.getByLabelText("Date")).toBeTruthy();
    expect(screen.getByLabelText("Amount")).toBeTruthy();
    expect(screen.getByLabelText("Description")).toBeTruthy();
    expect(screen.getByLabelText("Category")).toBeTruthy();
  });

  it("allows user to input values", () => {
    render(
      <Router>
        <ExpenseInputForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2024-04-08" },
    });
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    expect(screen.getByDisplayValue("Test Title")).toBeTruthy();
    expect(screen.getByDisplayValue("2024-04-08")).toBeTruthy();
    expect(screen.getByDisplayValue("100")).toBeTruthy();
    expect(screen.getByDisplayValue("Test Description")).toBeTruthy();
  });

  it("submits the form with correct values", () => {
    render(
      <Router>
        <ExpenseInputForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2024-04-08" },
    });
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    const categorySelect = screen.getByLabelText("Category");
    fireEvent.click(categorySelect);
    fireEvent.keyDown(categorySelect, { key: "ArrowDown" });
    fireEvent.keyDown(categorySelect, { key: "Enter" });

    fireEvent.click(screen.getByText("Add Expense"));
  });
});
