// LIB
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SiThemoviedatabase } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  const [showNavBg, setShowNavBg] = useState(false);

  // IF Y-AXIS > 400px CHANGE STATE

  window.addEventListener("scroll", () => {
    if (window.scrollY > 520) {
      setShowNavBg(true);
    } else {
      setShowNavBg(false);
    }
    return () => {
      window.removeEventListener("scroll");
    };
  });

  return (
    <nav className="fixed top-0 w-full px-12 h-[6vh] md:h-[5vh] z-10">
      <div className="flex h-full m-auto items-center">
        <div
          className={`flex items-center justify-between w-full px-2 h-full bg-transparent transition-all ${
            showNavBg &&
            "ease-in duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 "
          }`}
        >
          <Link to="/">
            <SiThemoviedatabase className="text-3xl md:text-5xl" />
          </Link>
          <MdAccountCircle className="text-3xl md:text-5xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
