import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import persistState from "redux-localstorage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// *********** Components **********************
import Navbar from "./components/partials/Navbar.jsx";
import AllMoviesPage from "./components/AllMoviesPage.jsx";
import HomePage from "./components/HomePage.jsx";
import SearchResultsPage from "./components/SearchResultsPage.jsx";
import SelectedMovie from "./components/partials/SelectedMovie.jsx";

// ********* Other components ***************
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import reducers from "./reducers";
const enhancer = compose(persistState());
const store = createStore(reducers, enhancer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/all-movies" component={AllMoviesPage} />
					<Route exact path="/movies/:id" component={SelectedMovie} />
					<Route exact path="/search/:query" component={SearchResultsPage} />
					<Route component={HomePage} />
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
