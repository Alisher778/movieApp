const initialState = { title: "Hello" };

const movie = (state = initialState, action) => {
	const a = action.data;

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
		default:
			return state;
	}
};

export default movie;
