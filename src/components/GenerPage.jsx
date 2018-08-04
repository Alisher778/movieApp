import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

class GenerPage extends Component {
	constructor() {
		super();

		this.state = { geners: "" };
	}

	componentDidMount() {
		fetch(
			"https://api.themoviedb.org/3/genre/movie/list?api_key=c93f9215f2085cf5f8aa18a05afa9861"
		)
			.then(res => res.json())
			.then(data => {
				const { geners } = data;
				console.log(geners);
			}) //this.setState({ geners: res.data }))
			.catch(err => console.log(err));
	}

	render() {
		console.log(this.state);
		return (
			<section>
				<Container>
					<h1>Gener Page</h1>
					<ListGroup>
						{this.state.geners.forEach((item, i) => {
							return <ListGroupItem>{item.item}</ListGroupItem>;
						})}
					</ListGroup>
				</Container>
			</section>
		);
	}
}

export default GenerPage;
