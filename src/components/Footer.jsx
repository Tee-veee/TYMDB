import { Link } from "react-router-dom";
import { SiThemoviedatabase } from "react-icons/si";

function Footer() {
  return (
    <footer className="absolute bottom-0 w-full h-[6vh] mt-8 md:h-[5vh] z-10">
      <div className="flex  h-full m-auto items-center">
        <div
          className={`flex items-center justify-between w-full px-12 h-full bg-transparent transition-all ease-in duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 
        `}
        >
          <Link to="/">
            <SiThemoviedatabase className="text-3xl md:text-5xl" />
          </Link>
          <h1>Coded by Ty.Vile</h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
