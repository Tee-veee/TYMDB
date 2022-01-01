// TAKES INITIAL STATE AND ACTION OBJECT AS VALUE
// RUNS SWITCH STATEMENT ON ACTION.TYPE AND RETURNS ACTION.PAYLOAD BASED ON TYPE

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIE":
      return { ...state, movie: action.payload };
    case "SET_SEASON":
      return { ...state, season: action.payload };
    case "SET_EPISODE":
      return { ...state, episode: action.payload };
    case "SET_COLLECTION":
      return { ...state, collection: action.payload };
    default:
      return;
  }
};

export default movieReducer;
