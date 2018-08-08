import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

import { Button } from "reactstrap";

const ErrorPage = () => {
	return (
		<section id="error-page">
			<div>
				<FaExclamationTriangle id="sign-icon" className="text-danger" />
				<h1>Oops! 404</h1>
				<h5>Sorry! The page you are looking for does not exist</h5>
				<Link to="/" className="btn btn-warning btn-lg">
					Home Page
				</Link>
			</div>
		</section>
	);
};

export default ErrorPage;
