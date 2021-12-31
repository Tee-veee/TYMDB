// TAKES INITIAL STATE AND ACTION OBJECT AS VALUE
// RUNS SWITCH STATEMENT ON ACTION.TYPE AND RETURNS ACTION.PAYLOAD BASED ON TYPE

const personReducer = (state, action) => {
  switch (action.type) {
    case "SET_PERSON":
      return { ...state, person: action.payload };
    case "SET_PERSON_CAST":
      return { ...state, personCast: action.payload };
    case "SET_PERSON_CREW":
      return { ...state, personCrew: action.payload };
    default:
      return;
  }
};

export default personReducer;
