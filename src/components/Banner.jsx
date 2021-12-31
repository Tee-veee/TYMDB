// LIB
import React, { useContext, useState, useEffect } from "react";
import { MdLocalMovies } from "react-icons/md";

// COMP
import Loading from "./Loading";
import Modal from "./Modal";

// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";

// ENV
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

// NOTES -- PROPS FROM Home.jsx
function Banner({ homePage }) {
  const [modal, setModal] = useState(false);

  // NOTES TODO -- WHEN FUNCTION CALLED ADD MOVIE TO LOCAL STORAGE
  const { movie, getBannerMovie, dispatchMovies } = useContext(MovieContext);
  const { loading, setLoadingFalse, setLoadingTrue } =
    useContext(LoadingContext);

  // TRIM OVERVIEW TEXT SO IT FITS IN BANNER
  const truncateStr = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // FUNCTION THAT SETS FIRST MOVIE ON PAGE LOAD
  // CHECKS IF MOVIE ALREADY STORED IN SESSION DATA OR NOT, IF SO SETS SESSION DATA MOVIE TO GLOBAL STATE
  useEffect(() => {
    setLoadingTrue();
    if (sessionStorage.getItem("movie") === null) {
      getBannerMovie();
    } else {
      setLoadingTrue();
      const getSessionData = () => {
        const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));

        dispatchMovies({
          type: "SET_MOVIE",
          payload: sessionMovie,
        });

        return;
      };
      getSessionData();
      setLoadingFalse();
      return;
    }
    /* eslint-disable-next-line */
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <header
      className={`"w-full bg-black relative ${
        homePage ? "h-[56vh]" : "h-[35vh]"
      }`}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BASE_IMAGE_URL}${
          movie.backdrop_path ? movie.backdrop_path : movie.poster_path
        })`,
        backgroundPosition: "90% 10%",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
      }}
    >
      {modal && <Modal modal={modal} setModal={setModal} banner />}
      <div className="p-4 md:p-12 h-full">
        <h1 className="text-md md:text-4xl pt-4 pb-2 mt-8 px-4 w-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        {homePage && (
          <>
            <div className="text-xs md:text-xl bg-black w-9/12 md:w-4/12 p-4 mt-4">
              <h3>{truncateStr(movie?.overview, 180)}</h3>
            </div>

            <div className="flex mt-4 w-fit">
              <button
                className="flex text-sm md:text-xl items-center p-4 bg-black  hover:bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => setModal(true)}
              >
                <p className="mr-2">Play Trailer</p>
                <MdLocalMovies className="text-lg md:text-4xl" />
              </button>
            </div>
          </>
        )}
        {!homePage && (
          <>
            <div className="flex mt-4 w-fit">
              <button
                className="flex text-sm md:text-xl items-center p-4 bg-black  hover:bg-gradient-to-r from-cyan-500 to-blue-500"
                onClick={() => setModal(true)}
              >
                <p className="mr-2">Play Trailer</p>
                <MdLocalMovies className="text-lg md:text-4xl" />
              </button>
            </div>
          </>
        )}
      </div>
      {!modal && (
        <div
          className="h-[5vw] w-full absolute bottom-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent, #111111, black)",
          }}
        ></div>
      )}
    </header>
  );
}

export default Banner;
