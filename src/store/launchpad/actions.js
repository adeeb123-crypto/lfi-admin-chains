import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_LAUNCHPAD_REQUEST,
	UPDATE_LAUNCHPAD_REQUEST,
	REMOVE_LAUNCHPAD_REQUEST,
	TOGGLE_LAUNCHPAD_REQUEST,
	GET_LAUNCHPAD_REQUEST,
	GET_LAUNCHPAD_SUCCESS,
	GET_LAUNCHPAD_FAILURE,
	GET_LAUNCHPAD_OPTION_REQUEST,
	GET_LAUNCHPAD_OPTION_SUCCESS,
	GET_LAUNCHPAD_OPTION_FAILURE,
	GET_TOKEN_DETAILS_REQUEST,
	GET_TOKEN_DETAILS_SUCCESS,
	GET_TOKEN_DETAILS_FAILURE,
	DEPLOY_LAUNCHPAD_REQUEST,
	DEPLOY_LAUNCHPAD_SUCCESS,
	DEPLOY_LAUNCHPAD_FAILURE,
	CLEAR_TOKEN_RESPONSE,
	CLEAR_NOTIFICATION,
	UPDATE_LAUNCHPAD_ACTIVE_REQUEST,
	GET_NETWORK_INFO_REQUEST,
	GET_NETWORK_INFO_SUCCESS,
	GET_NETWORK_INFO_FAILURE,
	GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
	GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
	GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE,
	TOGGLE_SWAP_REQUEST,
	TOGGLE_SWAP_SUCCESS,
	TOGGLE_SWAP_FAILURE,
	UPDATE_STAGE_REQUEST,
	UPDATE_STAGE_SUCCESS,
	UPDATE_STAGE_FAILURE,
	TOGGLE_STAGE_SWAP_REQUEST,
	TOGGLE_STAGE_SWAP_SUCCESS,
	TOGGLE_STAGE_SWAP_FAILURE,
	CLEAR_STAGE_RESPONSE,
	DEPLOY_UPDATED_STAGE_REQUEST,
	DEPLOY_UPDATED_STAGE_SUCCESS,
	DEPLOY_UPDATED_STAGE_FAILURE,
	GET_UPDATED_LAUNCHPAD_REQUEST,
	GET_UPDATED_LAUNCHPAD_SUCCESS,
	GET_UPDATED_LAUNCHPAD_FAILURE,
	GET_LAUCHPAD_STAGES_REQUEST,
	GET_LAUCHPAD_STAGES_SUCCESS,
	GET_LAUCHPAD_STAGES_FAILURE,
	CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
} from "./actionTypes";

export const clearResponse = () => {
	return {
		type: CLEAR_RESPONSE,
		payload: {},
	};
};
export const clearStageResponse = () => {
	return {
		type: CLEAR_STAGE_RESPONSE,
		payload: {},
	};
};

export const clearNotification = () => {
	return {
		type: CLEAR_NOTIFICATION,
		payload: {},
	};
};

export const getLaunchpadOptions = () => {
	return {
		type: GET_LAUNCHPAD_OPTION_REQUEST,
		payload: {},
	};
};

export const create = (data) => {
	return {
		type: CREATE_LAUNCHPAD_REQUEST,
		payload: { data },
	};
};

export const update = (data) => {
	return {
		type: UPDATE_LAUNCHPAD_REQUEST,
		payload: { data },
	};
};

export const toggle = (id) => {
	return {
		type: TOGGLE_LAUNCHPAD_REQUEST,
		payload: { id },
	};
};

export const remove = (id) => {
	return {
		type: REMOVE_LAUNCHPAD_REQUEST,
		payload: { id },
	};
};

export const getLaunchpads = (data) => {
	return {
		type: GET_LAUNCHPAD_REQUEST,
		payload: data,
	};
};

export const getNetworkInfo = (data) => {
	return {
		type: GET_NETWORK_INFO_REQUEST,
		payload: data,
	};
};

export const getTokenDetails = (data) => {
	return {
		type: GET_TOKEN_DETAILS_REQUEST,
		payload: data,
	};
};

export const clearTokenResponse = () => {
	return {
		type: CLEAR_TOKEN_RESPONSE,
		payload: {},
	};
};

export const deploy = (data) => {
	return {
		type: DEPLOY_LAUNCHPAD_REQUEST,
		payload: data,
	};
};

export const getLaunchpadDeployHistory = (data) => {
	return {
		type: GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
		payload: data,
	};
};

export const getContinueLaunchpadDeployHistory = (data) => {
	return {
		type: CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
		payload: data,
	};
};

export const toggleSwap = (data) => {
	return {
		type: TOGGLE_SWAP_REQUEST,
		payload: data,
	};
};

export const updateStage = (data) => {
	return {
		type: UPDATE_STAGE_REQUEST,
		payload: data,
	};
};

export const toggleStageSwap = (data) => {
	return {
		type: TOGGLE_STAGE_SWAP_REQUEST,
		payload: data,
	};
};

export const deployUpdatedStage = (data) => {
	return {
		type: DEPLOY_UPDATED_STAGE_REQUEST,
		payload: data,
	};
};

export const getUpdatedLaunchpad = (data) => {
	return {
		type: GET_UPDATED_LAUNCHPAD_REQUEST,
		payload: data,
	};
};

export const getLauchpadStages = (data) => {
	return {
		type: GET_LAUCHPAD_STAGES_REQUEST,
		payload: data,
	};
};
