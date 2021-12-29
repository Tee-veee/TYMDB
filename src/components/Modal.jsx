// LIB
import { useContext, useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

// CONTEXT
import MovieContext from "../context/MovieContext";

function Modal({ modal, setModal }) {
  const [url, setUrl] = useState("");
  const [errorText, setErrorText] = useState("");
  const [trailerIndex, setTrailerIndex] = useState(0);

  const { movie } = useContext(MovieContext);

  // NOTES GETS LIST OF VIDEOS FROM MOVIES
  const movieVideos = movie.videos.results;
  // NOTES FILTERS LIST SO ONLY RETURNS TRAILERS
  const trailers = movieVideos.filter((video) => {
    return video.type === "Trailer";
  });

  // NOTES CHANGES INDEX onClick, WHICH IN TURN CHANGES URL LINK WHICH SELECTS WHICH VIDEO IS BEING PLAYED
  const setNewIndex = (dir) => {
    const trailerLen = trailers.length;
    const currIndex = trailerIndex;
    if (trailerLen <= 1) {
      return;
    } else {
      switch (dir) {
        case "left":
          if (currIndex === 0) {
            setTrailerIndex(trailerLen - 1);
            const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
            return setUrl(url);
          } else {
            setTrailerIndex(currIndex - 1);
            const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
            return setUrl(url);
          }
        case "right":
          if (currIndex === trailerLen - 1) {
            setTrailerIndex(0);
            const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
            return setUrl(url);
          } else {
            setTrailerIndex(currIndex + 1);
            const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
            return setUrl(url);
          }
      }
    }
  };

  // CHECKS IF THERE IS ANY AVAILABLE TRAILERS IF NOT SHOW ERROR TEXT ELSE SHOW VIDEO OF INDEX[1]
  useEffect(() => {
    if (trailers.length === 0) {
      setErrorText("No Trailers Available");
    } else {
      const url = `https://www.youtube.com/embed/${trailers[trailerIndex].key}?autoplay=1&controls=1`;
      setUrl(url);
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
            onClick={() => setNewIndex("left")}
          >
            <BsFillArrowLeftSquareFill />
          </button>
          <button
            className="absolute top-[46%] right-[10rem] flex text-sm md:text-xl items-center p-4 bg-black bg-gradient-to-r from-cyan-500 to-blue-500"
            id="nextRight"
            onClick={() => setNewIndex("right")}
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
  );
}

export default Modal;
