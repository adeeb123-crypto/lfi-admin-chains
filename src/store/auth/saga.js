import { call, put, takeEvery } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {
	loginUser,
	getLoginUserRole as getUserRole,
	confirmLoginUser,
	updateProfilePassword,
	updateProfile,
	resendVerificationCode,
	forgotPassword,
	resetPassword,
} from "./services";
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	CONFIRM_LOGIN_SUCCESS,
	CONFIRM_LOGIN_FAILURE,
	CONFIRM_LOGIN_REQUEST,
	SET_LOGIN_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_FAILURE,
	LOGIN_USER_ROLE_REQUEST,
	LOGIN_USER_ROLE_SUCCESS,
	CLEAR_VERIFICATION_RESPONSE,
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

function* login({ payload: { credentials, history } }) {
	try {
		const response = yield call(loginUser, credentials);
		if (response.status === 200) {
			// const { token } = response.data.data;
			yield put({
				type: LOGIN_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: LOGIN_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: LOGIN_FAILURE,
			payload: {},
		});
	}
}

function* setLogin({ payload: { token, history } }) {
	try {
		localStorage.setItem("jwtToken", token);
		const user = jwt_decode(token);
		setAuthToken(token);
		yield put({
			type: CONFIRM_LOGIN_SUCCESS,
			payload: user,
		});
		const id = user.roles[0]._id;
		yield put({ type: LOGIN_USER_ROLE_REQUEST, payload: { id } });
		yield put({
			type: CLEAR_VERIFICATION_RESPONSE,
			payload: {},
		});
		history.push("/dashboard");
	} catch (err) {
		yield put({
			type: CONFIRM_LOGIN_FAILURE,
			payload: {},
		});
	}
}

function* confirmLogin({ payload: { history, ...data } }) {
	try {
		const response = yield call(confirmLoginUser, data);
		if (response.status === 200) {
			const { token } = response.data.data;
			localStorage.setItem("jwtToken", token);
			const user = jwt_decode(token);
			setAuthToken(token);
			yield put({
				type: CONFIRM_LOGIN_SUCCESS,
				payload: user,
			});
			const id = user.roles[0]._id;
			yield put({ type: LOGIN_USER_ROLE_REQUEST, payload: { id } });
			yield put({
				type: CLEAR_VERIFICATION_RESPONSE,
				payload: {},
			});
			history.push("/dashboard");
		} else {
			yield put({
				type: CONFIRM_LOGIN_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: CONFIRM_LOGIN_FAILURE,
			payload: {},
		});
	}
}

function* logout() {
	try {
		localStorage.removeItem("jwtToken");
		yield put({
			type: LOGOUT_SUCCESS,
			payload: {},
		});
	} catch (error) {
		yield put({
			type: LOGOUT_FAILURE,
			payload: error,
		});
	}
}

function* getLoginUserRole({ payload: { id } }) {
	try {
		const response = yield call(getUserRole, id);
		if (response.status === 200) {
			yield put({
				type: LOGIN_USER_ROLE_SUCCESS,
				payload: response.data.data,
			});
		} else {
			yield put({ type: LOGIN_USER_ROLE_SUCCESS, payload: {} });
		}
	} catch (err) {
		yield put({ type: LOGIN_USER_ROLE_SUCCESS, payload: {} });
	}
}

function* updateUserProfilePassword({ payload }) {
	try {
		const response = yield call(updateProfilePassword, payload);
		if (response.status === 200) {
			yield put({
				type: UPDATE_PROFILE_PASSWORD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: UPDATE_PROFILE_PASSWORD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({ type: UPDATE_PROFILE_PASSWORD_FAILURE, payload: {} });
	}
}

function* updateUserProfile({ payload }) {
	try {
		const response = yield call(updateProfile, payload);
		if (response.status === 200) {
			yield put({
				type: UPDATE_PROFILE_SUCCESS,
				payload: response.data,
			});
			localStorage.setItem("jwtToken", response.data.data.token);
			const user = jwt_decode(response.data.data.token);
			setAuthToken(response.data.data.token);
			yield put({
				type: CONFIRM_LOGIN_SUCCESS,
				payload: user,
			});
		} else {
			yield put({ type: UPDATE_PROFILE_FAILURE, payload: response.data });
		}
	} catch (err) {
		yield put({ type: UPDATE_PROFILE_FAILURE, payload: {} });
	}
}
function* resendVerificationCodeForLyoUser({ payload }) {
	try {
		const response = yield call(resendVerificationCode, payload);
		if (response.status === 200) {
			yield put({
				type: RESEND_VERIFICATION_CODE_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: RESEND_VERIFICATION_CODE_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: RESEND_VERIFICATION_CODE_FAILURE,
			payload: {},
		});
	}
}

function* userForgotPassword({ payload }) {
	try {
		const response = yield call(forgotPassword, payload);
		if (response.status === 200) {
			yield put({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: FORGOT_PASSWORD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: FORGOT_PASSWORD_FAILURE,
			payload: {},
		});
	}
}

function* userResetPassword({ payload }) {
	try {
		const response = yield call(resetPassword, payload);
		if (response.status === 200) {
			yield put({
				type: RESET_PASSWORD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: RESET_PASSWORD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: RESET_PASSWORD_FAILURE,
			payload: {},
		});
	}
}

function* authSaga() {
	yield takeEvery(LOGIN_REQUEST, login);
	yield takeEvery(CONFIRM_LOGIN_REQUEST, confirmLogin);
	yield takeEvery(SET_LOGIN_REQUEST, setLogin);
	yield takeEvery(LOGOUT_REQUEST, logout);
	yield takeEvery(LOGIN_USER_ROLE_REQUEST, getLoginUserRole);
	yield takeEvery(UPDATE_PROFILE_PASSWORD_REQUEST, updateUserProfilePassword);
	yield takeEvery(UPDATE_PROFILE_REQUEST, updateUserProfile);
	yield takeEvery(
		RESEND_VERIFICATION_CODE_REQUEST,
		resendVerificationCodeForLyoUser
	);
	yield takeEvery(FORGOT_PASSWORD_REQUEST, userForgotPassword);
	yield takeEvery(RESET_PASSWORD_REQUEST, userResetPassword);
}

export default authSaga;
