import React, { Component } from "react";
import axios from "axios";
import { Button, FormGroup, Form, Input } from "reactstrap";
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
		console.log(this.state.query);
		return (
			<Form inline>
				<FormGroup>
					<Input
						type="search"
						name="search"
						id="exampleSearch"
						placeholder="search movies"
						onChange={this.onSearchChange.bind(this)}
						inline
					/>
					<Link to={`/search/${this.state.query}`} className="btn btn-dark">
						Search
					</Link>
				</FormGroup>
			</Form>
		);
	}
}

export default SearchBar;
