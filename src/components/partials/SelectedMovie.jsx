import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	ListGroup,
	ListGroupItem,
	Row,
	Card,
	Button,
	CardImg,
	CardTitle,
	CardText,
	CardGroup,
	CardSubtitle,
	CardBody,
	Col,
	Container
} from "reactstrap";
import defaultImg from "../../assets/img/default-200.jpg";
import Spinner from "../partials/Spinner.jsx";
import SimilarMovies from "./SimilarMovies.jsx";

const apiKey = "?api_key=c93f9215f2085cf5f8aa18a05afa9861";

class SelectedMovie extends Component {
	constructor() {
		super();
		this.state = {
			genres: [],
			selectedGenres: [],
			similarMovies: [],
			video: []
		};
	}

	componentDidMount() {
		document.getElementById("spinner").style.display = "block";
		const { id } = this.props.match.params;
		const genresUrl = `https://api.themoviedb.org/3/genre/movie/list${apiKey}`;
		const similarUrl = `https://api.themoviedb.org/3/movie/${id}/similar${apiKey}`;
		const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos${apiKey}`;

		axios
			.all([axios.get(genresUrl), axios.get(similarUrl), axios.get(videoUrl)])
			.then(
				axios.spread((genres, similarMovies, video) => {
					this.setState({
						genres: genres.data.genres,
						similarMovies: similarMovies.data.results,
						video: video.data.results
					});
					document.getElementById("spinner").style.display = "none";
				})
			)
			.catch(err => {
				this.props.history.push("path/to/push");
				console.log(err);
			});
	}

	// Update Similar Movies List
	updateSimilarMovies(item, genresName) {
		this.props.selectMovie(item, genresName);

		const { id } = this.props.match.params;
		const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c93f9215f2085cf5f8aa18a05afa9861`;

		axios(url)
			.then(res => {
				this.setState({ similarMovies: res.data.results });
			})
			.catch(err => console.log(err.message));
	}

	render() {
		let data = this.props.selectedMovie;
		return (
			<Container>
				<h3 className="list-title my-5 d-flex align-items-center">
					<i />Movie Deatils
				</h3>
				<Spinner />
				<Card>
					<Row>
						<Col xs={12} md={4} className="my-3">
							<div className="img-wrapper">
								<CardImg
									style={{ marginLeft: "15px" }}
									top
									width="100%"
									src={
										data.poster_path
											? `https://image.tmdb.org/t/p/w300${data.poster_path}`
											: defaultImg
									}
									alt="Card image cap"
								/>
								<span className="avr-vote">
									<FaStar />
									{data.vote_average}
								</span>
							</div>
						</Col>
						<Col xs={12} md={8} className="my-3">
							<CardBody>
								<CardTitle className="text-center">{data.title}</CardTitle>
								<CardText>{data.overview}</CardText>
								<ListGroup flush>
									<ListGroupItem>
										<b>Release Date:</b> {data.release_date}
									</ListGroupItem>
									<ListGroupItem>
										<b>Language:</b> {data.original_language}
									</ListGroupItem>
									<ListGroupItem>
										<b>Votes</b> {data.vote_count}
									</ListGroupItem>
									<ListGroupItem>
										<b>Popularity:</b> {data.popularity}
									</ListGroupItem>
									<ListGroupItem>
										<b>Original Title:</b> {data.original_title}
									</ListGroupItem>
									<ListGroupItem>
										<b>Genres:</b> {data.genresName.join(", ")}
									</ListGroupItem>
								</ListGroup>
							</CardBody>
						</Col>
					</Row>
				</Card>

				<Container className="my-5">
					<h3 className="list-title my-5 d-flex align-items-center">
						<i />Similar Movies
					</h3>
					<Row id="similar-movies-row">
						{this.state.similarMovies.slice(0, 6).map((item, i) => {
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
								<Col xs={4} md={2} key={i}>
									<Link to={`/movies/${item.id}`}>
										<Card
											onClick={() => {
												this.updateSimilarMovies(item, genresName);
											}}
										>
											<CardImg
												top
												width="100%"
												src={
													item.poster_path
														? `https://image.tmdb.org/t/p/w92${
																item.poster_path
														  }?api_key=c93f9215f2085cf5f8aa18a05afa9861`
														: defaultImg
												}
												alt={item.title || item.name}
											/>
											<CardTitle>
												{item.title.substr(0, 18) || item.name.substr(0, 18)}
											</CardTitle>
										</Card>
									</Link>
								</Col>
							);
						})}
					</Row>
				</Container>
			</Container>
		);
	}
}
const mapStateToProps = state => {
	return {
		selectedMovie: state.selectedMovie
	};
};
const mapDispatchToProps = dispatch => {
	return {
		selectMovie: (data, genresName) =>
			dispatch({ type: "SELECT_MOVIE", data, genresName })
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectedMovie);
