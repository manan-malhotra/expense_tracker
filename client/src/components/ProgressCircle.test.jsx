import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressCircle from "./ProgressCircle";
import "@testing-library/jest-dom";

describe("ProgressCircle component", () => {
  test("renders with default progress and size", () => {
    render(<ProgressCircle />);

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeTruthy();

    expect(progressCircle).toHaveStyle({ width: "40px", height: "40px" });
  });

  test("renders with custom progress and size", () => {
    render(<ProgressCircle progress="0.5" size="60" />);

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeTruthy();

    expect(progressCircle).toHaveStyle({ width: "60px", height: "60px" });
  });
});
