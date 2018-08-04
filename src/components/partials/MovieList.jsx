import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button
} from "reactstrap";

class CardComponent extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.data);
		return (
			<div>
				{this.props.data.map((item, i) => {
					return (
						<Card key={i}>
							<CardImg
								top
								width="100%"
								src={`https://image.tmdb.org/t/p/w780${
									item.backdrop_path
								}?api_key=c93f9215f2085cf5f8aa18a05afa9861`}
								alt="Card image cap"
							/>
							<CardBody>
								<CardTitle>{item.title}</CardTitle>
								<CardText>{item.overview.substr(0, 120) + "..."}</CardText>
								<Button>Button</Button>
							</CardBody>
						</Card>
					);
				})}
			</div>
		);
	}
}

export default CardComponent;
