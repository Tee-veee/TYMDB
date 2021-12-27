const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

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

export const detailRequests = {
  fetchDetailTv: `?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,images`,
};
