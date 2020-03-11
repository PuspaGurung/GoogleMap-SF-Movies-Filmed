import React, { Component } from "react";
import Axios from "axios";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

const HocSFMovies = (RenderComponent) => {
	return class extends Component {
		state = {
			moviesDetails: null,
			latLngForTriggerMap: null,
			filmedAddresses: null,
			googleMapURL:
				"https://maps.googleapis.com/maps/api/js?key=AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY",
			googleMapAPIKey: "AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY"
		};

		async componentDidMount() {
			let ApiUrl = "https://data.sfgov.org/resource/yitu-d5am.json";

			// Store All Movies Titles
			let arrMoviesTitle = [];

			// Store All Addresses of movie filmed
			let filmedAddresses = [];

			// Get Movies Data
			let moviesData = await Axios.get(ApiUrl).then((movies) => {
				return movies.data.map((movie) => {
					/*-----------------------------
					 Push Movie title
					 Escape the duplicate
					 -------------------------------*/
					if (arrMoviesTitle.includes(movie.title) === false) {
						arrMoviesTitle.push(movie.title);
					}
					if (filmedAddresses.includes(movie.locations) === false) {
						filmedAddresses.push(movie.locations);
					}

					return movie;
				});
			});

			/*----------------------------
				Get  movie Title
					and
				Filmed-Address
				>> moviesDetails contains list of the movies with their title, year of release and filmed location
			--------------------------------*/
			let moviesDetails = [];
			for (let i = 0; i < arrMoviesTitle.length; i++) {
				let MovieTitle = arrMoviesTitle[i];
				moviesDetails.push(
					// Get each movie filmed location in terms of movie title
					getMovieDetails(MovieTitle)
				);
			}

			function getMovieDetails(title) {
				let movie = {
					movieTitle: title,
					filmedAddresses: [],
					releaseYear: []
				};
				for (let i = 0; i < moviesData.length; i++) {
					let tempAddresses = [];
					let tempReleaseYear = [];
					if (moviesData[i].title === title) {
						tempAddresses.push(moviesData[i].locations);
						tempReleaseYear.push(moviesData[i].release_year);
					}
					//  Escape the duplicate filmed address
					if (movie.filmedAddresses.includes(...tempAddresses) == false) {
						movie.filmedAddresses.push(...tempAddresses);
					}
					//  Escape the duplicate release year
					if (movie.releaseYear.includes(...tempReleaseYear) == false) {
						movie.releaseYear.push(...tempReleaseYear);
					}
				}
				return movie;
			}
			//Re-set the state by movies data which contains movie 'title' and 'filmedAddresses' of that particular movie
			this.setState({
				moviesDetails,
				filmedAddresses
			});
		}
		triggerGoogleMap = (latLng) => {
			this.setState({
				latLngForTriggerMap: latLng
			});
		};
		render() {
			let {
				moviesDetails,
				filmedAddresses,
				googleMapAPIKey,
				googleMapURL
			} = this.state;
			return (
				<RenderComponent
					moviesData={moviesDetails}
					filmedAddresses={filmedAddresses}
					googleMapAPIKey={googleMapAPIKey}
					googleMapURL={googleMapURL}
					{...this.props}
				/>
			);
		}
	};
};
export default HocSFMovies;
