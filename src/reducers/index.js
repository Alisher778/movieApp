import { combineReducers } from "redux";
import movie from "./movie";
import selectedMovie from "./selectedMovie";

const reducer = combineReducers({
	movie,
	selectedMovie
});

export default reducer;
