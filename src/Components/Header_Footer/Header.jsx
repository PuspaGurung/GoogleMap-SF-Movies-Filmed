import React, { Component } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";

class Header extends Component {
	render() {
		return (
			<header id="page-header">
				<div className="container">
					<div className="header-wrapper">HEADER</div>
				</div>
			</header>
		);
	}
}
export default Header;
