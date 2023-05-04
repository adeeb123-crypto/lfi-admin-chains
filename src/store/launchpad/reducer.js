import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_LAUNCHPAD_SUCCESS,
	CREATE_LAUNCHPAD_FAILURE,
	UPDATE_LAUNCHPAD_SUCCESS,
	UPDATE_LAUNCHPAD_FAILURE,
	REMOVE_LAUNCHPAD_FAILURE,
	REMOVE_LAUNCHPAD_SUCCESS,
	TOGGLE_LAUNCHPAD_SUCCESS,
	TOGGLE_LAUNCHPAD_FAILURE,
	GET_LAUNCHPAD_OPTION_REQUEST,
	GET_LAUNCHPAD_OPTION_SUCCESS,
	GET_LAUNCHPAD_OPTION_FAILURE,
	GET_TOKEN_DETAILS_REQUEST,
	GET_TOKEN_DETAILS_SUCCESS,
	GET_TOKEN_DETAILS_FAILURE,
	CLEAR_TOKEN_RESPONSE,
	CLEAR_NOTIFICATION,
	DEPLOY_LAUNCHPAD_REQUEST,
	DEPLOY_LAUNCHPAD_SUCCESS,
	DEPLOY_LAUNCHPAD_FAILURE,
	GET_LAUNCHPAD_REQUEST,
	GET_LAUNCHPAD_SUCCESS,
	GET_LAUNCHPAD_FAILURE,
	GET_NETWORK_INFO_REQUEST,
	GET_NETWORK_INFO_SUCCESS,
	GET_NETWORK_INFO_FAILURE,
	GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
	GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
	GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE,
	CREATE_LAUNCHPAD_REQUEST,
	UPDATE_LAUNCHPAD_REQUEST,
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
	CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
	GET_LAUCHPAD_STAGES_REQUEST,
	GET_LAUCHPAD_STAGES_SUCCESS,
	GET_LAUCHPAD_STAGES_FAILURE,
} from "./actionTypes";

const initialState = {
	errors: {},
	response: {},
	notifications: {},
	isLoading: false,
	isDeploying: false,
	isStageLoading: false,
	launchpadOptions: [],
	launchpads: [],
	networkInfo: [],
	lauchpadDeployHistory: {},
	tokenDetailResponse: {},
	stageResponse: {},
	deployStageResponse: {},
	updatedLaunchpadResponse: {},
	updatedLaunchpadStages: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ERRORS:
			return {
				...state,
				errors: action.payload,
				isLoading: false,
			};
		case CLEAR_RESPONSE:
			return {
				...state,
				errors: {},
				response: {},
			};
		case DEPLOY_LAUNCHPAD_REQUEST:
			return {
				...state,
				isDeploying: true,
			};
		case DEPLOY_LAUNCHPAD_SUCCESS:
			return {
				...state,
				isDeploying: false,
				response: action.payload,
				notifications: action.payload,
				errors: {},
			};
		case DEPLOY_LAUNCHPAD_FAILURE:
			return {
				...state,
				isDeploying: false,
				response: action.payload,
				notifications: action.payload,
				errors: action.payload,
			};

		case CREATE_LAUNCHPAD_REQUEST:
		case UPDATE_LAUNCHPAD_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case TOGGLE_SWAP_SUCCESS:
		case TOGGLE_SWAP_FAILURE:
		case CREATE_LAUNCHPAD_SUCCESS:
		case CREATE_LAUNCHPAD_FAILURE:
		case UPDATE_LAUNCHPAD_SUCCESS:
		case UPDATE_LAUNCHPAD_FAILURE:
		case REMOVE_LAUNCHPAD_FAILURE:
		case REMOVE_LAUNCHPAD_SUCCESS:
		case TOGGLE_LAUNCHPAD_SUCCESS:
		case TOGGLE_LAUNCHPAD_FAILURE:
			return {
				...state,
				response: action.payload,
				notifications: action.payload,
				isLoading: false,
				errors: {},
			};
		case GET_LAUNCHPAD_OPTION_SUCCESS:
			return {
				...state,
				launchpadOptions: action.payload?.data,
			};
		case GET_LAUNCHPAD_OPTION_FAILURE:
			return {
				...state,
				launchpadOptions: [],
			};

		//////////////////////////////////////////

		case GET_LAUNCHPAD_SUCCESS:
			return {
				...state,
				launchpads: action.payload?.data,
			};
		case GET_LAUNCHPAD_FAILURE:
			return {
				...state,
				launchpads: [],
			};

		/////////////////////////////////////

		case GET_NETWORK_INFO_SUCCESS:
			return {
				...state,
				networkInfo: action.payload?.data,
			};
		case GET_NETWORK_INFO_FAILURE:
			return {
				...state,
				networkInfo: [],
			};

		//////////////////////////////////////////

		case GET_TOKEN_DETAILS_REQUEST:
			return {
				...state,
				isLoading: false,
				tokenDetailResponse: {},
			};
		case GET_TOKEN_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: true,
				tokenDetailResponse: action.payload,
				errors: {},
			};
		case GET_TOKEN_DETAILS_FAILURE:
			return {
				...state,
				isLoading: true,
				errors: action.payload?.data?.errors,
				tokenDetailResponse: action.payload,
			};

		case CLEAR_TOKEN_RESPONSE:
			return {
				...state,
				isLoading: false,
				tokenDetailResponse: {},
			};

		/////////////////////////////////////

		case CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS:
			return {
				...state,
				lauchpadDeployHistory: action.payload,
			};

		case GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS:
			return {
				...state,
				lauchpadDeployHistory: action.payload?.data,
			};

		case GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE:
			return {
				...state,
				lauchpadDeployHistory: {},
			};

		/////////////////
		case UPDATE_STAGE_SUCCESS:
		case TOGGLE_STAGE_SWAP_SUCCESS:
			return {
				...state,
				isLoading: false,
				stageResponse: action.payload,
				errors: {},
			};
		case UPDATE_STAGE_FAILURE:
		case TOGGLE_STAGE_SWAP_FAILURE:
			return {
				...state,
				isLoading: false,
				errors: action.payload?.data?.errors,
				stageResponse: action.payload,
			};
		/////////////////

		case DEPLOY_UPDATED_STAGE_REQUEST:
			return {
				...state,
				isStageLoading: true,
			};

		case DEPLOY_UPDATED_STAGE_SUCCESS:
			return {
				...state,
				isStageLoading: false,
				deployStageResponse: action.payload,
				errors: {},
			};
		case DEPLOY_UPDATED_STAGE_FAILURE:
			return {
				...state,
				isStageLoading: false,
				errors: action.payload?.data?.errors,
				deployStageResponse: action.payload,
			};
		/////////////////
		case GET_UPDATED_LAUNCHPAD_REQUEST:
			return {
				...state,
				isStageLoading: true,
			};

		case GET_UPDATED_LAUNCHPAD_SUCCESS:
			return {
				...state,
				isStageLoading: false,
				updatedLaunchpadResponse: action.payload,
				errors: {},
			};
		case GET_UPDATED_LAUNCHPAD_FAILURE:
			return {
				...state,
				isStageLoading: false,
				errors: action.payload?.data?.errors,
				updatedLaunchpadResponse: action.payload,
			};

		//////////////////////////////////////////
		case GET_LAUCHPAD_STAGES_SUCCESS:
			return {
				...state,
				updatedLaunchpadStages: action.payload?.data,
			};
		case GET_LAUCHPAD_STAGES_FAILURE:
			return {
				...state,
				updatedLaunchpadStages: [],
			};
		/////////////////////////////////////
		case CLEAR_STAGE_RESPONSE:
			return {
				...state,
				isLoading: false,
				errors: {},
				stageResponse: {},
			};
		//////////////////////////////
		case CLEAR_NOTIFICATION:
			return {
				...state,
				notifications: {},
			};
		default:
			return state;
	}
};

export default reducer;
