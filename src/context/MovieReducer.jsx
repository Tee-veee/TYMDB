// TAKES INITIAL STATE AND ACTION OBJECT AS VALUE
// RUNS SWITCH STATEMENT ON ACTION.TYPE AND RETURNS ACTION.PAYLOAD BASED ON TYPE

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIE":
      return { ...state, movie: action.payload };
    case "SET_CREDITS":
      return { ...state, credits: action.payload };
    default:
      return;
  }
};

export default movieReducer;
