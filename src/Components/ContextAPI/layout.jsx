import React from "react";
import { ContextProvider } from "./Context";
import MoviesData from "../Hoc/MoviesData";

import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";

const Layout = (props) => {
	let moviesData = props.moviesData;
	return (
		<ContextProvider value={moviesData} {...props}>
			<Header /> {props.children} <Footer />
		</ContextProvider>
	);
};

export default MoviesData(Layout);
