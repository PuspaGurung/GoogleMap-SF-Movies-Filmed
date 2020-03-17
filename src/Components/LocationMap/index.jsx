import React, { Component } from "react";

import { ContextConsumer } from "./../ContextAPI/Context";
import {
	withGoogleMap,
	GoogleMap,
	Marker,
	withScriptjs,
	InfoWindow
} from "react-google-maps";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();
class LocationMap extends Component {
	state = {
		arrPlacesLatLng: [],
		arrPlace: [],
		infoWindow: {
			isActive: false,
			lat: "",
			lng: "",
			place: "",
			title: ""
		}
	};

	componentDidMount() {
		let { filmedAddresses } = this.props;
		filmedAddresses.map(async (place, i) => {
			if (place !== undefined) {
				await Geocode.fromAddress(place).then((response) => {
					const { lat, lng } = response.results[0].geometry.location;
					let objLatLng = {
						lat,
						lng
					};
					this.setState((prevState) => {
						return {
							arrPlacesLatLng: [...prevState.arrPlacesLatLng, objLatLng],
							arrPlace: [...prevState.arrPlace, place]
						};
					});

					//this.setState({
					//	arrPlacesLatLng: [...this.state.arrPlacesLatLng, objarr],
					//	arrPlace: [...this.state.arrPlace, place]
					//});
				});
			}
		});
	}
	handleClick = (latLng, place) => {
		// Get address from latidude & longitude.
		Geocode.fromLatLng(latLng.lat, latLng.lng).then(
			(response) => {
				const place = response.results[0].formatted_address;
				console.log(place);
				this.setState({
					infoWindow: {
						isActive: true,
						lat: latLng.lat,
						lng: latLng.lng,
						place
					}
				});
			},
			(error) => {
				console.error(error);
			}
		);
	};
	render() {
		let { arrPlacesLatLng, arrPlace } = this.state;
		let { isActive, lat, lng, place, title } = this.state.infoWindow;
		let { filmedAddresses, moviesTitles } = this.props;

		return (
			<GoogleMap
				defaultZoom={this.props.zoom}
				defaultCenter={{ lat: 37.773972, lng: -122.431297 }}
			>
				{arrPlacesLatLng.map((latLng, i) => {
					return (
						<Marker
							key={i}
							position={{ lat: latLng.lat, lng: latLng.lng }}
							draggable={true}
							onClick={() => {
								this.handleClick(latLng, filmedAddresses[i], moviesTitles[i]);
							}}
						/>
					);
				})}

				{isActive === true && (
					<InfoWindow
						position={{
							lat: lat,
							lng: lng
						}}
						onCloseClick={() => {
							this.setState({
								infoWindow: {
									isActive: false,
									lat: "",
									lng: "",
									place: "",
									title: ""
								}
							});
						}}
					>
						<div className="info-window">
							<strong>{place}</strong>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		);
	}
}
export default withScriptjs(withGoogleMap(LocationMap));
