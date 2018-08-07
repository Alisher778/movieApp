import React, { Component } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import CarouselComponent from "./partials/Carousel";
import MovieList from "./partials/MovieList";
import axios from "axios";
import Spinner from "./partials/Spinner.jsx";

const url =
	"https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861";
class HomePage extends Component {
	constructor() {
		super();
		this.state = { movies: [] };
	}

	componentDidMount() {
		document.getElementById("spinner").style.display = "block";
		axios(url)
			.then(res => {
				this.setState({ movies: res.data.results });
				document.getElementById("spinner").style.display = "none";
			})
			.catch(err => this.setState({ msg: err }));
	}

	render() {
		return (
			<section>
				<Spinner />
				<Container className="my-5">
					<CarouselComponent />
				</Container>
				<Container>
					<h3 className="list-title">
						<i />Popular Movies
					</h3>
					<MovieList data={this.state.movies} />
					<div className="text-center">
						<Link to="/all-movies" className="btn btn-lg btn-primary my-5">
							Load More
						</Link>
					</div>
				</Container>
			</section>
		);
	}
}

export default HomePage;
