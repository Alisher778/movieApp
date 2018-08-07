import React, { Component } from "react";
import { connect } from "react-redux";
import { FaStar, FaSpinner } from "react-icons/fa";
import {
	Badge,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Col,
	Container,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row
} from "reactstrap";
import { Link } from "react-router-dom";
import defaultImg from "../assets/img/default-780.jpg";
import axios from "axios";
import Spinner from "./partials/Spinner.jsx";

const url =
	"https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861";

class AllMoviesPage extends Component {
	constructor() {
		super();
		this.state = { movies: [], pages: 1, total_results: 10, pageNumber: 1 };
	}

	componentDidMount() {
		document.getElementById("spinner").style.display = "block";
		axios(url)
			.then(res => {
				this.setState({
					movies: res.data.results,
					pages: res.data.total_pages,
					total_results: res.data.total_results
				});
				document.getElementById("spinner").style.display = "none";
			})
			.catch(err => this.setState({ msg: err }));
	}

	// ******** Pagination function ******************

	goToPage(e) {
		document.getElementById("spinner").style.display = "block";
		e.preventDefault();
		axios(
			`https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861&page=${
				this.state.pageNumber
			}`
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
		console.log(this.state);
		return (
			<Container>
				<Spinner />
				<h3 className="list-title my-5 d-flex align-items-center">
					<i />Browse Popular Movies{" "}
					<Badge color="success" id="current-page" pill className="ml-auto">
						{this.state.total_results}
					</Badge>
				</h3>
				<Row>
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
							<Col xs={12} md={4} lg={3} className="my-3" key={i}>
								<Link to={`/movies/${item.id}`}>
									<Card
										onClick={() => {
											this.props.selectMovie(item, genresName);
										}}
									>
										<div className="img-wrapper">
											<CardImg
												top
												width="100%"
												src={
													item.backdrop_path
														? `https://image.tmdb.org/t/p/w780${
																item.backdrop_path
														  }?api_key=c93f9215f2085cf5f8aa18a05afa9861`
														: defaultImg
												}
												alt="Card image cap"
											/>
											<span className="avr-vote">
												<FaStar />
												{item.vote_average}
											</span>
										</div>
										<CardBody>
											<CardTitle className="text-center">
												{item.title.length > 20
													? item.title.substr(0, 20) + "..."
													: item.title}
											</CardTitle>
										</CardBody>
									</Card>
								</Link>
							</Col>
						);
					})}
				</Row>
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
							defaultValue={this.state.pageNumber}
						/>
					</FormGroup>
					<Button onClick={this.goToPage.bind(this)}>Go</Button>
				</div>
			</Container>
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
)(AllMoviesPage);
