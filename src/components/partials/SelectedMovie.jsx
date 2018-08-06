import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import { connect } from "react-redux";
import axios from "axios";
import {
	Container,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Col,
	ListGroup,
	ListGroupItem,
	Row
} from "reactstrap";
import defaultImg from "../../assets/img/default.png";

class SelectedMovie extends Component {
	constructor() {
		super();
		this.state = { genres: [], selectedGenres: [] };
	}

	componentDidMount() {
		axios(
			"https://api.themoviedb.org/3/genre/movie/list?api_key=c93f9215f2085cf5f8aa18a05afa9861&language=en-US"
		)
			.then(res => this.setState({ genres: res.data.genres }))
			.catch(err => console.log(err.message));
	}

	render() {
		let data = this.props.selectedMovie;
		return (
			<Container>
				<Card>
					<Row>
						<Col xs={12} md={4} className="my-3">
							<div className="img-wrapper">
								<CardImg
									top
									width="100%"
									src={
										data.poster_path
											? `https://image.tmdb.org/t/p/w780${data.poster_path}`
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
			</Container>
		);
	}
}
const mapStateToProps = state => {
	return {
		selectedMovie: state.selectedMovie
	};
};
export default connect(mapStateToProps)(SelectedMovie);
