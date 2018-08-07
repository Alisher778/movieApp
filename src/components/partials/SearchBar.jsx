import React, { Component } from "react";
import { FormGroup, Form, Input } from "reactstrap";
import { Link } from "react-router-dom";

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { query: "", category: "movie" };
	}

	onSearchChange(e) {
		this.setState({ query: e.target.value });
	}
	onCategoryChange(e) {
		this.setState({ category: e.target.value });
	}
	render() {
		console.log(this.state);
		return (
			<FormGroup className="d-flex">
				<Input
					type="search"
					name="search"
					id="exampleSearch"
					placeholder="search movies"
					onChange={this.onSearchChange.bind(this)}
				/>
				<select onChange={this.onCategoryChange.bind(this)} className="category-select">
					<option value="movie">Movie</option>
					<option value="tv">Tv Show</option>
				</select>
				<Link
					to={`/search/${this.state.category}/${this.state.query}`}
					className="btn btn-dark"
				>
					Search
				</Link>
			</FormGroup>
		);
	}
}

export default SearchBar;
