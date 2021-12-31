// LIB
import { Link } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
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
          <MdAccountCircle className="text-3xl md:text-5xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
