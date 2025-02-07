import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Image from "./Image";
import { renderWithClient } from "../test/utils";

vi.mock("react-lazy-load-image-component", () => ({
  LazyLoadImage: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className: string;
  }) => (
    <img src={src} alt={alt} className={className} data-testid="lazy-image" />
  ),
}));

describe("Image", () => {
  const mockProps = {
    src: "test-image.jpg",
    alt: "Test Image",
  };

  it("renders with loading spinner initially", () => {
    renderWithClient(<Image {...mockProps} />);

    expect(screen.getByRole("status")).toHaveClass(
      "loading",
      "loading-spinner"
    );

    const image = screen.getByTestId("lazy-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.src);
    expect(image).toHaveAttribute("alt", mockProps.alt);
  });

  it("applies correct classes to wrapper and image", () => {
    renderWithClient(<Image {...mockProps} />);

    const wrapper = screen.getByTestId("lazy-image").parentElement;
    expect(wrapper).toHaveClass("w-full", "h-full", "relative");

    const image = screen.getByTestId("lazy-image");
    expect(image).toHaveClass("w-full", "h-full", "object-cover");
  });
});
