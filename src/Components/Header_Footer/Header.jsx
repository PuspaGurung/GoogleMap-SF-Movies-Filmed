import React, { Component } from "react";
import { SFMoviesConsumer } from "../ContextAPI/Context";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<header id="page-header">
				<div className="container">
					<div className="header-wrapper">
						<Link to="/" className="site-logo">
							<strong> SF Movies </strong>
						</Link>
					</div>
				</div>
			</header>
		);
	}
}
export default Header;
