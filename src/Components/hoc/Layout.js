import React, { Fragment } from "react";

import Header from "./../Header_Footer/Header";
import Footer from "./../Header_Footer/Footer";
const Layout = (props) => {
	return (
		<Fragment>
			<Header />
			{props.children}
			<Footer />
		</Fragment>
	);
};

export default Layout;
