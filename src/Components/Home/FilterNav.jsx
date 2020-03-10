import React, { Component } from "react";

import { SFMoviesConsumer } from "./../ContextAPI/Context";

class FilterNav extends Component {
	handleInputChange = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	};
	render() {
		return (
			<div className="movie-filter">
				<form>
					<label
						htmlFor="filter-movie-by-title
filter-movie-by-title"
					>
						Filter Movies
					</label>
					<input
						type="text"
						name="filter-movie-by-title"
						id="filter-movie-by-title"
						onChange={this.handleInputChange}
						placeholder="Input Movie title"
					></input>
				</form>
			</div>
		);
	}
}
export default FilterNav;
