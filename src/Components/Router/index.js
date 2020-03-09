import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./../hoc/Layout";
import Home from "./../Home";
const Routes = (props) => {
	return (
		<Layout>
			<Switch>
				<Route {...props} component={Home} exact path="/" />
			</Switch>
		</Layout>
	);
};
export default Routes;
