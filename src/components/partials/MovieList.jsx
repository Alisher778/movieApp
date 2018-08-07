import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Card, CardImg, CardBody, CardTitle, Col, Row } from "reactstrap";

class CardComponent extends Component {
	render() {
		return (
			<Row>
				{this.props.data.map((item, i) => {
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
											src={`https://image.tmdb.org/t/p/w300${
												item.backdrop_path
											}?api_key=c93f9215f2085cf5f8aa18a05afa9861`}
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
)(CardComponent);
