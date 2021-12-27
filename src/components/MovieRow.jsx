// LIB
import { useEffect, useState, useContext } from "react";

// COMP
import MovieRowItem from "./MovieRowItem";
import Loading from "./Loading";

// STATE
import LoadingContext from "../context/LoadingContext";
// ENV
const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;

function MovieRow({ title, fetchUrl, isLargeRow }) {
  const [rowMovies, setRowMovies] = useState([]);

  const { loading, setLoadingFalse, setLoadingTrue } =
    useContext(LoadingContext);

  useEffect(() => {
    const getMovies = async (fetchUrl) => {
      setLoadingTrue();
      const response = await fetch(`${TMDB_FETCHURL}/${fetchUrl}`);
      const dataRepsonse = await response.json();
      const data = dataRepsonse.results;
      setRowMovies(data);
      setTimeout(() => {
        setLoadingFalse();
      }, 1000);
    };
    getMovies(fetchUrl);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    // ROW
    <div
      className="flex flex-row w-screen overflow-auto px-8 py-4"
      id="movie-row-scroll"
    >
      {rowMovies.map((movie) => {
        return (
          <MovieRowItem
            isLargeRow={isLargeRow}
            key={movie.id}
            movieDetails={movie}
            title={title}
          />
        );
      })}
    </div>
  );
}

export default MovieRow;
