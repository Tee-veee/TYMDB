// LIB
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { IoMdImage } from "react-icons/io";

// STATE
import PersonContext from "../context/PersonContext";
import MovieContext from "../context/MovieContext";
import LoadingContext from "../context/LoadingContext";

// COMP
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

// DATA
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/";

function PersonDetails() {
  const [modal, setModal] = useState(false);

  const { person, personCast, personCrew, getPerson } =
    useContext(PersonContext);
  const { movie, getMovie } = useContext(MovieContext);
  const { loading } = useContext(LoadingContext);

  const truncateStr = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // NOTES TRY TO GET SESSION STORAGE TO INIT PERSON, PERSONCAST ON REFRESH
  useEffect(() => {
    const sessionPerson = JSON.parse(sessionStorage.getItem("person"));
    const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));
    console.log(sessionPerson);
    if (sessionPerson === null) {
      return;
    } else {
      if (Object.keys(person).length === 0 && sessionPerson !== null) {
        // NOTES -- TRY TO SET PERSON FROM WITHIN THIS FUNCTION CALL
        getPerson(sessionPerson.id);
        getMovie(sessionMovie.id, sessionMovie.release_date);
        console.log("personUndefined--sessionPersonInit");
      }
    }
    /* eslint-disable-next-line */
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex w-full flex-col">
        {modal && <Modal modal={modal} setModal={setModal} person={person} />}
        <Navbar />
        {/* NOTES -- TOP HERO SECTION DIV */}
        <div className="flex  pt-16 px-12 pb-8 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
          <div>
            <img
              src={`${BASE_IMAGE_URL}${
                person.profile_path
                  ? person.profile_path
                  : movie.poster_path
                  ? movie.poster_path
                  : movie.backdrop_path
              }`}
              className="h-[500px] w-[370px] object-cover"
              alt="Profile - front on"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-between h-fit mb-4">
              <div className="text-4xl ml-8 p-4 bg-black text-white">
                <h1>{person.name}</h1>
              </div>
              <div className="flex items-center text-2xl p-2 bg-black text-white h-fit rounded-lg">
                <h1 className="mt-1">
                  {person.place_of_birth
                    ? person.place_of_birth
                    : person.known_for_department}
                </h1>
              </div>
            </div>
            <div className="text-xl mb-4 ml-8 p-4 bg-black text-white w-fit">
              <h1>{person.known_for_department}</h1>
            </div>
            <div className="p-4 ml-8 text-lg leading-8 w-fit bg-white text-black">
              {person.biography ? (
                truncateStr(person.biography, 1000)
              ) : (
                <h1>No information To display right now! Check back later!</h1>
              )}
            </div>
            <div className="flex w-fit">
              <button
                className="flex text-sm md:text-xl w-fit ml-8 mt-4 items-center p-4 bg-black opacity-95 hover:bg-gradient-to-r from-pink-500 to-red-500 "
                onClick={() => setModal(true)}
              >
                <p className="mr-2">View Images</p>
                <IoMdImage className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-full px-12">
          <div className="w-full flex mb-4 mt-8 ">
            <h1 className="text-4xl  w-fit px-4 pt-4 pb-2 opacity-95 bg-gradient-to-r from-cyan-500 to-blue-500">
              Cast
            </h1>
          </div>
          {/* NOTES -- MOVIES PERSON HAS BEEN CAST IN */}
          {personCast &&
            personCast.map((perRole) => {
              return (
                <Link to={`/moviedetails/${perRole.id}`}>
                  <div
                    className="flex items-center w-full my-4 opacity-95 hover:bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl cursor-pointer"
                    onClick={() => getMovie(perRole.id, perRole.release_date)}
                    key={perRole.credit_id}
                  >
                    <img
                      src={`${BASE_IMAGE_URL}${
                        perRole.poster_path
                          ? perRole.poster_path
                          : perRole.backdrop_path
                          ? perRole.backdrop_path
                          : person.profile_path
                      }`}
                      className="h-[150px] w-[100px] object-contain rounded-xl"
                      alt="Movie Poster"
                    />
                    <div className="flex flex-col  px-4 w-full py-2 h-full">
                      <div className="flex w-full pt-2 items-center justify-between">
                        <h1 className="text-2xl">
                          {perRole.media_type.toUpperCase()}
                        </h1>
                        {perRole.vote_average ? (
                          <h1 className="text-lg bg-black p-2 rounded-full px-8 shadow-2xl">
                            {perRole.vote_average}/10
                          </h1>
                        ) : (
                          <h1 className="text-lg bg-black p-2 rounded-full px-8 shadow-2xl">
                            N/A
                          </h1>
                        )}
                      </div>
                      <h1 className="text-xl">
                        {perRole.title
                          ? perRole.title
                          : perRole.original_title
                          ? perRole.original_title
                          : perRole.name
                          ? perRole.name
                          : perRole.original_name}
                      </h1>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default PersonDetails;
