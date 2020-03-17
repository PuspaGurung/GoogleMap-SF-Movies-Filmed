import React from "react";
import { Switch, Route } from "react-router-dom";

import ContextProvider from "../ContextAPI/ContextProvider";
import Home from "../Home";
const Routes = (props) => {
	return (
		<ContextProvider>
			<Switch>
				<Route {...props} component={Home} exact path="/" />
			</Switch>{" "}
		</ContextProvider>
	);
};
export default Routes;
