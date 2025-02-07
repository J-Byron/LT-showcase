import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const imageCache = new Map<string, string>();

const loadImage = (src: string): Promise<string> => {
  if (imageCache.has(src)) {
    return Promise.resolve(src);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache.set(src, src);
      resolve(src);
    };
    img.onerror = reject;
  });
};

export const useImage = (src: string) => {
  return useQuery({
    queryKey: ["image", src],
    queryFn: () => loadImage(src),
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData: imageCache.has(src) ? src : undefined,
  } as UseQueryOptions<string, Error>);
};
