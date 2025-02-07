import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useImage } from "./useImage";
import { createWrapper } from "../test/utils";

describe("useImage", () => {
  let mockImage: { onload: () => void; onerror: () => void; src: string };

  beforeEach(() => {
    mockImage = { onload: () => {}, onerror: () => {}, src: "" };
    vi.stubGlobal(
      "Image",
      vi.fn(() => mockImage)
    );
  });

  it("returns loading state while image is loading", () => {
    const { result } = renderHook(() => useImage("test.jpg"), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("caches successful image loads", async () => {
    const { result } = renderHook(() => useImage("test.jpg"), {
      wrapper: createWrapper(),
    });

    // Trigger the onload callback
    mockImage.onload();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles image load errors", async () => {
    const { result } = renderHook(() => useImage("invalid.jpg"), {
      wrapper: createWrapper(),
    });

    // Trigger the onerror callback
    mockImage.onerror();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
