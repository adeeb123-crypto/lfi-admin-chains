import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	CREATE_LAUNCHPAD_OPTION_REQUEST,
	CREATE_LAUNCHPAD_OPTION_SUCCESS,
	CREATE_LAUNCHPAD_OPTION_FAILURE,
	UPDATE_LAUNCHPAD_OPTION_SUCCESS,
	UPDATE_LAUNCHPAD_OPTION_REQUEST,
	UPDATE_LAUNCHPAD_OPTION_FAILURE,
	REMOVE_LAUNCHPAD_OPTION_FAILURE,
	REMOVE_LAUNCHPAD_OPTION_SUCCESS,
	REMOVE_LAUNCHPAD_OPTION_REQUEST,
	TOGGLE_LAUNCHPAD_OPTION_SUCCESS,
	TOGGLE_LAUNCHPAD_OPTION_REQUEST,
	TOGGLE_LAUNCHPAD_OPTION_FAILURE,
} from "./actionTypes";

import { create, update, remove, toggle } from "./services";

function* createLaunchpadOption({ payload: { data } }) {
	try {
		const response = yield call(create, data);
		if (response.status === 200) {
			yield put({
				type: CREATE_LAUNCHPAD_OPTION_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: CREATE_LAUNCHPAD_OPTION_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: CREATE_LAUNCHPAD_OPTION_FAILURE,
			payload: response.data,
		});
	}
}

function* updateLaunchpadOption({ payload: { data } }) {
	try {
		const response = yield call(update, data, data._id);
		if (response.status === 200) {
			yield put({
				type: UPDATE_LAUNCHPAD_OPTION_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: UPDATE_LAUNCHPAD_OPTION_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: UPDATE_LAUNCHPAD_OPTION_FAILURE,
			payload: response.data,
		});
	}
}

function* toggleLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(toggle, id);
		if (response.status === 200) {
			yield put({
				type: TOGGLE_LAUNCHPAD_OPTION_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: TOGGLE_LAUNCHPAD_OPTION_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: TOGGLE_LAUNCHPAD_OPTION_FAILURE,
			payload: response.data,
		});
	}
}

function* removeLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(remove, id);
		if (response.status === 200) {
			yield put({
				type: REMOVE_LAUNCHPAD_OPTION_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: REMOVE_LAUNCHPAD_OPTION_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: REMOVE_LAUNCHPAD_OPTION_FAILURE,
			payload: response.data,
		});
	}
}

function* saga() {
	yield takeEvery(CREATE_LAUNCHPAD_OPTION_REQUEST, createLaunchpadOption);
	yield takeEvery(UPDATE_LAUNCHPAD_OPTION_REQUEST, updateLaunchpadOption);
	yield takeEvery(REMOVE_LAUNCHPAD_OPTION_REQUEST, removeLaunchpadOption);
	yield takeEvery(TOGGLE_LAUNCHPAD_OPTION_REQUEST, toggleLaunchpadOption);
}

export default saga;
