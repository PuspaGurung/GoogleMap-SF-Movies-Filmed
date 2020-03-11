import React, { Component } from "react";

import MoviesData from "./../Hoc/MoviesData";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

class MovieCard extends Component {
	state = {
		filmedAddressLatLng: []
	};

	componentDidMount() {
		let filmedAddresses = this.props.filmedAddresses;

		filmedAddresses.map(async (address) => {
			if (address !== undefined) {
				let data = await Geocode.fromAddress(address).then((response) => {
					const { lat, lng } = response.results[0].geometry.location;
					let objarr = {
						lat,
						lng
					};
					this.setState({
						filmedAddressLatLng: [...this.state.filmedAddressLatLng, objarr]
					});
				});
			}
		});
	}
	triggerGoogleMap = () => {
		let { filmedAddressLatLng } = this.state;
		this.props.triggerGoogleMap(filmedAddressLatLng);
	};
	render() {
		let { movieTitle, filmedAddresses, releaseYear } = this.props;
		return (
			<div className="movie">
				<span className="movie__info-tag">Movie Title</span>
				<h2 className="movie__title heading-secondary">{movieTitle}</h2>
				<ul className="movie__filmed-address">
					<details>
						<summary> Filmed Locations</summary>
						{filmedAddresses.map((address, i) => {
							return address !== undefined ? (
								<li key={i} className="address-list">
									<i className="fa fa-map-marker-alt"></i> {address}
								</li>
							) : (
								<li key={i} className="address-list">
									Address Not specified
								</li>
							);
						})}

						<div className="Lat-lng"></div>
					</details>
				</ul>
			</div>
		);
	}
}
export default MoviesData(MovieCard);
