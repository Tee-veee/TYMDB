// LIB
import { useContext, useEffect, useState } from "react";
// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";
// DATA
import { detailRequests } from "../context/endpoints/endpoints";

// COMP
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import CastItem from "../components/CastItem";

const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function MovieDetails() {
  const [castDetails, setCastDetails] = useState([]);
  const [crewDetails, setCrewDetails] = useState([]);
  const { movie } = useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    const getCredits = async () => {
      if (movie.release_date) {
        const response = await fetch(
          `${TMDB_FETCHURL}/movie/${movie.id}/credits${detailRequests.fetchMovieCredits}`
        );

        const dataResponse = await response.json();
        setCastDetails(dataResponse.cast);
        setCrewDetails(dataResponse.crew);

        return;
      } else if (!movie.release_date) {
        const response = await fetch(
          `${TMDB_FETCHURL}/tv/${movie.id}/credits${detailRequests.fetchTvCredits}`
        );
        const dataResponse = await response.json();
        setCastDetails(dataResponse.cast);
        setCrewDetails(dataResponse.crew);

        return;
      }
    };
    getCredits();
    /* eslint-disable-next-line */
  }, [movie]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Banner />
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-8">
          <div className="flex items-center px-4 py-4">
            <h1 className="text-4xl mr-4">Genres:</h1>
            {movie.genres &&
              movie.genres.map((genre) => {
                return (
                  <div
                    key={genre.id}
                    className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500"
                  >
                    {genre.name}
                  </div>
                );
              })}
          </div>
          <div className="flex items-center">
            {movie.seasons ? (
              <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-pink-500 to-red-500">
                Seasons: {movie.number_of_seasons}
              </h1>
            ) : (
              <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-pink-500 to-red-500">
                Duration: {movie.runtime}m
              </h1>
            )}
            <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              Rating {movie.vote_average}/10
            </h1>
          </div>
        </div>
        <div className="flex items-center px-4 py-4">
          <h2 className="px-12 text-xl">{movie.overview}</h2>
        </div>
        <div className="px-12">
          <div className="flex flex-col  py-4">
            {/* NOTES -- RENDER IF TV SHOW */}
            {movie.first_air_date && (
              <div className="mb-4">
                <h1 className="text-4xl mb-4 w-fit px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4">
                  Season Details
                </h1>
                {movie.seasons &&
                  movie.seasons.map((season) => {
                    return (
                      <div
                        className="flex items-center w-full  mt-2 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500  hover:transition-all cursor-pointer"
                        key={season.id}
                      >
                        <img
                          src={`${BASE_IMAGE_URL}${
                            season.poster_path
                              ? season.poster_path
                              : movie.poster_path
                          }`}
                          className="h-[150px] w-[100px] object-contain rounded-xl"
                          alt="Season Poster"
                        />
                        <div className="flex flex-col ml-4">
                          <h1 className="text-xl">
                            Season:{" "}
                            <span className="text-lg">
                              {season.season_number}
                            </span>
                          </h1>
                          <h1 className="text-xl">
                            Episodes:{" "}
                            <span className="text-lg">
                              {season.episode_count}
                            </span>
                          </h1>
                          {season.air_date && (
                            <h1 className="text-xl">
                              Air-Date:{" "}
                              <span className="text-lg">{season.air_date}</span>
                            </h1>
                          )}
                        </div>
                      </div>
                    );
                  })}
                <div className="">
                  <div className="flex flex-col py-2 mb-8">
                    <h1 className="text-4xl mb-2 mt-2 px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500 w-fit">
                      CAST
                    </h1>
                    {castDetails &&
                      castDetails.map((castMem) => {
                        return (
                          <CastItem
                            key={castMem.credit_id}
                            castMem={castMem}
                            castDetails={castDetails}
                          />
                        );
                      })}
                    <h1 className="text-4xl mt-2 mb-2  px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-pink-500 to-red-500 w-fit">
                      CREW
                    </h1>
                    {crewDetails &&
                      crewDetails.map((crewMem) => {
                        return (
                          <CastItem
                            key={crewMem.credit_id}
                            crewMem={crewMem}
                            crewDetails={crewDetails}
                          />
                        );
                      })}
                  </div>
                </div>
                <h1 className="text-4xl mb-8 w-fit px-4 pt-4 pb-2  mt-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
                  Extra Details
                </h1>
                <h1 className="text-3xl mb-4 border-b-2 border-b-blue-500 w-fit">
                  Official Website
                </h1>
                {movie.homepage && (
                  <>
                    <a
                      className="text-xl font-extralight"
                      href={movie.homepage}
                    >
                      {movie.homepage}{" "}
                    </a>
                  </>
                )}
                <h1 className="text-3xl mt-4 mb-4 border-b-2 border-b-blue-500 w-fit">
                  Series Status
                </h1>
                {movie.status && (
                  <h1 className="text-xl font-extralight">{movie.status}</h1>
                )}
                <h1 className="text-3xl mt-4 mb-4 border-b-2 border-b-blue-500 w-fit">
                  Air Date
                </h1>
                <h1 className="text-xl font-extralight mb-2">
                  <span className="text-3xl text-blue-500">First: </span>
                  {movie.first_air_date}
                </h1>
                <h1 className="text-xl font-extralight mt-2 mb-4">
                  <span className="text-3xl text-red-500">Last: </span>
                  {movie.last_air_date}
                </h1>
                <h1 className="text-3xl mb-4 border-b-2 border-b-blue-500 w-fit">
                  Languages
                </h1>
                {movie.spoken_languages && (
                  <>
                    {movie.spoken_languages.map((language) => {
                      return (
                        <h1
                          className="text-xl font-extralight"
                          key={language.iso_639_1}
                        >
                          {language.english_name}
                        </h1>
                      );
                    })}
                  </>
                )}
                <h1 className="text-3xl mb-4 border-b-2 mt-2 border-b-blue-500 w-fit">
                  Production Locations
                </h1>
                {movie.production_countries &&
                  movie.production_countries.map((country) => {
                    return (
                      <h1
                        className="text-xl font-extralight"
                        key={country.iso_3166_1}
                      >
                        {country.name}
                      </h1>
                    );
                  })}
                <h1 className="text-3xl mb-4 border-b-2 mt-2 border-b-blue-500 w-fit">
                  Production Companies
                </h1>
                {movie.production_companies &&
                  movie.production_companies.map((company) => {
                    return (
                      <div className="flex items-center" key={company.id}>
                        <img
                          src={`${BASE_IMAGE_URL}${
                            company.logo_path
                              ? company.logo_path
                              : movie.poster_path
                          }`}
                          className="min-h-[100px] max-h-[300px] w-2/12 bg-white object-contain mb-4 mt-4 mr-4"
                          alt="Proudction Company Logo"
                        />
                        <h1 className="text-2xl ">
                          {company.name},{" "}
                          {company.origin_country && (
                            <>
                              <span className="text-lg font-thin ">
                                {company.origin_country}
                              </span>
                            </>
                          )}
                        </h1>
                      </div>
                    );
                  })}
              </div>
            )}
            {/* NOTES -- RENDER IF MOVIE */}
            {movie.release_date && (
              <div className="mb-4">
                {/* ADD ON CLICK TO VIEW COLLECTION -- OR DELETE HOVER EFEFCTS LATER */}
                {movie.belongs_to_collection && (
                  <>
                    <h1 className="text-4xl mt-8 w-fit px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
                      Series
                    </h1>
                    <h1 className="mt-4 mb-4 text-xl">
                      {movie.belongs_to_collection.name}
                    </h1>
                    <img
                      src={`${BASE_IMAGE_URL}${
                        movie.belongs_to_collection.backdrop_path
                          ? movie.belongs_to_collection.backdrop_path
                          : movie.belongs_to_collection.poster_path
                      }`}
                      alt="Collection Poster"
                      className="object-contain cursor-pointer opacity-75 hover:opacity-100 hover:scale-[.97] hover:transition-all"
                    />
                  </>
                )}
                <div className="">
                  <div className="flex flex-col  py-8 mb-8">
                    <h1 className="text-4xl mb-2  px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500 w-fit">
                      CAST
                    </h1>
                    {castDetails &&
                      castDetails.map((castMem) => {
                        return (
                          <CastItem
                            key={castMem.credit_id}
                            castMem={castMem}
                            castDetails={castDetails}
                          />
                        );
                      })}
                    <h1 className="text-4xl mt-2 mb-2  px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-pink-500 to-red-500 w-fit">
                      CREW
                    </h1>
                    {crewDetails &&
                      crewDetails.map((crewMem) => {
                        return (
                          <CastItem
                            key={crewMem.credit_id}
                            crewMem={crewMem}
                            crewDetails={crewDetails}
                          />
                        );
                      })}
                  </div>
                </div>
                <h1 className="text-4xl mb-8 w-fit px-4 pt-4 pb-2 mt-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
                  Extra Details
                </h1>
                {movie.homepage && (
                  <>
                    <h1 className="text-3xl mb-4 border-b-2 border-b-blue-500 w-fit">
                      Official Website
                    </h1>
                    <a
                      className="text-xl font-extralight"
                      href={movie.homepage}
                    >
                      {movie.homepage}{" "}
                    </a>
                  </>
                )}
                {movie.release_date && (
                  <>
                    <h1 className="text-3xl mt-4 mb-4 border-b-2 border-b-blue-500 w-fit">
                      Release Date
                    </h1>
                    <h1 className="text-xl font-extralight">
                      {movie.release_date}
                    </h1>
                  </>
                )}
                {movie.spoken_languages && (
                  <>
                    <h1 className="text-3xl mt-4 mb-4 border-b-2 border-b-blue-500 w-fit">
                      Languages
                    </h1>
                    {movie.spoken_languages.map((language) => {
                      return (
                        <h1
                          className="text-xl font-extralight"
                          key={language.iso_639_1}
                        >
                          {language.english_name}
                        </h1>
                      );
                    })}
                  </>
                )}
                <h1 className="text-3xl mt-4 mb-4 border-b-2 border-b-blue-500 w-fit">
                  Production Locations
                </h1>
                {movie.production_countries.map((country) => {
                  return (
                    <h1
                      className="text-xl font-extralight"
                      key={country.iso_3166_1}
                    >
                      {country.name}
                    </h1>
                  );
                })}
                <h1 className="text-3xl mb-4 mt-4 border-b-2 border-b-blue-500 w-fit">
                  Production Companies
                </h1>
                {movie.production_companies.map((company) => {
                  return (
                    <div className="flex items-center" key={company.id}>
                      <img
                        src={`${BASE_IMAGE_URL}${
                          company.logo_path
                            ? company.logo_path
                            : movie.poster_path
                        }`}
                        className="min-h-[100px] max-h-[300px] w-2/12 bg-white object-contain mb-4 mt-4 mr-4"
                        alt="Proudction Company Logo"
                      />
                      <h1 className="text-2xl ">
                        {company.name},{" "}
                        {company.origin_country && (
                          <>
                            <span className="text-lg font-thin ">
                              {company.origin_country}
                            </span>
                          </>
                        )}
                      </h1>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* NOTES -- RENDER CAST TV && MOVIE */}

        {/* NOTES -- POSSIBLY ADD REVIEWS */}
      </div>
    </div>
  );
}

export default MovieDetails;
