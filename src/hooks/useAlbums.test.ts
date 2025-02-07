import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAlbums } from "./useAlbums";
import { fetchAlbums } from "../api/albums";
import { createWrapper } from "../test/utils";

vi.mock("../api/albums");
const mockedFetchAlbums = vi.mocked(fetchAlbums);

describe("useAlbums", () => {
  const mockAlbums = [
    {
      albumId: 1,
      photos: [
        {
          photoId: 1,
          albumId: 1,
          title: "Test Photo",
          url: "test.jpg",
        },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches albums successfully", async () => {
    mockedFetchAlbums.mockResolvedValue(mockAlbums);

    const { result } = renderHook(() => useAlbums(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockAlbums);
    expect(fetchAlbums).toHaveBeenCalledTimes(1);
  });

  it("handles error state", async () => {
    const error = new Error("Failed to fetch albums");
    mockedFetchAlbums.mockRejectedValue(error);

    const { result } = renderHook(() => useAlbums(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe("Failed to fetch albums");
  });

  it("caches data and prevents refetch", async () => {
    mockedFetchAlbums.mockResolvedValue(mockAlbums);

    const { result, rerender } = renderHook(() => useAlbums(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAlbums);
    });

    rerender();

    expect(fetchAlbums).toHaveBeenCalledTimes(1);
  });
});
