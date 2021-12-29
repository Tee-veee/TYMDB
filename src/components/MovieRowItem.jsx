// LIB
import { Link } from "react-router-dom";
import { useContext } from "react";
// CONTEXT
import MovieContext from "../context/MovieContext";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

// NOTES -- PROPS FROM MovieRow.jsx
function MovieRowItem({ movieDetails, isLargeRow }) {
  const { getMovie } = useContext(MovieContext);
  const {
    poster_path,
    backdrop_path,
    title,
    release_date,
    name,
    original_name,
    id,
  } = movieDetails;

  return (
    <div className="flex flex-row mr-6">
      <Link to={`/moviedetails/${id}`}>
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
          onClick={() => getMovie(id, release_date)}
        />
      </Link>
    </div>
  );
}

export default MovieRowItem;
