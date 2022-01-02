// LIB
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

// STATE
import MovieContext from "../context/MovieContext";

function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const { getSearchMovies } = useContext(MovieContext);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText("");
    getSearchMovies(searchText, 1);
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [searchText]);

  return (
    <nav className="fixed top-0 w-full px-12 h-[6vh] md:h-[5vh] z-10">
      <div className="flex h-full m-auto items-center">
        <div
          className={`flex items-center justify-between w-full px-2 h-full bg-transparent transition-all ease-in duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 
        `}
        >
          <Link to="/">
            <SiThemoviedatabase className="text-3xl md:text-5xl" />
          </Link>
          <div
            className={`relative w-[200px] text-black flex items-center p-1 bg-white `}
          >
            <input
              type="text"
              value={searchText}
              onChange={handleChange}
              className="outline-none border-none"
              placeholder="Search Here!"
            />

            <button
              type="submit"
              className="text-2xl absolute right-0"
              onClick={handleSubmit}
            >
              <Link to={`/search/${searchText}`}>
                <FiSearch className={`pr-1 ${submitError ? "hidden" : ""}`} />
              </Link>
            </button>
          </div>
          <MdAccountCircle className="text-3xl md:text-5xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
