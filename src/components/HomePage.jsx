import React, { Component } from "react";
import { Container } from "reactstrap";
import CarouselComponent from "./partials/Carousel";

class HomePage extends Component {
	render() {
		return (
			<section>
				<Container>
					<CarouselComponent />
				</Container>
			</section>
		);
	}
}

export default HomePage;
