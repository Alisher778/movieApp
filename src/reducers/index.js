import { combineReducers } from "redux";
import movie from "./movie";
import selectedMovie from "./selectedMovie";
import search from "./searchMovies";

const reducer = combineReducers({
	movie,
	selectedMovie,
	search
});

export default reducer;
