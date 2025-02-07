import { LazyLoadImage } from "react-lazy-load-image-component";
import { useImage } from "../hooks/useImage";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, alt }: { src: string; alt: string }) => {
  const { isLoading } = useImage(src);

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <span
          role="status"
          className="loading loading-spinner loading-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        ></span>
      )}
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        width="100%"
        height="100%"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Image;
