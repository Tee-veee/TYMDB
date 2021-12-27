// LIB
import { useEffect, useState } from "react";
import { SiThemoviedatabase } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  const [showNavBg, setShowNavBg] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShowNavBg(true);
      } else {
        setShowNavBg(false);
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  return (
    <nav className="fixed top-0 w-full h-[6vh] md:h-[5vh] z-10">
      <div className="flex h-full m-auto items-center">
        <div
          className={`flex items-center justify-between w-full px-2 h-full bg-transparent transition-all ${
            showNavBg &&
            "ease-in duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 "
          }`}
        >
          <SiThemoviedatabase className="text-3xl md:text-5xl" />
          <MdAccountCircle className="text-3xl md:text-5xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
