// LIB
import { createContext, useReducer } from "react";
import movieReducer from "./MovieReducer";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const initialState = {
    movie: {},
  };

  const [state, dispatchMovies] = useReducer(movieReducer, initialState);

  const getMovie = (id, releaseDate) => {
    console.log(id);
    if (releaseDate) {
      return console.log("movie");
    }
    return console.log("tv");
  };

  return (
    <MovieContext.Provider value={{ ...state, getMovie, dispatchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
