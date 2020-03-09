import React from "react";
import { SFMoviesProvider } from "./Context";
import HocSFMovies from "../Hoc";

import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";

const Layout = (props) => {
	return (
		<SFMoviesProvider value={props.moviesData} {...props}>
			<Header /> {props.children} <Footer />
		</SFMoviesProvider>
	);
};

export default HocSFMovies(Layout);
