import React, { Component, useContext } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";

class Home extends Component {
	render() {
		return (
			<main id="main">
				<div className="container">
					<div className="main-wrapper">
						<h1> Home context </h1>
						<SFMoviesConsumer>
							{(value) => {
								return <h2>{value}</h2>;
							}}
						</SFMoviesConsumer>
					</div>
				</div>
			</main>
		);
	}
}
export default Home;
