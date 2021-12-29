// TAKES INITIAL STATE AND ACTION OBJECT AS VALUE
// RUNS SWITCH STATEMENT ON ACTION.TYPE AND RETURNS ACTION.PAYLOAD BASED ON TYPE

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRUE":
      return {
        loading: true,
      };
    case "SET_FALSE":
      return {
        loading: false,
      };
    default:
      return;
  }
};

export default movieReducer;
