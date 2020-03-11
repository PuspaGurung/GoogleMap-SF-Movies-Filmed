import React from "react";

const SFMoviesContext = React.createContext();
const ContextProvider = SFMoviesContext.Provider;
const ContextConsumer = SFMoviesContext.Consumer;

export { ContextConsumer, ContextProvider };
