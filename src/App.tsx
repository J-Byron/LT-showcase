import { useState } from "react";
import { useAlbums } from "./hooks/useAlbums";
import { Photo } from "./types/Photo";
import Photos from "./components/Photos";
import Home from "./components/Home";
import "./App.css";

type ActiveItem = {
  view: "photos" | "home";
  type: "home" | "photos" | "album";
  albumId?: number;
};

function App() {
  const [activeItem, setActiveItem] = useState<ActiveItem>({
    view: "home",
    type: "home",
  });
  const { data: albums, isLoading } = useAlbums();
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleAlbumClick = async (albumId: number) => {
    setActiveItem({ view: "photos", type: "album", albumId });
    const album = albums?.find((album) => album.albumId === albumId);
    setPhotos(album?.photos || []);
  };

  const handlePhotoClick = () => {
    setActiveItem({ view: "photos", type: "photos" });
    const allPhotos = albums?.flatMap((album) => album.photos) || [];
    setPhotos(allPhotos);
  };

  const handleHomeClick = () => {
    setActiveItem({ view: "home", type: "home" });
    setPhotos([]);
  };

  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content w-full flex flex-col items-center p-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button md:hidden w-full mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
          {activeItem.view === "photos" && <Photos photos={photos} />}
          {activeItem.view === "home" && <Home />}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <span
                className={activeItem.type === "home" ? "text-primary" : ""}
                onClick={handleHomeClick}
              >
                Home
              </span>
            </li>
            <li>
              <span
                className={activeItem.type === "photos" ? "text-primary" : ""}
                onClick={handlePhotoClick}
              >
                Photos
              </span>
            </li>
            <li>
              <h2 className="menu-title">Albums</h2>
              <ul>
                {isLoading ? (
                  <span className="loading loading-spinner loading-xs ml-2"></span>
                ) : (
                  albums
                    ?.sort((a, b) => b.albumId - a.albumId)
                    .map((album) => (
                      <li key={album.albumId}>
                        <span
                          className={
                            activeItem.type === "album" &&
                            activeItem.albumId === album.albumId
                              ? "text-primary"
                              : ""
                          }
                          onClick={() => handleAlbumClick(album.albumId)}
                        >
                          {album.albumId}
                        </span>
                      </li>
                    ))
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
