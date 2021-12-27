// LIB
import { useContext, useState, useEffect } from "react";
import { MdLocalMovies, MdMore } from "react-icons/md";

// COMP
import Loading from "./Loading";
import Modal from "./Modal";

// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";

// DATA
import { rowRequests } from "../context/endpoints/endpoints";

// ENV
const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [bannerMovie, setBannerMovie] = useState([]);
  const [modal, setModal] = useState(false);

  const { movie, dispatchMovies } = useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  // TRIM OVERVIEW TEXT
  const truncateStr = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // LOAD STATE
  useEffect(() => {
    if (Object.entries(movie).length === 0) {
      // NOTES TODO -- REFACTOR FUNCTION INTO MOVIE CONTEXT

      const getBannerMovie = async () => {
        const response = await fetch(
          `${TMDB_FETCHURL}/${rowRequests.fetchNetflix}`
        );

        const dataResponse = await response.json();
        const dataResults = dataResponse.results;

        const randomNum = Math.floor(Math.random() * dataResults.length);
        let randomMovie;
        if (randomNum === 0) {
          randomMovie = dataResults.slice(0, 1);
        } else {
          randomMovie = dataResults.slice(randomNum - 1, randomNum);
        }

        dispatchMovies({
          type: "SET_MOVIE",
          payload: randomMovie,
        });
      };
      getBannerMovie();
    } else {
      setBannerMovie(movie);
    }
  }, []);

  useEffect(() => {
    setBannerMovie(movie[0]);
  }, [movie]);

  if (loading) {
    return <Loading />;
  }

  return (
    <header
      className="w-full bg-black h-[70vh] md:h-[56vh] relative"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${BASE_IMAGE_URL}${
          bannerMovie?.backdrop_path || bannerMovie?.poster_path
        })`,
        backgroundPosition: "90% 10%",
        objectFit: "cover",
      }}
    >
      {modal && <Modal modal={modal} setModal={setModal} />}
      <div className="p-4 md:p-12 mt-12 md:mt-8 h-full">
        <h1 className="text-2xl md:text-4xl pt-4 pb-2 px-4 w-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
          {bannerMovie?.name ||
            bannerMovie?.title ||
            bannerMovie?.original_name}
        </h1>
        <div className="text-sm md:text-xl bg-black w-9/12 md:w-4/12 p-4 mt-2">
          <h3>{truncateStr(bannerMovie?.overview, 180)}</h3>
        </div>

        <div className="flex mt-2 w-fit">
          <button
            className="flex text-sm md:text-xl items-center p-4 bg-black  hover:bg-gradient-to-r from-cyan-500 to-blue-500"
            onClick={() => setModal(true)}
          >
            <p className="mr-2">Play Trailer</p>
            <MdLocalMovies className="text-lg md:text-4xl" />
          </button>
          <button className="flex text-sm md:text-xl items-center p-4 md:ml-2 bg-black hover:bg-gradient-to-r from-cyan-500 to-blue-500">
            <p className="mr-2">View Details</p>
            <MdMore className="text-lg md:text-4xl" />
          </button>
        </div>
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
