import {
	ERRORS,
	CLEAR_RESPONSE,
	GET_TOTAL_LAUNCHPAD_REQUEST,
	GET_TOTAL_LAUNCHPAD_SUCCESS,
	GET_TOTAL_LAUNCHPAD_FAILURE,
} from "./actionTypes";

export const clearResponse = () => {
	return {
		type: CLEAR_RESPONSE,
		payload: {},
	};
};

export const getTotalLaunchpad = (data) => {
	return {
		type: GET_TOTAL_LAUNCHPAD_REQUEST,
		payload: data,
	};
};
