import React, { Component } from "react";
import { FormGroup, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { query: "" };
	}

	onSearchChange(e) {
		this.setState({ query: e.target.value });
	}
	render() {
		return (
			<FormGroup className="d-flex">
				<Input
					type="search"
					name="search"
					id="exampleSearch"
					placeholder="search movies"
					onChange={this.onSearchChange.bind(this)}
				/>
				<Link to={`/search/${this.state.query}`} className="btn btn-dark">
					Search
				</Link>
			</FormGroup>
		);
	}
}

export default SearchBar;
