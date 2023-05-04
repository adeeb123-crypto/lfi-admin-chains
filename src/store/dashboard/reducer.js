import {
	ERRORS,
	CLEAR_RESPONSE,
	GET_TOTAL_LAUNCHPAD_REQUEST,
	GET_TOTAL_LAUNCHPAD_SUCCESS,
	GET_TOTAL_LAUNCHPAD_FAILURE,
} from "./actionTypes";

const initialState = {
	errors: {},
	response: {},
	totalLunchpadInfo: { isLoading: false, details: {} },
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ERRORS:
			return {
				...state,
				errors: action.payload,
				loading: false,
			};

		case CLEAR_RESPONSE:
			return {
				...state,
				errors: {},
				response: {},
			};

		case GET_TOTAL_LAUNCHPAD_REQUEST:
			return {
				...state,
				totalLunchpadInfo: {
					...state.totalLunchpadInfo,
					isLoading: true,
				},
			};
		case GET_TOTAL_LAUNCHPAD_SUCCESS:
			return {
				...state,
				totalLunchpadInfo: {
					isLoading: false,
					details: action.payload?.data,
				},
			};

		case GET_TOTAL_LAUNCHPAD_FAILURE:
			return {
				...state,
				totalLunchpadInfo: {
					isLoading: false,
					details: action.payload?.data,
				},
			};
		default:
			return state;
	}
};

export default reducer;
