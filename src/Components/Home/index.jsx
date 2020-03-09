import React, { Component } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";
import MovieCard from "./../MovieCard";

class Home extends Component {
	render() {
		return (
			<main id="main">
				<div className="container">
					<div className="movies-wrapper">
						<h1>Movie list with filmed address </h1>

						<SFMoviesConsumer>
							{(movies) => {
								if (movies) {
									return movies.map((movie, i) => {
										return (
											<MovieCard
												key={i}
												movieTitle={movie.movieTitle}
												filmedAddresses={movie.filmedAddresses}
											/>
										);
									});
								}
							}}
						</SFMoviesConsumer>
					</div>
				</div>
			</main>
		);
	}
}
export default Home;
