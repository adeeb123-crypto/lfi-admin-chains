import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_LAUNCHPAD_OPTION_SUCCESS,
	CREATE_LAUNCHPAD_OPTION_FAILURE,
	UPDATE_LAUNCHPAD_OPTION_SUCCESS,
	UPDATE_LAUNCHPAD_OPTION_FAILURE,
	REMOVE_LAUNCHPAD_OPTION_FAILURE,
	REMOVE_LAUNCHPAD_OPTION_SUCCESS,
	TOGGLE_LAUNCHPAD_OPTION_SUCCESS,
	TOGGLE_LAUNCHPAD_OPTION_FAILURE,
} from "./actionTypes";

const initialState = {
	errors: {},
	response: {},
	loader: false,
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
		case CREATE_LAUNCHPAD_OPTION_SUCCESS:
		case CREATE_LAUNCHPAD_OPTION_FAILURE:
		case UPDATE_LAUNCHPAD_OPTION_SUCCESS:
		case UPDATE_LAUNCHPAD_OPTION_FAILURE:
		case REMOVE_LAUNCHPAD_OPTION_FAILURE:
		case REMOVE_LAUNCHPAD_OPTION_SUCCESS:
		case TOGGLE_LAUNCHPAD_OPTION_SUCCESS:
		case TOGGLE_LAUNCHPAD_OPTION_FAILURE:
			return {
				...state,
				response: action.payload,
				errors: {},
			};
		default:
			return state;
	}
};

export default reducer;
