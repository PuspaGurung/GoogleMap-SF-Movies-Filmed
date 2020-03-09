import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./scss/main.scss";
import Router from "./Components/Routes";

const App = (props) => {
	return (
		<BrowserRouter>
			<Router {...props} />
		</BrowserRouter>
	);
};
ReactDOM.render(<App />, document.getElementById("root"));
