// LIB
import { createContext, useReducer, useContext } from "react";

// DATA
import { personRequests } from "./endpoints/endpoints";
// FUNC
import personReducer from "./PersonReducer";

import LoadingContext from "./LoadingContext";

// STATE
const PersonContext = createContext();

const TMDB_FETCHURL = process.env.REACT_APP_TMDB_FETCHURL;

export const PersonProvider = ({ children }) => {
  const initialState = {
    person: {},
    personCast: [],
    personCrew: {},
  };

  const { setLoadingTrue, setLoadingFalse } = useContext(LoadingContext);

  const [state, dispatchPerson] = useReducer(personReducer, initialState);

  const getPerson = async (id) => {
    setLoadingTrue();
    const detailsResponse = await fetch(
      `${TMDB_FETCHURL}/person/${id}${personRequests.personDetails}`
    );
    const creditsResponse = await fetch(
      `${TMDB_FETCHURL}/person/${id}${personRequests.personCredits}`
    );

    const detailsData = await detailsResponse.json();
    const creditsData = await creditsResponse.json();

    // NOTES -- CONVERT OBJ TOO ARR - POSSBILE SOULTION TO (.map is not a function bug)

    const creditsCastArr = Object.keys(creditsData.cast).map(
      (key) => creditsData.cast[key]
    );

    dispatchPerson({
      type: "SET_PERSON",
      payload: detailsData,
    });

    // NOTES -- ANYTHING BELOW HERE IS TESTING PURPOSE ONLY
    // NOTES -- 31/12 -- STILL NOT NECCESSARY -- DONT DELETE YET -- HARMLESS

    dispatchPerson({
      type: "SET_PERSON_CAST",
      payload: creditsCastArr,
    });
    dispatchPerson({
      type: "SET_PERSON_CREW",
      payload: creditsData.crew,
    });

    const personDetails = window.sessionStorage.getItem("person");

    if (personDetails === null) {
      sessionStorage.setItem("person", JSON.stringify(detailsData));
    } else {
      sessionStorage.removeItem("person");
      sessionStorage.setItem("person", JSON.stringify(detailsData));
    }

    const personCastDetails = window.sessionStorage.getItem("personCast");
    if (personCastDetails === null) {
      sessionStorage.setItem("personCast", JSON.stringify(creditsData.cast));
    } else {
      sessionStorage.removeItem("personCast");
      sessionStorage.setItem("personCast", JSON.stringify(creditsData.cast));
    }

    const personCrewDetails = window.sessionStorage.getItem("personCrew");

    if (personCrewDetails === null) {
      sessionStorage.setItem("personCrew", JSON.stringify(creditsData.crew));
    } else {
      sessionStorage.removeItem("personCrew");
      sessionStorage.setItem("personCrew", JSON.stringify(creditsData.crew));
    }

    setLoadingFalse();
    return;
  };

  return (
    <PersonContext.Provider value={{ ...state, getPerson, dispatchPerson }}>
      {children}
    </PersonContext.Provider>
  );
};

export default PersonContext;
