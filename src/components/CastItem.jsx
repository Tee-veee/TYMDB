import { useContext } from "react/cjs/react.development";
import MovieContext from "../context/MovieContext";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function CastItem({ castMem, castDetails, crewDetails, crewMem }) {
  const { movie } = useContext(MovieContext);
  return (
    <>
      {/* ADD ON CLICK TO NEW PAGE /PERSONSPAGE/ */}
      {castDetails && (
        <div className="flex items-center mt-2 mb-2 hover:bg-gradient-to-r from-cyan-500 to-blue-500  hover:transition-all rounded-xl">
          <img
            alt="Cast Member"
            src={`${BASE_IMAGE_URL}${
              castMem.profile_path ? castMem.profile_path : movie.poster_path
            }`}
            className="h-[150px] w-[100px] object-contain rounded-xl"
          />
          <div className="flex flex-col ml-4">
            <h1 className="mb-2 text-2xl">
              {castMem.name ? castMem.name : castMem.original_name}
            </h1>
            <h1>{castMem.character}</h1>
          </div>
        </div>
      )}
      {/* ADD ON CLICK TO NEW PAGE /PERSONSPAGE/ */}
      {crewDetails && (
        <div className="flex items-center mt-2 mb-2 hover:bg-gradient-to-r from-pink-500 to-red-500  hover:transition-all rounded-xl">
          <img
            alt="Crew Member"
            src={`${BASE_IMAGE_URL}${
              crewMem.profile_path ? crewMem.profile_path : movie.poster_path
            }`}
            className="h-[150px] w-[100px] object-contain rounded-xl"
          />
          <div className="flex flex-col ml-4">
            <h1 className="mb-2 text-2xl">
              {crewMem.name ? crewMem.name : crewMem.original_name}
            </h1>
            <h1>{crewMem.department}</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default CastItem;
