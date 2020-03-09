import React, { Component } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";

class Header extends Component {
	render() {
		return (
			<header id="page-header">
				<div className="container">
					<div className="header-wrapper">
						<SFMoviesConsumer>
							{(val) => {
								return <h4>{val}</h4>;
							}}
						</SFMoviesConsumer>
					</div>
				</div>
			</header>
		);
	}
}
export default Header;
