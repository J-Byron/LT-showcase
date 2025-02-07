import { Photo } from "../types/Photo";
import Image from "./Image";
import { useState } from "react";
const Card = ({ photo }: { photo: Photo }) => {
  return (
    <div className="card bg-base-100 shadow-xl group relative overflow-hidden rounded-2xl basis-[calc(50%-1rem)]">
      <figure className="aspect-square">
        <Image src={photo.url} alt={photo.title} />
      </figure>
      <div className="card-body absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 transform will-change-transform">
        <h2 className="card-title text-sm md:text-base lg:text-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-white transition-all duration-300 ease-out">
          {photo.title}
          <div className="badge badge-primary text-xs md:text-sm">
            {photo.albumId}
          </div>
        </h2>
      </div>
    </div>
  );
};

const Photos = ({ photos }: { photos: Photo[] }) => {
  const [search, setSearch] = useState("");
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.title.toLowerCase().includes(search.toLowerCase()) ||
      photo.photoId.toString().includes(search)
  );
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4 w-full">
        <label className="input input-bordered flex items-center gap-2 mb-8">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.replace(/[^a-z0-9]/gi, ""))
            }
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="grid grid-cols-2 gap-4 w-full">
          {filteredPhotos.map((photo) => (
            <Card key={photo.photoId} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;
