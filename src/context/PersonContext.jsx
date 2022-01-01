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
    personCrew: [],
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

    // NOTES -- CONVERT OBJ TOO ARR - POSSBILE SOULTION TO (.map is not a function bug)

    const creditsCrewArr = Object.keys(creditsData.crew).map(
      (key) => creditsData.crew[key]
    );

    dispatchPerson({
      type: "SET_PERSON",
      payload: detailsData,
    });

    dispatchPerson({
      type: "SET_PERSON_CAST",
      payload: creditsCastArr,
    });
    dispatchPerson({
      type: "SET_PERSON_CREW",
      payload: creditsCrewArr,
    });

    // NOTES -- SET VARIABLES FOR PERSON LOCAL STORAGE
    // NECCESARY TO HANDLE PAGE REFRESH

    const personDetails = window.sessionStorage.getItem("person");
    const personCastDetails = window.sessionStorage.getItem("personCast");
    const personCrewDetails = window.sessionStorage.getItem("personCrew");

    if (personDetails === null) {
      sessionStorage.setItem("person", JSON.stringify(detailsData));
    } else {
      sessionStorage.removeItem("person");
      sessionStorage.setItem("person", JSON.stringify(detailsData));
    }

    if (personCastDetails === null) {
      sessionStorage.setItem("personCast", JSON.stringify(creditsData.cast));
    } else {
      sessionStorage.removeItem("personCast");
      sessionStorage.setItem("personCast", JSON.stringify(creditsData.cast));
    }

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
