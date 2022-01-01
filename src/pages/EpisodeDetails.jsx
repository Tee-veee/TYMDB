// COMP
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

// LIB
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// STATE
import MovieContext from "../context/MovieContext";
import PersonContext from "../context/PersonContext";
import LoadingContext from "../context/LoadingContext";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function EpisodeDetails() {
  const { movie, season, episode, getMovie, getSeason, getEpisode } =
    useContext(MovieContext);
  const { getPerson } = useContext(PersonContext);
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));
    const sessionSeason = JSON.parse(sessionStorage.getItem("season"));
    const sessionEpisode = JSON.parse(sessionStorage.getItem("episode"));

    if (sessionEpisode === null) {
      return;
    }
    if (Object.keys(episode).length === 0 && sessionEpisode !== null) {
      getMovie(sessionMovie.id, sessionMovie.release_date);
      getSeason(sessionMovie.id, sessionSeason.season_number);
      getEpisode(
        sessionMovie.id,
        sessionSeason.season_number,
        sessionEpisode.episode_number
      );
      return;
    }

    /* eslint-disable-next-line */
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative w-full pb-16 min-h-screen">
      <Navbar />
      <div className="flex w-full flex-col">
        {/* NOTES -- HEADER DIV */}
        <div
          className="relative flex h-[500px] pt-16 px-12 pb-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${BASE_IMAGE_URL}${
              episode.still_path
                ? episode.still_path
                : movie.poster_path
                ? movie.poster_path
                : movie.backrop_path
            })`,
            backgroundPosition: "90% 10%",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <div className="flex w-full justify-between items-center mt-8 h-fit items-center">
            <h1 className="flex items-center text-md md:text-4xl pt-4 pb-2  px-4 w-fit h-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              {movie?.name || movie?.title || movie?.original_name} -
              <span className="ml-2 text-2xl">
                {season.name ? season.name : "Season -" + season.number}
              </span>
            </h1>
            <h1 className="flex items-center text-md md:text-2xl pt-4 pb-2  px-4 w-fit h-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              Episode -{" "}
              <span className="ml-2 text-xl">{episode.episode_number}</span>
            </h1>
            <div
              className="h-[12vh] w-full absolute left-0 bottom-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent, #111111, black)",
              }}
            ></div>
          </div>
        </div>
        {/* BOTTOM SECTION */}
        <div className="flex flex-col mt-8 px-12 ">
          <div className="flex items-center justify-between w-full ">
            <h1 className="p-4 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500 text-4xl">
              {episode.name}
            </h1>
            <div className="flex">
              <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
                Air Date: {episode.air_date}
              </h1>
              <h1 className="mr-6 py-4 px-8  rounded-full opacity-95 bg-gradient-to-r from-pink-500 to-red-500">
                Rating: {episode.vote_average}/10
              </h1>
            </div>
          </div>
          {episode.overview && (
            <div className="mt-8">
              <h1 className=" text-xl">{episode.overview}</h1>
            </div>
          )}
          <h1 className="p-4 opacity-95 w-fit mt-8 mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-4xl">
            CAST - GUESTS
          </h1>
          {episode.guest_stars &&
            episode.guest_stars.map((guest) => {
              return (
                <Link to={`/persondetails/${guest.id}`}>
                  <div
                    className="flex items-center w-full my-2 opacity-95 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl cursor-pointer"
                    key={guest.credit_id}
                    onClick={() => getPerson(guest.id)}
                  >
                    <img
                      src={`${BASE_IMAGE_URL}${
                        guest.profile_path
                          ? guest.profile_path
                          : movie.poster_path
                          ? movie.poster_path
                          : movie.backdrop_path
                      }`}
                      className="h-[150px] w-[100px] object-contain rounded-xl"
                      alt="Movie Poster"
                    />
                    <div className="flex flex-col justify-center  px-4 w-full py-2 h-full">
                      <h1 className="mb-2 text-2xl">
                        {guest.name ? guest.name : guest.original_name}
                      </h1>
                      <h1>{guest.character}</h1>
                    </div>
                  </div>
                </Link>
              );
            })}
          <h1 className="p-4 opacity-95 w-fit my-2 bg-gradient-to-r from-pink-500 to-red-500 text-4xl">
            CREW
          </h1>
          {episode.crew &&
            episode.crew.map((crew) => {
              return (
                <Link to={`/persondetails/${crew.id}`}>
                  <div
                    className="flex items-center w-full my-2 opacity-95 hover:bg-gradient-to-r from-pink-500 to-red-500 rounded-xl cursor-pointer"
                    key={crew.credit_id}
                    onClick={() => getPerson(crew.id)}
                  >
                    <img
                      src={`${BASE_IMAGE_URL}${
                        crew.profile_path
                          ? crew.profile_path
                          : movie.poster_path
                          ? movie.poster_path
                          : movie.backdrop_path
                      }`}
                      className="h-[150px] w-[100px] object-contain rounded-xl"
                      alt="Movie Poster"
                    />
                    <div className="flex flex-col justify-center  px-4 w-full py-2 h-full">
                      <h1 className="mb-2 text-2xl">
                        {crew.name ? crew.name : crew.original_name}
                      </h1>
                      <h1>{crew.department}</h1>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EpisodeDetails;
