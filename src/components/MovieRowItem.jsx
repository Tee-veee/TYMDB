// LIB
import { link } from "react";
import { useContext } from "react";
// CONTEXT
import MovieContext from "../context/MovieContext";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function MovieRowItem({ movieDetails, isLargeRow }) {
  const { getMovie } = useContext(MovieContext);
  const {
    poster_path,
    backdrop_path,
    title,
    release_date,
    name,
    original_name,
  } = movieDetails;

  return (
    // ROW POSTERS
    <div className="flex flex-row mr-6">
      {/* ROW POSTER */}
      <img
        className="w-full object-contain min-w-[250px] hover:scale-[1.06] hover:transition-all cursor-pointer"
        src={`${BASE_IMAGE_URL}${
          isLargeRow
            ? poster_path
            : backdrop_path === null
            ? "/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg"
            : backdrop_path
        }`}
        alt={name ? name : title ? title : original_name}
        onClick={() => getMovie(movieDetails, release_date)}
      />
    </div>
  );
}

export default MovieRowItem;
