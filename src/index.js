import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/partials/Navbar.jsx";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<Navbar />, document.getElementById("root"));
registerServiceWorker();
