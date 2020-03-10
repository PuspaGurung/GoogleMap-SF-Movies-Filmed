import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

const mapStyles = {
	width: "100%",
	height: "100%"
};

class MovieCard extends Component {
	state = {
		filmedAddressLatLng: []
	};

	componentDidMount() {
		let filmedAddresses = this.props.filmedAddresses;

		let arrLatLng = [];
		filmedAddresses.map(async (address) => {
			let ab = [];
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
					arrLatLng.push(objarr);
				});
			}
		});
	}

	render() {
		let { movieTitle, filmedAddresses, releaseYear } = this.props;

		if (this.state.filmedAddressLatLng !== null) {
			//	console.log(this.state.filmedAddressLatLng.length);
		}
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

						<div className="Lat-lng">
							{this.state.filmedAddressLatLng.map((coordinate, i) => {
								return (
									<div key={i} className="address">
										<h4>Lat:{coordinate.lat}</h4>
										<h4>Lng:{coordinate.lng}</h4>

										{/*<Map
											google={this.props.google}
											zoom={14}
											style={mapStyles}
											initialCenter={{
												lat: { coordinate },
												lng: 36.8233
											}}
										/>*/}
									</div>
								);
							})}
						</div>
					</details>
				</ul>
			</div>
		);
	}
}
export default MovieCard;
