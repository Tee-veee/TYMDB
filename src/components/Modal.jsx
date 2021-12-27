// LIB
import { useContext, useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

// CONTEXT
import MovieContext from "../context/MovieContext";

// DATA
import { detailRequests } from "../context/endpoints/endpoints";

const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;

function Modal({ modal, setModal }) {
  const [url, setUrl] = useState("");
  const [errorText, setErrorText] = useState("");
  const { movie } = useContext(MovieContext);

  useEffect(() => {
    // NOTES TODO -- REFACTOR CODE INTO MOVIE CONTEXT

    const getMovieDetails = async () => {
      const response = await fetch(
        `${TMDB_FETCHURL}/tv/${movie[0].id}${detailRequests.fetchDetailTv}`
      );

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.videos.results.length === 0) {
        setErrorText("No Videos Available");
        setUrl("");
      } else {
        // NOTES TODO -- WRITE FUNCTION THAT LOOPS THROUGH VID ARRAY AND CHECKS TEXT FOR 'OFFICIAL TRAILER' -> THEN SELECTS THAT VIDEO
        const url =
          "https://www.youtube.com/embed/" +
          responseData.videos.results[0].key +
          "?autoplay=1&controls=1";

        setUrl(url);
        setErrorText("");
        return;
      }
    };
    getMovieDetails();
  }, []);

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      if (modal) return setModal(false);
    }
    return;
  });

  return (
    <div className="fixed flex items-center justify-center top-0 w-full h-screen bg-black z-10">
      <button
        className="absolute top-[16px] right-[16px] flex text-sm md:text-xl items-center p-4 bg-black hover:bg-gradient-to-r from-cyan-500 to-blue-500"
        onClick={() => setModal(!modal)}
      >
        <AiFillCloseSquare className="text-3xl" />
      </button>
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
