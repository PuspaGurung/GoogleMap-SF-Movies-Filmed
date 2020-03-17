import React, { Component } from "react";
import LocationMap from "../LocationMap";
import { ContextConsumer } from "../ContextAPI/Context";
import { BeatLoader } from "react-spinners";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

class MoviesCards extends Component {
	render() {
		return (
			<ContextConsumer>
				{({ movies }) => {
					let { movieInfoObjLists } = movies;
					console.log(movieInfoObjLists.length);
					return movieInfoObjLists.length > 1
						? movieInfoObjLists.map((movie) => {
								return (
									<div className="movie">
										<div className="movie__short-info">
											<span className="info-tag">Movie Title</span>
											<span className="release-year">
												Release year: {movie.releaseYear}
											</span>
										</div>

										<h2 className="movie__title heading-secondary">
											{movie.title}
										</h2>
										<ul className="movie__filmed-address">
											<details>
												<summary> Filmed Locations</summary>

												{movie.filmedAddresses.map((address, i) => {
													return address !== undefined ? (
														<li key={i} className="address-list">
															{/*<i className="fa fa-map-marker-alt"></i>*/}
															{address}
														</li>
													) : (
														<li key={i} className="address-list">
															Address Not specified
														</li>
													);
												})}

												<div className="filmed-location-map">
													{/*<LocationMap
								googleMapURL={googleMapURL}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={<div style={{ height: `40rem` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								zoom={12}
								places={filmedAddresses}
							/>*/}
												</div>
											</details>
										</ul>
									</div>
								);
						  })
						: "Result Not Found";
				}}
			</ContextConsumer>
		);
	}
}
export default MoviesCards;
