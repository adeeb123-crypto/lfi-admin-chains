import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	CLEAR_RESPONSE,
	LOGIN_USER_ROLE_REQUEST,
	CONFIRM_LOGIN_SUCCESS,
	CONFIRM_LOGIN_FAILURE,
	CONFIRM_LOGIN_REQUEST,
	CLEAR_VERIFICATION_RESPONSE,
	SET_LOGIN_REQUEST,
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
	// ERRORS,
} from "./actionTypes";

export const login = (credentials, history) => {
	return {
		type: LOGIN_REQUEST,
		payload: { credentials, history },
	};
};

export const confirmLogin = (data, history) => {
	return {
		type: CONFIRM_LOGIN_REQUEST,
		payload: { ...data, history },
	};
};

export const setLogin = (token, history) => {
	return {
		type: SET_LOGIN_REQUEST,
		payload: { token, history },
	};
};

export const clearLoginVerificationResponse = () => {
	return {
		type: CLEAR_VERIFICATION_RESPONSE,
		payload: {},
	};
};

export const setCurrentUser = (data) => {
	return {
		type: CONFIRM_LOGIN_SUCCESS,
		payload: data,
	};
};

export const logout = () => {
	return {
		type: LOGOUT_REQUEST,
		payload: {},
	};
};

export const getLoginUserRole = (id) => {
	return {
		type: LOGIN_USER_ROLE_REQUEST,
		payload: { id },
	};
};
export const clearResponse = () => {
	return {
		type: CLEAR_RESPONSE,
		payload: {},
	};
};

export const updateProfile = (data) => {
	return {
		type: UPDATE_PROFILE_REQUEST,
		payload: data,
	};
};

export const updateProfilePassword = (data) => {
	return {
		type: UPDATE_PROFILE_PASSWORD_REQUEST,
		payload: data,
	};
};

export const resendVerificationCode = (data) => {
	return {
		type: RESEND_VERIFICATION_CODE_REQUEST,
		payload: data,
	};
};

export const forgotPassword = (data) => {
	return {
		type: FORGOT_PASSWORD_REQUEST,
		payload: data,
	};
};

export const resetPassword = (data) => {
	return {
		type: RESET_PASSWORD_REQUEST,
		payload: data,
	};
};
