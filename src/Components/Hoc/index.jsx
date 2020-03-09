import React, { Component } from "react";
import Axios from "axios";
const HocSFMovies = (RenderComponent) => {
	return class extends Component {
		state = {
			name: "Nepal is my country name"
		};
		async componentDidMount() {
			let ApiUrl = "https://data.sfgov.org/resource/yitu-d5am.json";
			let moviData = await Axios.get(ApiUrl).then((resolve) => {
				return resolve.data;
			});
		}

		render() {
			return <RenderComponent moviesData={this.state.name} {...this.props} />;
		}
	};
};
export default HocSFMovies;
