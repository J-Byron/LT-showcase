import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAlbums } from "../api/albums";
import { Album } from "../types/Album";

export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
    staleTime: Infinity,
    cacheTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  } as UseQueryOptions<Album[], Error>);
};
