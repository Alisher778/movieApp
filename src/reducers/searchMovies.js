const initialState = { data: [] };

const search = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH_MOVIE":
			return {
				...state,
				data: action.data
			};
			break;
		default:
			return state;
			break;
	}
};

export default search;
