// LIB
import { rowRequests } from "../context/endpoints/endpoints";

// COMP
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="relative flex flex-col overflow-x-hidden">
      {/* NAV */}
      <Navbar />
      <Banner homePage />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          NETFLIX ORIGINALS
        </span>
      </h1>
      <MovieRow
        title={"NETFLIX ORIGINALS"}
        fetchUrl={rowRequests.fetchNetflix}
        isLargeRow
      />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          TRENDING NOW
        </span>
      </h1>
      <MovieRow title={"TRENDING NOW"} fetchUrl={rowRequests.fetchTrending} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          TOP RATED
        </span>
      </h1>
      <MovieRow title={"TOP RATED"} fetchUrl={rowRequests.fetchTopRated} />
      <h1 className="ml-8 mt-4 text-4xl">
        {" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          FAMILY
        </span>
      </h1>
      <MovieRow title={"FAMILY"} fetchUrl={rowRequests.fetchFamily} />
      <h1 className="ml-8 mt-4 text-4xl">
        {" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          ANIMATED
        </span>
      </h1>
      <MovieRow title={"ANIMATED"} fetchUrl={rowRequests.fetchAnimated} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          ACTION
        </span>
      </h1>
      <MovieRow title={"ACTION"} fetchUrl={rowRequests.fetchAction} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          COMEDY
        </span>
      </h1>
      <MovieRow title={"COMEDY"} fetchUrl={rowRequests.fetchComedy} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          HORROR
        </span>
      </h1>
      <MovieRow title={"HORROR"} fetchUrl={rowRequests.fetchHorror} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          ROMANCE
        </span>
      </h1>
      <MovieRow title={"ROMANCE"} fetchUrl={rowRequests.fetchRomance} />
      <h1 className="ml-8 mt-4 text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          DOCUMENTARIES
        </span>
      </h1>
      <MovieRow
        title={"DOCUMENTARIES"}
        fetchUrl={rowRequests.fetchDocumentaries}
      />
      <Footer />
    </div>
  );
}

export default Home;
