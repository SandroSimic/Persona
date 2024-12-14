/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useCtx = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useCtx must be used within a ContextProvider");
  }

  return context;
};
