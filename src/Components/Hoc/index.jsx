import React, { Component } from "react";
import Axios from "axios";
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

			// Get  movie Title with filmed Address
			let MovieTitleWithFilmedLocations = [];
			for (let i = 0; i < arrMovies.length; i++) {
				let MovieTitle = arrMovies[i];
				MovieTitleWithFilmedLocations.push(
					// Get each movie filmed location in terms of movie title
					getEachMovieFilmedLocationByMovieTitle(MovieTitle)
				);
			}

			function getEachMovieFilmedLocationByMovieTitle(title) {
				let movie = {
					movieTitle: title,
					filmedAddresses: []
				};
				for (let i = 0; i < moviesData.length; i++) {
					let tempMovieArr = [];
					if (moviesData[i].title === title) {
						tempMovieArr.push(moviesData[i].locations);
					}
					movie.filmedAddresses.push(...tempMovieArr);
				}
				return movie;
			}

			//Re-set the state by movies data which contains movie 'title' and 'filmedAddresses' of that particular movie
			this.setState({
				movies: MovieTitleWithFilmedLocations
			});
		}

		render() {
			return <RenderComponent moviesData={this.state.movies} {...this.props} />;
		}
	};
};
export default HocSFMovies;
