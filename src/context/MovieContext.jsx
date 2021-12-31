// LIB
import React, { createContext, useReducer, useContext } from "react";
import movieReducer from "./MovieReducer";
import LoadingContext from "./LoadingContext";
// DATA
import { rowRequests, detailRequests } from "./endpoints/endpoints";

// ENV
const MovieContext = createContext();
const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;

export const MovieProvider = ({ children }) => {
  // GLOBAL MOVIE STATE
  const initialState = {
    movie: {},
  };

  const { setLoadingFalse, setLoadingTrue } = useContext(LoadingContext);

  const [state, dispatchMovies] = useReducer(movieReducer, initialState);

  // TODO - ADD MOVIE ITEM TO LOCAL STORAGE EVERY TIME ITS UPDATED
  // TODO - IDEA ONE - useEffect on this page that updates localstorage every time intialstate is updated
  // TODO - IDEA TWO - add it to getBannerMovie and getMovie function

  // NOTES -- GETS BANNER MOVIE FROM BANNER COMP
  // FETCHES NETFLIX LIST, THEN GEN NUMBER FROM 0-NETFLIX ARR, AND SELECT 1 RANDOM MOVIE FROM LIST BASED OFF NUMBER GEN
  const getBannerMovie = async () => {
    setLoadingTrue();
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
    console.log("ranMovie", randomMovie);
    getMovie(randomMovie[0].id, randomMovie[0].release_date);
  };

  // GETS MOVIE DETAILS
  const getMovie = async (id, releaseDate) => {
    setLoadingTrue();
    // IF MOVIE
    if (releaseDate) {
      const response = await fetch(
        `${TMDB_FETCHURL}/movie/${id}${detailRequests.fetchDetailMovie}`
      );
      const data = await response.json();
      const dataCopy = { ...data };

      dispatchMovies({
        type: "SET_MOVIE",
        payload: dataCopy,
      });
      const sessionMovie = window.sessionStorage.getItem("movie");
      if (sessionMovie === null) {
        sessionStorage.setItem("movie", JSON.stringify(dataCopy));
      } else {
        sessionStorage.clear();
        sessionStorage.setItem("movie", JSON.stringify(dataCopy));
      }
      setLoadingFalse();
      return;
    } else {
      // IF TV SHOW
      const response = await fetch(
        `${TMDB_FETCHURL}/tv/${id}${detailRequests.fetchDetailTv}`
      );
      const data = await response.json();
      const dataCopy = { ...data };

      dispatchMovies({
        type: "SET_MOVIE",
        payload: dataCopy,
      });
      const sessionMovie = window.sessionStorage.getItem("movie");
      if (sessionMovie === null) {
        sessionStorage.setItem("movie", JSON.stringify(dataCopy));
      } else {
        sessionStorage.removeItem("movie");
        sessionStorage.setItem("movie", JSON.stringify(dataCopy));
      }
      setLoadingFalse();
      return;
    }
  };

  // STATE WRAP
  return (
    <MovieContext.Provider
      value={{
        ...state,
        getMovie,
        getBannerMovie,
        dispatchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
