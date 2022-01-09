// LIB
import React, { createContext, useReducer, useContext } from "react";
import movieReducer from "./MovieReducer";
import LoadingContext from "./LoadingContext";
// DATA
import {
  rowRequests,
  detailRequests,
  searchRequests,
} from "./endpoints/endpoints";

// ENV
const MovieContext = createContext();
const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;

export const MovieProvider = ({ children }) => {
  // GLOBAL MOVIE STATE
  const initialState = {
    movie: {},
    season: [],
    episode: [],
    collection: [],
    search: [],
  };

  const { setLoadingFalse, setLoadingTrue } = useContext(LoadingContext);

  const [state, dispatchMovies] = useReducer(movieReducer, initialState);

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

  // NOTES -- GETS MOVIE DETAILS
  const getMovie = async (id, releaseDate) => {
    setLoadingTrue();
    // NOTES -- IF MOVIE
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
      // NOTES -- IF TV SHOW
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

  // NOTES -- TV SEASON DETAILS

  const getSeason = async (id, seasonNum) => {
    setLoadingTrue();
    const response = await fetch(
      `${TMDB_FETCHURL}/tv/${id}/season/${seasonNum}${detailRequests.fetchSeasonDetails}`
    );

    const data = await response.json();
    const dataCopy = { ...data };

    dispatchMovies({
      type: "SET_SEASON",
      payload: dataCopy,
    });

    const sessionSeason = window.sessionStorage.getItem("season");
    if (sessionSeason === null) {
      sessionStorage.setItem("season", JSON.stringify(dataCopy));
    } else {
      sessionStorage.removeItem("season");
      sessionStorage.setItem("season", JSON.stringify(dataCopy));
    }
    setLoadingFalse();
    return;
  };

  // NOTES -- TV EPISODE DETAILS

  const getEpisode = async (movieID, seasonNum, episodeNum) => {
    setLoadingTrue();
    const response = await fetch(
      `${TMDB_FETCHURL}/tv/${movieID}/season/${seasonNum}/episode/${episodeNum}${detailRequests.fetchEpisodeDetails}`
    );

    const data = await response.json();
    const dataCopy = { ...data };
    console.log(dataCopy);
    dispatchMovies({
      type: "SET_EPISODE",
      payload: dataCopy,
    });

    const sessionSeason = window.sessionStorage.getItem("episode");
    if (sessionSeason === null) {
      sessionStorage.setItem("episode", JSON.stringify(dataCopy));
    } else {
      sessionStorage.removeItem("episode");
      sessionStorage.setItem("episode", JSON.stringify(dataCopy));
    }
    setLoadingFalse();
    return;
  };

  // NOTES -- MOVIE COLLECTION DETAILS

  const getCollection = async (collectionID) => {
    setLoadingTrue();
    const response = await fetch(
      `${TMDB_FETCHURL}/collection/${collectionID}${detailRequests.fetchCollectionDetails}`
    );
    const data = await response.json();
    const dataCopy = { ...data };

    dispatchMovies({
      type: "SET_COLLECTION",
      payload: dataCopy,
    });

    const sessionCollection = window.sessionStorage.getItem("collection");
    if (sessionCollection === null) {
      sessionStorage.setItem("collection", JSON.stringify(dataCopy));
    } else {
      sessionStorage.removeItem("collection");
      sessionStorage.setItem("collection", JSON.stringify(dataCopy));
    }
    setLoadingFalse();
    return;
  };

  const getSearchMovies = async (searchText, pageNum) => {
    setLoadingTrue();

    const response = await fetch(
      `${TMDB_FETCHURL}/search/multi${searchRequests.searchAllRequest}query=${searchText}&page=${pageNum}&include_adult=false`
    );

    const data = await response.json();
    const dataCopy = { ...data };

    dispatchMovies({
      type: "SET_SEARCH",
      payload: dataCopy,
    });

    const sessionSearch = window.sessionStorage.getItem("search");
    if (sessionSearch === null) {
      sessionStorage.setItem("search", JSON.stringify(dataCopy));
    } else {
      sessionStorage.removeItem("search");
      sessionStorage.setItem("search", JSON.stringify(dataCopy));
    }
    setLoadingFalse();
    return;
  };

  // STATE WRAP
  return (
    <MovieContext.Provider
      value={{
        ...state,
        getMovie,
        getBannerMovie,
        dispatchMovies,
        getSeason,
        getEpisode,
        getCollection,
        getSearchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
