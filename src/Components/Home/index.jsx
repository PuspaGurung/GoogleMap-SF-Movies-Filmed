import React, { Component } from "react";
import { ContextConsumer } from "../ContextAPI/Context";
import LocationMap from "../LocationMap";
import FilterNav from "./FilterNav";
import MovieCard from "./../MovieCard";

import hocMovieData from "./../Hoc/MoviesData";

class Home extends Component {
	render() {
		let { arrFilmedAddresses } = this.props;
		return (
			<main id="main">
				<div className="container">
					<header className="section-header">
						<h1 className="heading-primary">Film Locations in San Francisco</h1>
					</header>
					<div className="location-map primary-location-map">
						<LocationMap
							googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY"
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `400px` }} />}
							mapElement={<div style={{ height: `100%` }} />}
							zoom={10}
							places={arrFilmedAddresses}
						/>
					</div>
					<FilterNav />
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
											/>
										);
									});
								}
							}}
						</ContextConsumer>
					</div>
				</div>
			</main>
		);
	}
}
export default hocMovieData(Home);
