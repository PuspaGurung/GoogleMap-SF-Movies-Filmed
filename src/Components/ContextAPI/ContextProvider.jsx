import React, { Component } from "react";
import { ContextProvider } from "./Context";

import Header from "../Header_Footer/Header";
import Footer from "../Header_Footer/Footer";
import Axios from "axios";

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY");
Geocode.enableDebug();

export default class provider extends Component {
	state = {
		movies: {
			moviesTitles: [],
			moviesFilmedAddresses: [],
			moviesFilmedAddressesLatLng: [],
			movieInfoObjLists: [
				{
					title: "",
					releaseYear: "",
					filmedAddresses: []
				}
			]
		},
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?=AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY",
		googleMapAPIKey: "AIzaSyB3mQfjGA2w84n-DWr9hf1B1xLS_EajGjY",
		searchText: ""
	};

	async componentDidMount() {
		let ApiUrl = "https://data.sfgov.org/resource/yitu-d5am.json";

		/*---------------------------------------------------------
		>> Get all data of all movies :: moviesData[]
		>> Get All Titles only :: allMoviesTitles[]
		>> Get All addresses only :: allMoviesFilmedAddresses[]
		-----------------------------------------------------------*/

		let moviesResponseData = [],
			moviesTitles = [],
			moviesFilmedAddresses = [],
			moviesFilmedAddressesLatLng = [];

		moviesResponseData = await Axios.get(ApiUrl).then((movies) => {
			return movies.data.map((movie) => {
				if (moviesTitles.includes(movie.title) === false) {
					moviesTitles.push(movie.title);
				}
				if (
					moviesFilmedAddresses.includes(movie.locations) === false &&
					movie.locations !== undefined
				) {
					moviesFilmedAddresses.push(movie.locations);
					moviesFilmedAddressesLatLng.push(getLatLng(movie.locations));
				}
				return movie;
			});
		});

		/*---------------------------------------------------------
		Array of Object :: movieDetails = []
		>> Get each movie title 
		>> Get each movie filmedaddresses []
		>> Get each movie release year
		-----------------------------------------------------------*/

		let movieInfoObjLists = [];
		moviesTitles.map((title) => {
			let movie = {
				title: title,
				filmedAddresses: [],
				filmedAddressesLatLng: [],
				releaseYear: ""
			};
			for (let i = 0; i < moviesResponseData.length; i++) {
				if (moviesResponseData[i].title === title) {
					movie.releaseYear = moviesResponseData[i].release_year;
					if (
						movie.filmedAddresses.includes(moviesResponseData[i].locations) ===
						false
					) {
						movie.filmedAddresses.push(moviesResponseData[i].locations);
					}
					if (moviesResponseData[i].locations !== undefined) {
						movie.filmedAddressesLatLng.push(
							getLatLng(moviesResponseData[i].locations, i)
						);
					}
				}
			}
			movieInfoObjLists.push(movie);
		});

		function getLatLng(location) {
			let tempLatLng = [];

			setTimeout(
				Geocode.fromAddress(location).then(
					(response) => {
						const { lat, lng } = response.results[0].geometry.location;
						let objLatLng = {
							lat,
							lng
						};
						tempLatLng.push(objLatLng);
					},
					(error) => {
						console.error(error);
					}
				),
				1000
			);
			return tempLatLng;
		}
		/*----------------------------------------------------
			 SET-STATE
		 -----------------------------------------------------*/
		this.setState({
			movies: {
				moviesTitles,
				moviesFilmedAddresses,
				moviesFilmedAddressesLatLng,
				movieInfoObjLists
			}
		});
	}
	handleSearch = (searchText) => {
		this.setState({
			searchText
		});
		//let arr = "NIGHTS";
		//if (arr.includes(searchText)) {
		//	console.log("include");
		//}
	};

	render() {
		let { searchText, googleMapURL, googleMapAPIKey } = this.state,
			{
				moviesTitles,
				moviesFilmedAddresses,
				moviesFilmedAddressesLatLng
			} = this.state.movies,
			handleSearch = this.handleSearch;
		//	let movieInfoObjLists = this.state.movies.movieInfoObjLists;
		//let movieInfoObjLists =

		let movieInfoObjLists = this.state.movies.movieInfoObjLists.filter(
			(objList) => {
				return objList.title.toLowerCase().includes(searchText);
			}
		);
		const providerData = {
			movies: {
				moviesTitles,
				moviesFilmedAddresses,
				moviesFilmedAddressesLatLng,
				movieInfoObjLists
			},
			googleMapAPIKey,
			googleMapURL,
			handleSearch
		};

		return (
			<ContextProvider value={providerData}>
				<Header /> {this.props.children} <Footer />
			</ContextProvider>
		);
	}
}
