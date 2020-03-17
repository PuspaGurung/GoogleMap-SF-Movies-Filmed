import React, { Component } from "react";
import Axios from "axios";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

const HocSFMovies = (RenderComponent) => {
	return class extends Component {
		render() {
			let googleMapAPIUrl = "https://maps.googleapis.com/maps/api/js?",
				googleMapAPIKey: "AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY";

			return <RenderComponent />;
		}
	};
};
export default HocSFMovies;
