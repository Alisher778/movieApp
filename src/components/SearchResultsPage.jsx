import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	FormGroup,
	Form,
	Input,
	ListGroup,
	ListGroupItem,
	Media,
	Pagination,
	PaginationItem,
	PaginationLink
} from "reactstrap";
import axios from "axios";

class SearchResultsPage extends Component {
	constructor(props) {
		super(props);
		this.state = { query: "", movies: [], pages: 1, total_results: 1 };
	}

	componentDidMount() {
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=c93f9215f2085cf5f8aa18a05afa9861&query=${
				this.props.match.params.query
			}`
		)
			.then(res => {
				console.log(res.data);
				this.setState({
					movies: res.data.results,
					pages: res.data.total_pages,
					total_results: res.data.total_results,
					query: this.props.match.params.query
				});
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
				console.log(res.data);
				this.setState({ movies: res.data.results });
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Pagination function ******************
	changePage(e) {
		e.preventDefault();
		const pageId = e.target.getAttribute("data-id");
		var li = document.querySelectorAll(".page-item");
		li.forEach(item => {
			item.className = "page-item";
		});
		console.log(li);
		e.target.parentElement.className += " active";
		axios(
			`https://api.themoviedb.org/3/search/movie?api_key=c93f9215f2085cf5f8aa18a05afa9861&query=${
				this.state.query
			}&page=${pageId}`
		)
			.then(res => {
				console.log(res.data);
				this.setState({ movies: res.data.results });
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Pagination Rendering ******************
	loopPagination() {
		let list = [];
		for (let i = 1; i <= this.state.pages; i++) {
			list.push(
				<li className="page-item" key={i}>
					<a
						className="page-link"
						href="#"
						data-id={i}
						onClick={this.changePage.bind(this)}
					>
						{i}
					</a>
				</li>
			);
		}
		return list;
	}
	render() {
		console.log("State", this.state);

		return (
			<section>
				<Container className="mt-5">
					<FormGroup className="d-flex">
						<Input
							type="search"
							name="search"
							id="exampleSearch"
							placeholder="search movies"
							onChange={this.onSearchChange.bind(this)}
						/>
						<a
							className="btn btn-dark text-light"
							onClick={this.updateSearch.bind(this)}
						>
							Search Now
						</a>
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
									item.genre_ids.map(itemGenId => {
										res.data.genres.map(ids => {
											if (ids.id == itemGenId) {
												genresName.push(ids.name);
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
												src={`https://image.tmdb.org/t/p/w200${
													item.poster_path
												}`}
												alt={item.title}
											/>
										</Media>
										<Media body className="ml-5">
											<Media heading>{item.title}</Media>
											<p className="font-weight-bold">
												<span className="bg-warning text-dark px-2">
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
					<Pagination aria-label="Page navigation example">
						{this.loopPagination()}
					</Pagination>
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
