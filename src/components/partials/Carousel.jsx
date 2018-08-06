import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardTitle } from "reactstrap";

const url =
	"https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861";

class CarouselComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { movie: [] };
	}

	componentDidMount() {
		axios(url)
			.then(res => this.setState({ movie: res.data.results.slice(0, 4) }))
			.catch(err => this.setState({ msg: err }));
	}
	render() {
		const { movie } = this.state;
		const slides = movie.map((item, i) => {
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
				<Link to={`/movies/${item.id}`} key={i}>
					<div
						onClick={() => {
							this.props.selectMovie(item, genresName);
						}}
					>
						<img
							src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
							alt={item.title}
						/>
						<CardTitle className="text-center big">{item.title}</CardTitle>
					</div>
				</Link>
			);
		});
		var settings = {
			arrows: true,
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000
		};
		return <Slider {...settings}>{slides}</Slider>;
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
)(CarouselComponent);
