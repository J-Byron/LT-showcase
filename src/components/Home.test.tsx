import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText("Hello there 👋")).toBeInTheDocument();
  });
});
