import React from "react";
import { render } from "@testing-library/react";
import StatBox from "./StatBox";
import "@testing-library/jest-dom";

describe("StatBox component", () => {
  it("renders title and subtitle correctly", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";
    const { getByText } = render(<StatBox title={title} subtitle={subtitle} />);
    expect(getByText(title)).toBeTruthy();
    expect(getByText(subtitle)).toBeTruthy();
  });

  it("renders icon if provided", () => {
    const MockIcon = () => <div data-testid="mock-icon">Icon</div>;
    const { getByTestId } = render(<StatBox icon={<MockIcon />} />);
    expect(getByTestId("mock-icon")).toBeTruthy();
  });

  it("renders progress circle if progress is provided", () => {
    const progress = "0.75";
    const { getByTestId } = render(<StatBox progress={progress} />);
    expect(getByTestId("progress-circle")).toBeTruthy();
  });

  it("renders increase value if provided", () => {
    const increase = "+10%";
    const { getByText } = render(<StatBox increase={increase} />);
    expect(getByText(increase)).toBeTruthy();
  });
});
