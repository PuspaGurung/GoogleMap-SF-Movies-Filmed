import React, { Component } from "react";
import Axios from "axios";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

const HocSFMovies = (RenderComponent) => {
	return class extends Component {
		state = {
			movies: null
		};

		async componentDidMount() {
			let ApiUrl = "https://data.sfgov.org/resource/yitu-d5am.json";

			// Store Movies Titles
			let arrMovies = [];

			// Get Movies Data
			let moviesData = await Axios.get(ApiUrl).then((movies) => {
				return movies.data.map((movie) => {
					// Push Movie title
					if (arrMovies.includes(movie.title) === false) {
						arrMovies.push(movie.title);
					}

					return movie;
				});
			});

			// Get  movie Title with filmed-Address and filmed-addresses-latitude-longitude
			let movieTitleWithFilmedLocations = [];
			for (let i = 0; i < arrMovies.length; i++) {
				let MovieTitle = arrMovies[i];
				movieTitleWithFilmedLocations.push(
					// Get each movie filmed location in terms of movie title
					getEachMovieFilmedLocation(MovieTitle)
				);
			}

			function getEachMovieFilmedLocation(title) {
				let movie = {
					movieTitle: title,
					filmedAddresses: [],
					releaseYear: []
				};
				for (let i = 0; i < moviesData.length; i++) {
					let tempAddressesArr = [];
					let tempReleaseYear = [];
					if (moviesData[i].title === title) {
						tempAddressesArr.push(moviesData[i].locations);
						tempReleaseYear.push(moviesData[i].release_year);
					}
					movie.filmedAddresses.push(...tempAddressesArr);
					movie.releaseYear.push(...tempReleaseYear);
				}
				return movie;
			}

			//Re-set the state by movies data which contains movie 'title' and 'filmedAddresses' of that particular movie
			this.setState({
				movies: movieTitleWithFilmedLocations
			});
		}

		render() {
			return <RenderComponent moviesData={this.state.movies} {...this.props} />;
		}
	};
};
export default HocSFMovies;
