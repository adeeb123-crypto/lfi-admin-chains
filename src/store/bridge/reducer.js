import {
	GET_ALL_TRANSACTIONS_REQUEST,
	GET_ALL_TRANSACTIONS_SUCCESS,
	GET_ALL_TRANSACTIONS_FAILURE,
	
} from "./actionTypes";

const initialState = {
	errors: {},
	response: {},
	responseData: {},
	loader: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_TRANSACTIONS_FAILURE:
		
			return {
				...state,
				errors: action.payload,
				loading: false,
			};
	
		case GET_ALL_TRANSACTIONS_SUCCESS:
		case GET_ALL_TRANSACTIONS_FAILURE:
	
			return {
				...state,
				responseData: action.payload?.data,
				errors: {},
			};
		default:
			return state;
	}
};

export default reducer;
