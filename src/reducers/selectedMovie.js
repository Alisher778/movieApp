import axios from "axios";
const initialState = { title: "Hello" };

const movie = (state = initialState, action) => {
	const a = action.data;
	// let genresName = [];
	// // Fetch data to get genres id and map to store theirs names as genresName
	// axios(
	// 	"https://api.themoviedb.org/3/genre/movie/list?api_key=c93f9215f2085cf5f8aa18a05afa9861"
	// )
	// 	.then(res => {
	// 		a.genre_ids.map(item => {
	// 			res.data.genres.map(ids => {
	// 				if (ids.id == item) {
	// 					genresName.push(ids.name);
	// 				}
	// 			});
	// 		});
	// 	})
	// 	.catch(err => console.log(err.message));

	switch (action.type) {
		case "SELECT_MOVIE":
			return {
				...state,
				backdrop_path: a.backdrop_path,
				id: a.id,
				genre: a.genre_ids,
				genresName: action.genresName,
				original_title: a.original_title,
				overview: a.overview,
				original_language: a.original_language,
				popularity: a.popularity,
				poster_path: a.poster_path,
				release_date: a.release_date,
				title: a.title,
				video: a.video,
				vote_average: a.vote_average,
				vote_count: a.vote_count
			};
			break;
		default:
			return state;
			break;
	}
};

export default movie;
