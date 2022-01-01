// QUERIES FOR LATER
// MOVIE DETAILS
// https://api.themoviedb.org/3/movie/580489?api_key={api_key}&append_to_response=videos,images
// SEARCH MOVIES
// https://api.themoviedb.org/3/search/movie?api_key={api_key}&language=en-US&query=batman&page=1
// TV DETAILS
// https://api.themoviedb.org/3/tv/157336?api_key={api_key}&append_to_response=videos,images
// SEARCH TV SHOW
// https://api.themoviedb.org/3/search/tv?api_key={api_key}&language=en-US&page=1&query=batman

// LIB
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
import SeasonDetails from "./pages/SeasonDetails";
import EpisodeDetails from "./pages/EpisodeDetails";
import CollectionDetails from "./pages/CollectionDetails";

// STATE
import { MovieProvider } from "./context/MovieContext";
import { LoadingProvider } from "./context/LoadingContext";
import { PersonProvider } from "./context/PersonContext";

function App() {
  return (
    // STATE CONTEXT FOR MOVIES
    <Router>
      <LoadingProvider>
        <MovieProvider>
          <PersonProvider>
            <main className="flex bg-black text-white min-h-screen font-defaultFont">
              {/* ROUTES FOR PAGE LINKS */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/moviedetails/:movie" element={<MovieDetails />} />
                <Route
                  path="/persondetails/:person"
                  element={<PersonDetails />}
                />
                <Route
                  path="/seasondetails/:tvid/:seasonid"
                  element={<SeasonDetails />}
                />
                <Route
                  path="/episodedetails/:tvid/:seasonid/:epnum"
                  element={<EpisodeDetails />}
                />
                <Route
                  path="/collectiondetails/:collectionid"
                  element={<CollectionDetails />}
                />
              </Routes>
            </main>
          </PersonProvider>
        </MovieProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
