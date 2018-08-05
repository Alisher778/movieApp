import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FaClock, FaStar } from "react-icons/fa";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Col,
	Row
} from "reactstrap";

class CardComponent extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props);
		return (
			<Row>
				{this.props.data.map((item, i) => {
					console.log(item);
					return (
						<Col xs={12} md={4} lg={3} className="my-3" key={i}>
							<Link to={`/movies/${item.id}`}>
								<Card
									onClick={() => {
										console.log("clicked");
										this.props.selectMovie(item);
									}}
								>
									<div className="img-wrapper">
										<CardImg
											top
											width="100%"
											src={`https://image.tmdb.org/t/p/w780${
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
										{
											<CardTitle className="text-center">
												{item.title.length > 20
													? item.title.substr(0, 20) + "..."
													: item.title}
											</CardTitle>
											/*<CardText>{item.overview.substr(0, 120) + "..."}</CardText>
									<p>
										<strong>
											<FaClock /> {item.release_date}
										</strong>
									</p>
              */
										}
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
		selectMovie: data => dispatch({ type: "SELECT_MOVIE", data })
	};
};

export default connect(
	null,
	mapDispatchToProps
)(CardComponent);
