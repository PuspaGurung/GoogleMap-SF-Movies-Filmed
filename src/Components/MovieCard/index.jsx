import React from "react";

const MovieCard = (props) => {
	let { movieTitle, filmedAddresses } = props;

	return (
		<div className="movie">
			<h2 className="movie__title heading-secondary">{movieTitle}</h2>
			<ul className="movie__filmed-address">
				{filmedAddresses.map((address, i) => {
					return address !== undefined ? (
						<li key={i} className="address-list">
							{address}
						</li>
					) : (
						<li key={i} className="address-list">
							Address Not specified
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default MovieCard;
