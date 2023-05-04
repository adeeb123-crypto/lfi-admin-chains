import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	CREATE_NETWORK_INFO_REQUEST,
	CREATE_NETWORK_INFO_SUCCESS,
	CREATE_NETWORK_INFO_FAILURE,
	UPDATE_NETWORK_INFO_SUCCESS,
	UPDATE_NETWORK_INFO_REQUEST,
	UPDATE_NETWORK_INFO_FAILURE,
	REMOVE_NETWORK_INFO_FAILURE,
	REMOVE_NETWORK_INFO_SUCCESS,
	REMOVE_NETWORK_INFO_REQUEST,
	TOGGLE_NETWORK_INFO_SUCCESS,
	TOGGLE_NETWORK_INFO_REQUEST,
	TOGGLE_NETWORK_INFO_FAILURE,
} from "./actionTypes";

import { create, update, remove, toggle } from "./services";

function* createLaunchpadOption({ payload: { data } }) {
	try {
		const response = yield call(create, data);
		if (response.status === 200) {
			yield put({
				type: CREATE_NETWORK_INFO_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: CREATE_NETWORK_INFO_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: CREATE_NETWORK_INFO_FAILURE,
			payload: response.data,
		});
	}
}

function* updateLaunchpadOption({ payload: { data } }) {
	try {
		const response = yield call(update, data, data._id);
		if (response.status === 200) {
			yield put({
				type: UPDATE_NETWORK_INFO_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: UPDATE_NETWORK_INFO_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: UPDATE_NETWORK_INFO_FAILURE,
			payload: response.data,
		});
	}
}

function* toggleLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(toggle, id);
		if (response.status === 200) {
			yield put({
				type: TOGGLE_NETWORK_INFO_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: TOGGLE_NETWORK_INFO_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: TOGGLE_NETWORK_INFO_FAILURE,
			payload: response.data,
		});
	}
}

function* removeLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(remove, id);
		if (response.status === 200) {
			yield put({
				type: REMOVE_NETWORK_INFO_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: REMOVE_NETWORK_INFO_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: REMOVE_NETWORK_INFO_FAILURE,
			payload: response.data,
		});
	}
}

function* saga() {
	yield takeEvery(CREATE_NETWORK_INFO_REQUEST, createLaunchpadOption);
	yield takeEvery(UPDATE_NETWORK_INFO_REQUEST, updateLaunchpadOption);
	yield takeEvery(REMOVE_NETWORK_INFO_REQUEST, removeLaunchpadOption);
	yield takeEvery(TOGGLE_NETWORK_INFO_REQUEST, toggleLaunchpadOption);
}

export default saga;
