// LIB
import { useContext, useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

// CONTEXT
import MovieContext from "../context/MovieContext";

// DATA
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function Modal({ modal, setModal, banner, person }) {
  const [url, setUrl] = useState("");

  const [trailerIndex, setTrailerIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [errorText, setErrorText] = useState("");
  const { movie } = useContext(MovieContext);

  // NOTES GETS LIST OF VIDEOS FROM MOVIES
  const movieVideos = movie.videos.results;
  // NOTES FILTERS LIST SO ONLY RETURNS TRAILERS
  const trailers = movieVideos.filter((video) => {
    return video.type === "Trailer";
  });

  // NOTES CHANGES INDEX onClick, WHICH IN TURN CHANGES URL LINK WHICH SELECTS WHICH VIDEO IS BEING PLAYED
  const setNewTrailerIndex = (dir) => {
    const trailerLen = trailers.length;

    switch (dir) {
      case "left":
        if (trailerIndex === 0) {
          setTrailerIndex(trailerLen - 1);
          const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
          setUrl(url);
          return;
        } else {
          setTrailerIndex(trailerIndex - 1);
          const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
          setUrl(url);
          return;
        }
      case "right":
        if (trailerIndex === trailerLen - 1) {
          setTrailerIndex(0);
          const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
          setUrl(url);
          return;
        } else {
          setTrailerIndex(trailerIndex + 1);
          const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
          setUrl(url);
          return;
        }
    }
  };

  const setNewImageIndex = (dir) => {
    const personImgLen = person.images.profiles.length;

    switch (dir) {
      case "left":
        if (imageIndex === 0) {
          setImageIndex(personImgLen - 1);
          const url = `${BASE_IMAGE_URL}${person.images.profiles[imageIndex].file_path}`;
          setImageUrl(url);
          return;
        } else {
          setImageIndex(imageIndex - 1);
          const url = `${BASE_IMAGE_URL}${person.images.profiles[imageIndex].file_path}`;
          setImageUrl(url);
          return;
        }
      case "right":
        if (imageIndex === personImgLen - 1) {
          setImageIndex(0);
          const url = `${BASE_IMAGE_URL}${person.images.profiles[imageIndex].file_path}`;
          setImageUrl(url);
          return;
        } else {
          setImageIndex(imageIndex + 1);
          const url = `${BASE_IMAGE_URL}${person.images.profiles[imageIndex].file_path}`;
          setImageUrl(url);
          return;
        }
    }
  };

  useEffect(() => {
    // CHECKS IF THERE IS ANY AVAILABLE TRAILERS IF NOT SHOW ERROR TEXT ELSE SHOW VIDEO OF INDEX[1] -- NOTES IF IT COMES FROM THE BANNER MODULE
    if (banner) {
      if (trailers.length === 0) {
        setErrorText("No Trailers Available");
      } else {
        const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
        setUrl(url);
      }
    }
    if (person) {
      if (person.images.profiles.length === 0) {
        setErrorText("No Images Available");
        return;
      } else {
        const url = `${BASE_IMAGE_URL}${person.images.profiles[imageIndex].file_path}`;
        if (url === undefined) {
          console.log("undefined");
        }
        setImageUrl(url);
      }
    }
  }, []);

  // CLOSE MODAL ON ESC
  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      if (modal) return setModal(false);
    }
    return;
  });

  return (
    <>
      {banner && (
        <div className="fixed flex items-center justify-center top-0 w-full h-screen bg-black z-10 overflow-hidden">
          <button
            className="absolute top-[16px] right-[16px] flex text-sm md:text-xl items-center p-4 bg-black hover:bg-gradient-to-r from-cyan-500 to-blue-500"
            onClick={() => setModal(!modal)}
          >
            <AiFillCloseSquare className="text-3xl" />
          </button>
          {trailers.length > 1 && (
            <>
              <button
                className="absolute top-[46%] left-[10rem] flex text-sm md:text-xl items-center p-4 bg-black bg-gradient-to-r from-cyan-500 to-blue-500"
                id="nextLeft"
                onClick={() => setNewTrailerIndex("left")}
              >
                <BsFillArrowLeftSquareFill />
              </button>
              <button
                className="absolute top-[46%] right-[10rem] flex text-sm md:text-xl items-center p-4 bg-black bg-gradient-to-r from-cyan-500 to-blue-500"
                id="nextRight"
                onClick={() => setNewTrailerIndex("right")}
              >
                <BsFillArrowRightSquareFill />
              </button>
            </>
          )}
          {url && (
            <>
              <iframe
                src={url}
                width="1200"
                height="800"
                allowFullScreen
                allow="autoplay"
                title="Banner Trailer"
              ></iframe>
            </>
          )}
          {errorText && (
            <h1 className="bg-gradient-to-r from-pink-500 to-red-500 px-12 py-6 text-4xl">
              {errorText}
            </h1>
          )}
        </div>
      )}
      {person && (
        <div className="fixed flex items-center justify-center top-0 w-full h-screen bg-black z-20 overflow-hidden">
          <button
            className="absolute top-[16px] right-[16px] flex text-sm md:text-xl items-center p-4 bg-black hover:bg-gradient-to-r from-cyan-500 to-blue-500"
            onClick={() => setModal(!modal)}
          >
            <AiFillCloseSquare className="text-3xl" />
          </button>
          {person.images.profiles.length > 1 && (
            <>
              <button
                className="absolute top-[46%] left-[10rem] flex text-sm md:text-xl items-center p-4 bg-black bg-gradient-to-r from-cyan-500 to-blue-500"
                id="nextLeft"
                onClick={() => setNewImageIndex("left")}
              >
                <BsFillArrowLeftSquareFill />
              </button>
              <button
                className="absolute top-[46%] right-[10rem] flex text-sm md:text-xl items-center p-4 bg-black bg-gradient-to-r from-cyan-500 to-blue-500"
                id="nextRight"
                onClick={() => setNewImageIndex("right")}
              >
                <BsFillArrowRightSquareFill />
              </button>
            </>
          )}
          <img src={imageUrl} className="object-contain w-[400px] h-[666px]" />
        </div>
      )}
    </>
  );
}

export default Modal;
