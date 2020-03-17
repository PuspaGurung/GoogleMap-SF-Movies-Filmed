import React, { Component } from "react";
import { ContextConsumer } from "../ContextAPI/Context";
import LocationMap from "../LocationMap";
import FilterNav from "./FilterBar";
import MoviesCards from "../MoviesCards";

class Home extends Component {
	render() {
		let { moviesFilmedAddresses, googleMapURL, moviesDetails } = this.props;

		return (
			<ContextConsumer>
				{(value) => {
					let placeLatLng = value.movies.moviesFilmedAddressesLatLng,
						googleMapURL = value.googleMapURL;
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
										{/*<LocationMap
											googleMapURL={googleMapURL}
											loadingElement={<div style={{ height: `100%` }} />}
											containerElement={<div style={{ height: `60rem` }} />}
											mapElement={<div style={{ height: `100%` }} />}
											zoom={12}
											places={placeLatLng}
										/>*/}
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
									<FilterNav />
									<div className="movies-wrapper">
										{/*------------------------------------------------------------------
							Show movies lists with title, release year, and filmed addresses
							---------------------------------------------------------------------*/}
										<MoviesCards />
									</div>
								</div>
							</section>
						</main>
					);
				}}
			</ContextConsumer>
		);
	}
}
export default Home;
