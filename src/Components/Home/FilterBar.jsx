import React from "react";

import { ContextConsumer } from "../ContextAPI/Context";
const FilterBar = (props) => {
	return (
		<ContextConsumer>
			{({ handleSearch }) => {
				return (
					<div className="movie-filter">
						<form>
							<label>Search movie</label>
							<input
								onChange={(e) => {
									e.preventDefault();
									handleSearch(e.target.value);
								}}
								type="text"
								placeholder="Input movie title"
							/>
						</form>
					</div>
				);
			}}
		</ContextConsumer>
	);
};
export default FilterBar;
