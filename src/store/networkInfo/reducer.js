import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_NETWORK_INFO_SUCCESS,
	CREATE_NETWORK_INFO_FAILURE,
	UPDATE_NETWORK_INFO_SUCCESS,
	UPDATE_NETWORK_INFO_FAILURE,
	REMOVE_NETWORK_INFO_FAILURE,
	REMOVE_NETWORK_INFO_SUCCESS,
	TOGGLE_NETWORK_INFO_SUCCESS,
	TOGGLE_NETWORK_INFO_FAILURE,
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
		case CREATE_NETWORK_INFO_SUCCESS:
		case CREATE_NETWORK_INFO_FAILURE:
		case UPDATE_NETWORK_INFO_SUCCESS:
		case UPDATE_NETWORK_INFO_FAILURE:
		case REMOVE_NETWORK_INFO_FAILURE:
		case REMOVE_NETWORK_INFO_SUCCESS:
		case TOGGLE_NETWORK_INFO_SUCCESS:
		case TOGGLE_NETWORK_INFO_FAILURE:
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
