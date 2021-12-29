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

// STATE

import { MovieProvider } from "./context/MovieContext";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    // STATE CONTEXT FOR MOVIES
    <LoadingProvider>
      <MovieProvider>
        <Router>
          <main className="flex bg-black text-white min-h-screen font-defaultFont">
            {/* ROUTES FOR PAGE LINKS */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/moviedetails/:movie" element={<MovieDetails />} />
            </Routes>
          </main>
        </Router>
      </MovieProvider>
    </LoadingProvider>
  );
}

export default App;
