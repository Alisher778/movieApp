import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {
	Card,
	Button,
	CardImg,
	CardTitle,
	CardText,
	CardGroup,
	CardSubtitle,
	CardBody,
	Row,
	Col,
	Container
} from "reactstrap";

class SimilarMovies extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const movieList = this.props.data.slice(0, 6);

		return (
			<Container className="my-5">
				<h3 className="list-title my-5 d-flex align-items-center">
					<i />Similar
				</h3>
				<Row id="similar-movies-row">
					{movieList.map((item, i) => {
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
											this.props.selectMovie(item, genresName);
										}}
									>
										<CardImg
											top
											width="100%"
											src={`https://image.tmdb.org/t/p/w92${
												item.poster_path
											}?api_key=c93f9215f2085cf5f8aa18a05afa9861`}
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
)(SimilarMovies);
