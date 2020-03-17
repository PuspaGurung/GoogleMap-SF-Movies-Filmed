import React, { Component } from "react";
import LocationMap from "../LocationMap";
import { ContextConsumer } from "../ContextAPI/Context";
import { BeatLoader } from "react-spinners";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

class MoviesCards extends Component {
	state = {
		myIndex: null
	};

	handleBtnShowLocation = () => {
		this.setState({
			showLocation: true
		});
	};
	render() {
		let { myIndex } = this.state;
		return (
			<ContextConsumer>
				{({ movies }) => {
					let { movieInfoObjLists } = movies;
					return movieInfoObjLists.length > 1
						? movieInfoObjLists.map((movie, index) => {
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
										<button
											onClick={() =>
												this.setState({
													myIndex: index
												})
											}
											className="btn btn-show-location"
										>
											<i class="fas fa-plus-circle"></i> Filmed Location
										</button>

										<ul
											className="address-wrapper movie__filmed-address"
											style={{
												visibility: `${myIndex == index ? "visible" : "hidden"}`
											}}
										>
											<div className="address-list-wrapper">
												<button
													className=" btn btn-close-location"
													onClick={() =>
														this.setState({
															myIndex: null
														})
													}
												>
													X
												</button>
												<h2 className="movie__title heading-secondary">
													{movie.title}
												</h2>
												<h3 className="heading-tertiary">
													<strong> Filmed Locations</strong>
												</h3>

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
											</div>
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
