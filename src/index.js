import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// *********** Components **********************
import Navbar from "./components/partials/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import GenerPage from "./components/GenerPage.jsx";

// ********* Other components ***************
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import reducers from "./reducers";

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/" component={HomePage} />
				</Switch>
			</div>
		</Router>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
