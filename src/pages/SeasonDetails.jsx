// LIB
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";

// COMP
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function SeasonDetails() {
  const { movie, season, getMovie, getSeason, getEpisode } =
    useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    const sessionSeason = JSON.parse(sessionStorage.getItem("season"));
    const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));

    if (sessionSeason === null) {
      return;
    }
    if (Object.keys(season).length === 0 && sessionSeason !== null) {
      getMovie(sessionMovie.id, sessionMovie.release_date);
      getSeason(sessionMovie.id, sessionSeason.season_number);

      return;
    }

    /* eslint-disable-next-line */
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="relative pb-20 flex w-full flex-col">
        {/* NOTES -- HEADER DIV */}
        <div
          className="relative flex h-[500px] pt-16 px-12 pb-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${BASE_IMAGE_URL}${
              season.poster_path
                ? season.poster_path
                : movie.poster_path
                ? movie.poster_path
                : movie.backdrop_path
            })`,
            backgroundPosition: "90% 10%",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <div className="flex w-full items-center mt-8 h-fit items-center">
            <h1 className="flex items-center text-md md:text-4xl pt-4 pb-2  px-4 w-fit h-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              {movie?.name || movie?.title || movie?.original_name} -
              <span className="ml-2 text-2xl">
                {season.name ? season.name : "Season -" + season.number}
              </span>
            </h1>
          </div>
          <div
            className="h-[8vh] w-full absolute left-0 bottom-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent, #111111, black)",
            }}
          ></div>
        </div>
        {/* NOTES -- BOTTOM HALF CONTAINER */}
        <div className="px-12 w-full ">
          {/* NOTES -- BOTTOM HALF HEADER */}
          <div className=" flex items-center">
            <h1 className="text-4xl mr-4">Air Date:</h1>
            <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              {season.air_date}
            </h1>
          </div>
          {season.overview && (
            <h1 className="text-xl mt-6">{season.overview}</h1>
          )}
          <h1 className="flex items-center text-md md:text-4xl pt-4 pb-2 mt-6 mb-4 px-4 w-fit h-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
            Episodes
          </h1>
        </div>
        {/* NOTES -- EPISODES SECTION */}
        {season.episodes &&
          season.episodes.map((episode) => {
            return (
              <div className="mx-12" key={episode.id}>
                <Link
                  to={`/episodedetails/${movie.id}/${season.id}/${season.season_number}`}
                >
                  <div
                    className="flex items-center mt-2 mb-2 hover:bg-gradient-to-r from-cyan-500 to-blue-500  hover:transition-all rounded-xl cursor-pointer"
                    onClick={() =>
                      getEpisode(
                        movie.id,
                        season.season_number,
                        episode.episode_number
                      )
                    }
                  >
                    <img
                      alt="Cast Member"
                      src={`${BASE_IMAGE_URL}${
                        episode.still_path
                          ? episode.still_path
                          : movie.poster_path
                          ? movie.poster_path
                          : movie.backdrop_path
                      }`}
                      className="h-full w-[200px] object-contain rounded-xl"
                    />
                    <div className="flex flex-col  w-full  ml-4">
                      <div className=" flex items-center w-full justify-between">
                        <h1 className="text-2xl">{episode.name}</h1>
                        <h1 className="text-md bg-black p-2 rounded-full px-4 mr-2 shadow-2xl">
                          Episode: {episode.episode_number}
                        </h1>
                      </div>
                      <h1>{episode.air_date}</h1>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

        <Footer />
      </div>
    </>
  );
}

export default SeasonDetails;
