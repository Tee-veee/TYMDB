const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

// NOTES -- REQUESTS FOR HOME PAGE ROWS

export const rowRequests = {
  fetchTrending: `/trending/all/week?api_key=${TMDB_TOKEN}&language=en-us`,
  fetchNetflix: `discover/tv?api_key=${TMDB_TOKEN}&with_networks=213`,
  fetchTopRated: `movie/top_rated?api_key=${TMDB_TOKEN}&language=en-us`,
  fetchAnimated: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=16`,
  fetchFamily: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=10751`,
  fetchAction: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=28`,
  fetchComedy: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=35`,
  fetchHorror: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=27`,
  fetchRomance: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=10749`,
  fetchDocumentaries: `discover/movie?api_key=${TMDB_TOKEN}&with_genres=99`,
};

// NOTES -- REQUESTS FOR MORE DETAILED MOVIE && TV RESULTS WHICH IS SET IN GLOBAL STATE (MOVIE CONTEXT)

export const detailRequests = {
  fetchDetailTv: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
  fetchDetailMovie: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
  fetchMovieCredits: `?api_key=${TMDB_TOKEN}&language=en-US`,
  fetchTvCredits: `?api_key=${TMDB_TOKEN}&language=en-US`,
  fetchSeasonDetails: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
  fetchEpisodeDetails: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
  fetchCollectionDetails: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
};

// NOTES -- REQUESTS FOR MORE DETAILED PERSON RESULTS WHICH IS SET IN GLOBAL STATE (PERSON CONTEXT)

export const personRequests = {
  personDetails: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=%26append_to_response=videos,images`,
  personCredits: `/combined_credits?api_key=${TMDB_TOKEN}&language=en-US`,
};
