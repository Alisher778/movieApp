import React, { Component } from "react";
import { Container } from "reactstrap";
import CarouselComponent from "./partials/Carousel";
import MovieList from "./partials/MovieList";
import axios from "axios";

const url =
	"https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861";
class HomePage extends Component {
	constructor() {
		super();
		this.state = { movies: [] };
	}

	componentDidMount() {
		axios(url)
			.then(res => this.setState({ movies: res.data.results }))
			.catch(err => this.setState({ msg: err }));
	}

	render() {
		console.log(this.state.movies);
		return (
			<section>
				<Container>
					<CarouselComponent />
				</Container>
				<Container>
					<h3 className="list-title">
						<i />Popular Movies
					</h3>
					<MovieList data={this.state.movies} />
				</Container>
			</section>
		);
	}
}

export default HomePage;
