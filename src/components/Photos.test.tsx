import { renderWithClient } from "../test/utils";
import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import Photos from "./Photos";

// Mock useImage hook
vi.mock("../hooks/useImage", () => ({
  useImage: () => ({ isLoading: false, isError: false }),
}));

describe("Photos", () => {
  const mockPhotos = [
    {
      photoId: 1,
      albumId: 1,
      title: "Test Photo",
      url: "test.jpg",
    },
  ];

  it("renders photos and search", () => {
    renderWithClient(<Photos photos={mockPhotos} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Test Photo")).toBeInTheDocument();
  });

  it("loads and caches photos correctly", async () => {
    const { rerender } = renderWithClient(<Photos photos={mockPhotos} />);
    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test.jpg");
    expect(image).toHaveAttribute("alt", "Test Photo");

    rerender(<Photos photos={mockPhotos} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
