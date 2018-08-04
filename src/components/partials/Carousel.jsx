import React, { Component } from "react";
import axios from "axios";
import {
	Carousel,
	CarouselItem,
	CarouselControl,
	CarouselIndicators,
	CarouselCaption
} from "reactstrap";

const url =
	"https://api.themoviedb.org/3/movie/popular?api_key=c93f9215f2085cf5f8aa18a05afa9861";
const items = [
	{
		src: "",
		altText: "Slide 1",
		caption: "Slide 1"
	},
	{
		src: "",
		altText: "Slide 2",
		caption: "Slide 2"
	},
	{
		src: "",
		altText: "Slide 3",
		caption: "Slide 3"
	},
	{
		src: "",
		altText: "Slide 4",
		caption: "Slide 4"
	}
];

class CarouselComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0, movie: items, msg: "" };
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	componentDidMount() {
		axios(url)
			.then(res => this.setState({ movie: res.data.results.slice(0, 4) }))
			.catch(err => this.setState({ msg: err }));
	}

	onExiting() {
		this.animating = true;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) return;
		const nextIndex =
			this.state.activeIndex === items.length - 1
				? 0
				: this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	}

	previous() {
		if (this.animating) return;
		const nextIndex =
			this.state.activeIndex === 0
				? items.length - 1
				: this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	}

	goToIndex(newIndex) {
		if (this.animating) return;
		this.setState({ activeIndex: newIndex });
	}

	render() {
		const { activeIndex, movie } = this.state;
		const slides = movie.map((item, i) => {
			return (
				<CarouselItem
					key={i}
					onExiting={this.onExiting}
					onExited={this.onExited}
					src={item.src}
					altText={item.title}
				>
					<img
						src={`https://image.tmdb.org/t/p/w780${
							item.backdrop_path
						}?api_key=c93f9215f2085cf5f8aa18a05afa9861`}
						alt={item.title}
					/>
					<CarouselCaption
						captionText={"item.title"}
						captionHeader={item.title}
						key={item.id}
					/>
				</CarouselItem>
			);
		});

		return (
			<Carousel
				activeIndex={activeIndex}
				next={this.next}
				previous={this.previous}
			>
				<CarouselIndicators
					items={items}
					activeIndex={activeIndex}
					onClickHandler={this.goToIndex}
				/>
				{slides}
				<CarouselControl
					direction="prev"
					directionText="Previous"
					onClickHandler={this.previous}
				/>
				<CarouselControl
					direction="next"
					directionText="Next"
					onClickHandler={this.next}
				/>
			</Carousel>
		);
	}
}

export default CarouselComponent;
