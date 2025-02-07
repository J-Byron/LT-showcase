import baseApi from "./axiosInstance";
import { Album } from "../types/Album";

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await baseApi.get("/albums");
  return response.data;
};
