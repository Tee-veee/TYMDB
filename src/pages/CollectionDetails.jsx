// LIB
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// COMP
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function CollectionDetails() {
  const { movie, collection, getCollection, getMovie } =
    useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  useEffect(() => {
    const sessionCollection = JSON.parse(sessionStorage.getItem("collection"));
    const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));

    if (sessionCollection === null) {
      return;
    }
    if (Object.keys(collection).length === 0 && sessionCollection !== null) {
      getMovie(sessionMovie.id, sessionMovie.release_date);
      getCollection(sessionMovie.belongs_to_collection.id);

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
              collection.backdrop_path
                ? collection.backdrop_path
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
              {collection.name}
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
        {/* NOTES -- BOTTOM HALF */}
        <div className="px-12 w-full ">
          {/* NOTES -- BOTTOM HALF HEADER */}
          <div className=" flex items-center">
            <h1 className="text-xl mr-4"> {collection.overview}</h1>
          </div>
          {collection.parts && (
            <>
              <h1 className="flex items-center text-md md:text-4xl pt-4 pb-2 mt-6 mb-6 px-4 w-fit h-fit opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
                Collection
              </h1>
              {collection.parts.map((colMovie) => {
                return (
                  <>
                    <Link to={`/moviedetails/${colMovie.id}`}>
                      <div
                        className="flex items-center mt-2 mb-2 hover:bg-gradient-to-r from-cyan-500 to-blue-500  hover:transition-all rounded-xl"
                        key={colMovie.id}
                        onClick={() =>
                          getMovie(colMovie.id, colMovie.release_date)
                        }
                      >
                        <img
                          src={`${BASE_IMAGE_URL}${
                            colMovie.poster_path
                              ? colMovie.poster_path
                              : movie.poster_path
                          }`}
                          className="h-[150px] w-[100px] object-contain rounded-xl"
                          alt="Movie Poster"
                        />
                        <div className="flex flex-col ml-4">
                          <h1 className="mb-2 text-2xl">
                            {colMovie.title
                              ? colMovie.title
                              : colMovie.original_title}
                          </h1>
                          <h1>{colMovie.release_date}</h1>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
export default CollectionDetails;
