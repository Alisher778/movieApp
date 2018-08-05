import React, { Component } from "react";
import { FaClock, FaStar } from "react-icons/fa";
import { connect } from "react-redux";
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

class SelectedMovie extends Component {
	render() {
		let data = this.props.selectedMovie;
		return (
			<Row>
				<Col xs={12} md={4} lg={3} className="my-3">
					<Card>
						<div className="img-wrapper">
							<CardImg
								top
								width="100%"
								src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
								alt="Card image cap"
							/>
							<span className="avr-vote">
								<FaStar />
								{data.title}
							</span>
						</div>
						<CardBody>
							<CardTitle className="text-center" />
							<CardText>{}</CardText>
							<p>
								<strong>
									<FaClock /> {data.release_date}
								</strong>
							</p>
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}
const mapStateToProps = state => {
	return {
		selectedMovie: state.selectedMovie
	};
};
export default connect(mapStateToProps)(SelectedMovie);
