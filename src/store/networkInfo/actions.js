import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_NETWORK_INFO_REQUEST,
	UPDATE_NETWORK_INFO_REQUEST,
	REMOVE_NETWORK_INFO_REQUEST,
	TOGGLE_NETWORK_INFO_REQUEST,
} from "./actionTypes";

export const clearResponse = () => {
	return {
		type: CLEAR_RESPONSE,
		payload: {},
	};
};

export const create = (data) => {
	return {
		type: CREATE_NETWORK_INFO_REQUEST,
		payload: { data },
	};
};

export const update = (data) => {
	return {
		type: UPDATE_NETWORK_INFO_REQUEST,
		payload: { data },
	};
};

export const toggle = (id) => {
	return {
		type: TOGGLE_NETWORK_INFO_REQUEST,
		payload: { id },
	};
};

export const remove = (id) => {
	return {
		type: REMOVE_NETWORK_INFO_REQUEST,
		payload: { id },
	};
};
