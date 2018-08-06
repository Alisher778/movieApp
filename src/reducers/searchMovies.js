const initialState = { data: [] };

const search = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH_MOVIE":
			return {
				...state,
				data: action.data
			};
		default:
			return state;
	}
};

export default search;
