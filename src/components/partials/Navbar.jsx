import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import {
	Collapse,
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
				<Navbar color="info" dark expand="md">
					<Link to="/" className="navbar-brand">
						reactstrap
					</Link>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{window.location.pathname.includes("search") ? "" : <SearchBar />}

							<NavItem>
								<Link to="/movies" className="nav-link">
									Movies
								</Link>
							</NavItem>
							<NavItem>
								<NavLink href="https://github.com/reactstrap/reactstrap">
									GitHub
								</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Options
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>Option 1</DropdownItem>
									<DropdownItem>Option 2</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>Reset</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
