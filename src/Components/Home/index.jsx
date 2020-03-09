import React, { Component } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";
import MovieCard from "./../MovieCard";

class Home extends Component {
	render() {
		return (
			<main id="main">
				<div className="container">
					<header className="section-header">
						<h1 className="heading-primary">Film Locations in San Francisco</h1>
					</header>
					<div className="movies-wrapper">
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
