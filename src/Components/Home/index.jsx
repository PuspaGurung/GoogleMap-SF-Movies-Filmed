import React, { Component } from "react";
import { ContextConsumer } from "../ContextAPI/Context";
import LocationMap from "../LocationMap";
import MovieCard from "./../MovieCard";
import hocMovieData from "./../Hoc/MoviesData";

class Home extends Component {
	render() {
		let { filmedAddresses, googleMapURL } = this.props;
		console.log(googleMapURL);
		return (
			<main id="main">
				<section className="section section-map">
					<div className="container">
						<header className="section-header">
							<h1 className="heading-primary">
								Movies Filmed Locations in San Francisco
							</h1>
						</header>
						<div className="location-map primary-location-map">
							<LocationMap
								googleMapURL={googleMapURL}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `60rem` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								zoom={12}
								places={filmedAddresses}
							/>
						</div>
					</div>
				</section>

				<section className="section sectio-movies">
					<div className="container">
						<header className="section-header">
							<h1 className="heading-primary">
								Movie List with Filmed location{" "}
							</h1>
						</header>
						{/*<FilterNav />*/}
						<div className="movies-wrapper">
							<ContextConsumer>
								{(moviesData) => {
									if (moviesData) {
										return moviesData.map((movie, i) => {
											return (
												<MovieCard
													key={i}
													movieTitle={movie.movieTitle}
													filmedAddresses={movie.filmedAddresses}
													releaseYear={movie.releaseYear}
													googleMapURL={googleMapURL}
												/>
											);
										});
									}
								}}
							</ContextConsumer>
						</div>
					</div>
				</section>
			</main>
		);
	}
}
export default hocMovieData(Home);
