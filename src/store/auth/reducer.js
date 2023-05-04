import {
	CONFIRM_LOGIN_SUCCESS,
	CONFIRM_LOGIN_FAILURE,
	CONFIRM_LOGIN_REQUEST,
	CLEAR_VERIFICATION_RESPONSE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	ERRORS,
	LOGIN_USER_ROLE_REQUEST,
	LOGIN_USER_ROLE_SUCCESS,
	CLEAR_RESPONSE,
	LOGOUT_SUCCESS,
	UPDATE_PROFILE_PASSWORD_SUCCESS,
	UPDATE_PROFILE_PASSWORD_FAILURE,
	UPDATE_PROFILE_PASSWORD_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAILURE,
	UPDATE_PROFILE_REQUEST,
	RESEND_VERIFICATION_CODE_SUCCESS,
	RESEND_VERIFICATION_CODE_FAILURE,
	RESEND_VERIFICATION_CODE_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	FORGOT_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	RESET_PASSWORD_REQUEST,
} from "./actionTypes";

const initialState = {
	isAuthenticated: false,
	user: {},
	currentUserRole: {},
	currentUserRolePermissions: [],
	errors: {},
	response: {},
	verificationResponse: {},
	resetResponse: {},
	forgotResponse: {},
	loading: false,
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				verificationResponse: {
					verificationCodeTime: Date.now() + 10000 * 9,
					...action.payload,
				},
				errors: {},
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				verificationResponse: {},
				response: action.payload,
				errors: action.payload,
			};
		case CLEAR_VERIFICATION_RESPONSE:
			return {
				...state,
				errors: {},
				verificationResponse: {},
				response: {},
			};
		case CLEAR_RESPONSE:
			return {
				...state,
				response: {},
			};

		case CONFIRM_LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CONFIRM_LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
				errors: {},
			};
		case CONFIRM_LOGIN_FAILURE:
			return {
				...state,
				errors: action.payload,
				response: action.payload,
				loading: false,
			};

		case LOGOUT_SUCCESS:
			return {
				...state,
				user: {},
				isAuthenticated: false,
				errors: {},
			};

		case ERRORS:
			return {
				...state,
				errors: action.payload,
			};

		case LOGIN_USER_ROLE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case LOGIN_USER_ROLE_SUCCESS:
			let userPermissions = [];
			if (action.payload?.permissions) {
				userPermissions = action.payload?.permissions.map(
					(per) => per.permission
				);
			}
			return {
				...state,
				loading: false,
				currentUserRole: action.payload,
				currentUserRolePermissions: userPermissions,
			};

		case UPDATE_PROFILE_PASSWORD_FAILURE:
		case UPDATE_PROFILE_FAILURE:
			return {
				...state,
				loading: false,
				errors: action.payload?.errors,
				response: action.payload,
			};

		case UPDATE_PROFILE_PASSWORD_SUCCESS:
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				errors: {},
				response: action.payload,
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				errors: {},
				resetResponse: action.payload,
				response: action.payload,
			};

		case RESET_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
				errors: action.payload?.errors,
				response: action.payload,
				resetResponse: action.payload,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				errors: {},
				forgotResponse: action.payload,
				response: action.payload,
			};

		case FORGOT_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
				errors: action.payload?.errors,
				response: action.payload,
				forgotResponse: action.payload,
			};

		case RESEND_VERIFICATION_CODE_SUCCESS:
			return {
				...state,
				loading: false,
				errors: {},
				response: action.payload,
				verificationResponse: {
					...state.verificationResponse,
					verificationCodeTime: Date.now() + 10000 * 9,
				},
			};

		case RESEND_VERIFICATION_CODE_FAILURE:
			return {
				...state,
				loading: false,
				response: action.payload,
				errors: action.payload,
			};
		default:
			return state;
	}
};

export default login;
