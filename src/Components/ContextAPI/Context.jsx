import React from "react";

const SFMoviesContext = React.createContext();
const SFMoviesProvider = SFMoviesContext.Provider;
const SFMoviesConsumer = SFMoviesContext.Consumer;

export { SFMoviesConsumer, SFMoviesProvider };
