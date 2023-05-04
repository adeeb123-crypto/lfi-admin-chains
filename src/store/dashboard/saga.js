import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	GET_TOTAL_LAUNCHPAD_REQUEST,
	GET_TOTAL_LAUNCHPAD_SUCCESS,
	GET_TOTAL_LAUNCHPAD_FAILURE,
} from "./actionTypes";

import { getTotalLaunchpadService } from "./services";

function* getTotalLaunchpad({ payload }) {
	try {
		const response = yield call(getTotalLaunchpadService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_TOTAL_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_TOTAL_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_TOTAL_LAUNCHPAD_FAILURE,
			payload: {},
		});
	}
}

function* saga() {
	yield takeEvery(GET_TOTAL_LAUNCHPAD_REQUEST, getTotalLaunchpad);
}

export default saga;
