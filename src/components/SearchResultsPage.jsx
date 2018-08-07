import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Badge,
	Button,
	Container,
	FormGroup,
	Input,
	Label,
	ListGroup,
	Media,
	Pagination
} from "reactstrap";
import axios from "axios";
import Spinner from "./partials/Spinner.jsx";
import defaultImg from "../assets/img/default-200.jpg";

class SearchResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			movies: [],
			pages: 1,
			total_results: 1,
			pageNumber: 1
		};
	}

	componentDidMount() {
		document.getElementById("spinner").style.display = "block";
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=c93f9215f2085cf5f8aa18a05afa9861&query=${
				this.props.match.params.query
			}`
		)
			.then(res => {
				this.setState({
					movies: res.data.results,
					pages: res.data.total_pages,
					total_results: res.data.total_results,
					query: this.props.match.params.query
				});
				document.getElementById("spinner").style.display = "none";
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Search Quey Update ************
	onSearchChange(e) {
		this.setState({ query: e.target.value });
	}

	// ******** Search Update Function ******************
	updateSearch() {
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=c93f9215f2085cf5f8aa18a05afa9861&query=${
				this.state.query
			}`
		)
			.then(res => {
				this.setState({
					movies: res.data.results,
					pages: res.data.total_pages,
					total_results: res.data.total_results
				});
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Pagination function ******************

	goToPage(e) {
		document.getElementById("spinner").style.display = "block";
		e.preventDefault();
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=c93f9215f2085cf5f8aa18a05afa9861&query=${
				this.state.query
			}&page=${this.state.pageNumber}`
		)
			.then(res => {
				this.setState({ movies: res.data.results });
				document.getElementById("spinner").style.display = "none";
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Page Number Update ************
	onInputChange(e) {
		if (e.target.value != 0) {
			this.setState({ pageNumber: e.target.value });
		}
	}
	render() {
		return (
			<section>
				<Spinner />
				<Container className="mt-5">
					<FormGroup className="d-flex">
						<Input
							type="search"
							name="search"
							id="exampleSearch"
							placeholder="search movies"
							onChange={this.onSearchChange.bind(this)}
						/>
						<Link
							to={`/search/${this.state.query}`}
							className="btn btn-dark text-light"
							onClick={this.updateSearch.bind(this)}
						>
							Search Now
						</Link>
					</FormGroup>
				</Container>
				<Container className="my-5">
					<h2>Search Results</h2>
					<ListGroup flush className="my-4">
						{this.state.movies.map((item, i) => {
							let genresName = [];
							// Fetch data to get genres id and map to store theirs names as genresName
							axios(
								"https://api.themoviedb.org/3/genre/movie/list?api_key=c93f9215f2085cf5f8aa18a05afa9861"
							)
								.then(res => {
									return item.genre_ids.map(itemGenId => {
										return res.data.genres.map(ids => {
											if (ids.id === itemGenId) {
												return genresName.push(ids.name);
											} else {
												return [];
											}
										});
									});
								})
								.catch(err => console.log(err.message));
							return (
								<Link
									className="text-dark border-bottom my-2 py-2 search-link"
									disabled
									tag="a"
									to={`/movies/${item.id}`}
									key={i}
									onClick={() => {
										this.props.selectMovie(item, genresName);
									}}
								>
									<Media>
										<Media left>
											<Media
												width="100"
												object
												src={
													item.poster_path
														? `https://image.tmdb.org/t/p/w92${
																item.poster_path
														  }`
														: defaultImg
												}
												alt={item.title}
											/>
										</Media>
										<Media body className="ml-5">
											<Media heading>{item.title}</Media>
											<p className="font-weight-bold">
												<span className="bg-warning text-dark p-1">
													IMDb {item.vote_average}
												</span>{" "}
												| {item.release_date.slice(0, 4)}
											</p>
											{item.overview.length > 200
												? item.overview.substr(0, 230) + "..."
												: item.overview}
										</Media>
									</Media>
								</Link>
							);
						})}
					</ListGroup>
					<div className="my-5 d-flex justify-content-center pagination-wrapper">
						<b id="page-number" className="mr-auto">
							{this.state.pages} Pages
						</b>
						<Badge color="success" id="current-page" pill className="mr-auto">
							{this.state.pageNumber}
						</Badge>
						<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
							<Label for="exampleEmail" className="mr-sm-2">
								Page #
							</Label>
							<Input
								type="number"
								name="page"
								id="exampleEmail"
								placeholder="Page Number"
								onChange={this.onInputChange.bind(this)}
								onClick={() => (this.value = 0)}
							/>
						</FormGroup>
						<Button onClick={this.goToPage.bind(this)}>Go</Button>
					</div>
				</Container>
			</section>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		selectMovie: (data, genresName) =>
			dispatch({ type: "SELECT_MOVIE", data, genresName })
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SearchResultsPage);
