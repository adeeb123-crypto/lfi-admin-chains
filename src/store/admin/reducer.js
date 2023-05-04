import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_ADMIN_SUCCESS,
	CREATE_ADMIN_FAILURE,
	UPDATE_ADMIN_SUCCESS,
	UPDATE_ADMIN_FAILURE,
	REMOVE_ADMIN_SUCCESS,
	REMOVE_ADMIN_FAILURE,
	CREATE_ROLE_SUCCESS,
	CREATE_ROLE_FAILURE,
	UPDATE_ROLE_SUCCESS,
	UPDATE_ROLE_FAILURE,
	REMOVE_ROLE_SUCCESS,
	REMOVE_ROLE_FAILURE,
	CREATE_PERMISSION_SUCCESS,
	CREATE_PERMISSION_FAILURE,
	UPDATE_PERMISSION_SUCCESS,
	UPDATE_PERMISSION_FAILURE,
	REMOVE_PERMISSION_SUCCESS,
	REMOVE_PERMISSION_FAILURE,
	PERMISSION_FAILURE,
	PERMISSION_SUCCESS,
	ROLE_FAILURE,
	ROLE_SUCCESS,
	TOGGLE_PERMISSION_SUCCESS,
	TOGGLE_PERMISSION_FAILURE,
	TOGGLE_ROLE_SUCCESS,
	TOGGLE_ROLE_FAILURE,
} from "./actionTypes";

const initialState = {
	errors: {},
	response: {},
	loader: false,
	roles: [],
	permissions: [],
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
		case CREATE_ADMIN_SUCCESS:
		case CREATE_ADMIN_FAILURE:
		case UPDATE_ADMIN_SUCCESS:
		case UPDATE_ADMIN_FAILURE:
		case REMOVE_ADMIN_SUCCESS:
		case REMOVE_ADMIN_FAILURE:
		case CREATE_ROLE_SUCCESS:
		case CREATE_ROLE_FAILURE:
		case UPDATE_ROLE_SUCCESS:
		case UPDATE_ROLE_FAILURE:
		case REMOVE_ROLE_SUCCESS:
		case REMOVE_ROLE_FAILURE:
		case CREATE_PERMISSION_SUCCESS:
		case CREATE_PERMISSION_FAILURE:
		case UPDATE_PERMISSION_SUCCESS:
		case UPDATE_PERMISSION_FAILURE:
		case REMOVE_PERMISSION_SUCCESS:
		case REMOVE_PERMISSION_FAILURE:
		case TOGGLE_PERMISSION_SUCCESS:
		case TOGGLE_PERMISSION_FAILURE:
		case TOGGLE_ROLE_SUCCESS:
		case TOGGLE_ROLE_FAILURE:
			return {
				...state,
				response: action.payload,
				errors: {},
			};

		case PERMISSION_FAILURE:
			return {
				...state,
				permissions: [],
				errors: {},
			};
		case PERMISSION_SUCCESS:
			return {
				...state,
				permissions: action.payload.data,
				errors: {},
			};
		case ROLE_SUCCESS:
			return {
				...state,
				roles: action.payload.data,
				errors: {},
			};
		case ROLE_FAILURE:
			return {
				...state,
				roles: [],
				errors: {},
			};
		default:
			return state;
	}
};

export default reducer;
