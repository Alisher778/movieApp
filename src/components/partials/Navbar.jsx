import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import {
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";

export default class NavbarComponent extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<div>
				<Navbar dark expand="md">
					<Container>
						<Link to="/" className="navbar-brand">
							MUVESRCH
						</Link>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<Link to="/all-movies" className="nav-link">
										Movies
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/tv-shows" className="nav-link">
										Tv Shows
									</Link>
								</NavItem>
							</Nav>
							{window.location.pathname.includes("search") &&
							window.location.pathname.length > 8 ? (
								""
							) : (
								<SearchBar />
							)}
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}
