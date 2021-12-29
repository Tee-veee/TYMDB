// LIB
import { createContext, useReducer } from "react";
// FUNC
import loadingReducer from "./LoadingReducer";
// STATE
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const initialState = {
    loading: false,
  };

  const setLoadingFalse = () => {
    dispatchLoading({
      type: "SET_FALSE",
    });
  };

  const setLoadingTrue = () => {
    dispatchLoading({
      type: "SET_TRUE",
    });
  };

  const [state, dispatchLoading] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider
      value={{ ...state, setLoadingFalse, setLoadingTrue }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
