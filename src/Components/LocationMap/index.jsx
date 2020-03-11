import React, { Component } from "react";
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
			place: ""
		}
	};

	componentDidMount() {
		let { places } = this.props;
		places.map(async (place, i) => {
			if (place !== undefined) {
				await Geocode.fromAddress(place).then((response) => {
					const { lat, lng } = response.results[0].geometry.location;
					let obLatLng = {
						lat,
						lng
					};
					this.setState((prevState) => {
						return {
							arrPlacesLatLng: [...prevState.arrPlacesLatLng, obLatLng],
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
		this.setState({
			infoWindow: {
				isActive: true,
				lat: latLng.lat,
				lng: latLng.lng,
				place: place
			}
		});
	};
	render() {
		let { arrPlacesLatLng, arrPlace } = this.state;
		let { isActive, lat, lng, place } = this.state.infoWindow;

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
								this.handleClick(latLng, arrPlace[i]);
							}}
						/>
					);
				})}

				{isActive == true && (
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
									place: ""
								}
							});
						}}
					>
						<div className="info-window">{place}</div>
					</InfoWindow>
				)}
			</GoogleMap>
		);
	}
}
export default withScriptjs(withGoogleMap(LocationMap));
