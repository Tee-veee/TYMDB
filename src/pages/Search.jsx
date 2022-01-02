// LIB
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
// COMP
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
// STATE
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";
// ASSETS
import comingsoon from "../assets/comingsoon.jpg";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function Search() {
  const [currPage, setCurrPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [searchLen, setSearchLen] = useState([]);

  const { query } = useParams();
  const { loading } = useContext(LoadingContext);
  const { search, getMovie, getSearchMovies } = useContext(MovieContext);

  useEffect(() => {
    const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));
    const sessionSearch = JSON.parse(sessionStorage.getItem("search"));

    if (sessionSearch === null) {
      return;
    }
    if (Object.keys(search).length === 0 && sessionSearch !== null) {
      getMovie(sessionMovie.id, sessionMovie.release_date);
      getSearchMovies(query);

      return;
    }

    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    setCurrPage(search.page);
    setTotalPages(search.total_pages);
    setSearchLen(Object.keys(search).length);
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="relative pb-20 flex w-screen flex-col">
        <div className="relative flex h-[400px] pt-16 px-12 pb-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="py-2 flex flex-col">
            <h1 className="text-3xl">SEARCH RESULTS FOR:</h1>
            <h1 className="p-4 bg-black mt-2 w-fit text-4xl">{query}</h1>
          </div>
        </div>
        {/* BOTTOM GRID */}
        <div className="px-12 w-full h-fit py-8">
          <div
            // GETS SIZE OF ARRAY AND MODIFIES GRID BASED ON THAT
            className={`grid ${
              searchLen > 0 && searchLen <= 5
                ? "grid-cols-5 grid-rows-1"
                : searchLen > 5 && searchLen <= 10
                ? "grid-cols-5 grid-rows-2"
                : searchLen > 10 && searchLen <= 15
                ? "grid-cols-5 grid-rows-3"
                : searchLen > 15 && searchLen <= 20
                ? "grid-cols-5 grid-rows-1"
                : ""
            } gap-4`}
          >
            {search.results &&
              search.results.map((searchRes) => {
                return (
                  <div key={searchRes.id} className="bg-black relative">
                    {searchRes.poster_path && (
                      <Link to={`/moviedetails/${searchRes.id}`}>
                        <img
                          src={`${BASE_IMAGE_URL}${searchRes.poster_path}`}
                          alt="Movie Poster"
                          className="w-full h-full opacity-80 cursor-pointer hover:opacity-100 hover:transition-all hover:scale-[0.96]"
                          onClick={() =>
                            getMovie(searchRes.id, searchRes.release_date)
                          }
                        />
                      </Link>
                    )}
                    {searchRes.profile_path && (
                      <>
                        <h1 className="absolute top-8 left-8 z-10 text-4xl">
                          {searchRes.name}
                        </h1>
                        <img
                          src={`${BASE_IMAGE_URL}${searchRes.profile_path}`}
                          alt="Person Profile"
                          className="w-full h-full opacity-80 cursor-pointer hover:opacity-100 hover:transition-all hover:scale-[0.96]"
                        />
                      </>
                    )}
                    {!searchRes.poster_path && !searchRes.profile_path && (
                      <>
                        <h1 className="absolute top-8 left-8 z-10 text-4xl">
                          {searchRes.media_type.toUpperCase()}
                        </h1>
                        <h1 className="absolute top-16 left-8 mt-2 z-10 text-xl">
                          {searchRes.title ? searchRes.title : searchRes.name}
                        </h1>

                        <img
                          src={comingsoon}
                          alt="Movie Poster"
                          className="w-full h-full opacity-80 cursor-pointer hover:opacity-100 hover:transition-all hover:scale-[0.96]"
                        />
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  w-full  h-[140px]">
          <div className="w-fit b flex justify-between items-center text-3xl">
            <div
              className={` mr-4 p-1 bg-gradient-to-r from-cyan-500 to-blue-500 ${
                currPage === 1 ? "hidden" : ""
              }`}
              onClick={() => getSearchMovies(query, currPage - 1)}
            >
              <GrPrevious />
            </div>

            <h1 className="pt-2 py-1 px-5 mt-1 text-5xl bg-black">
              {currPage}
            </h1>
            <div
              className={` ml-4 p-1 bg-gradient-to-r from-cyan-500 to-blue-500 ${
                currPage === totalPages ? "hidden" : ""
              }`}
              onClick={() => getSearchMovies(query, currPage + 1)}
            >
              <GrNext />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Search;
