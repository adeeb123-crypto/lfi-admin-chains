import {
	delay,
	call,
	put,
	takeEvery,
	cancelled,
	take,
	select,
} from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import {
	CREATE_LAUNCHPAD_REQUEST,
	CREATE_LAUNCHPAD_SUCCESS,
	CREATE_LAUNCHPAD_FAILURE,
	UPDATE_LAUNCHPAD_SUCCESS,
	UPDATE_LAUNCHPAD_REQUEST,
	UPDATE_LAUNCHPAD_FAILURE,
	REMOVE_LAUNCHPAD_FAILURE,
	REMOVE_LAUNCHPAD_SUCCESS,
	REMOVE_LAUNCHPAD_REQUEST,
	TOGGLE_LAUNCHPAD_SUCCESS,
	TOGGLE_LAUNCHPAD_REQUEST,
	TOGGLE_LAUNCHPAD_FAILURE,
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
	GET_NETWORK_INFO_REQUEST,
	GET_NETWORK_INFO_SUCCESS,
	GET_NETWORK_INFO_FAILURE,
	GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
	GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
	GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE,
	CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
	TOGGLE_SWAP_REQUEST,
	TOGGLE_SWAP_SUCCESS,
	TOGGLE_SWAP_FAILURE,
	UPDATE_STAGE_REQUEST,
	UPDATE_STAGE_SUCCESS,
	UPDATE_STAGE_FAILURE,
	TOGGLE_STAGE_SWAP_REQUEST,
	TOGGLE_STAGE_SWAP_SUCCESS,
	TOGGLE_STAGE_SWAP_FAILURE,
	DEPLOY_UPDATED_STAGE_REQUEST,
	DEPLOY_UPDATED_STAGE_SUCCESS,
	DEPLOY_UPDATED_STAGE_FAILURE,
	GET_UPDATED_LAUNCHPAD_REQUEST,
	GET_UPDATED_LAUNCHPAD_SUCCESS,
	GET_UPDATED_LAUNCHPAD_FAILURE,
	GET_LAUCHPAD_STAGES_REQUEST,
	GET_LAUCHPAD_STAGES_SUCCESS,
	GET_LAUCHPAD_STAGES_FAILURE,
} from "./actionTypes";

import {
	create,
	update,
	remove,
	toggle,
	getLaunchpadOptions,
	getLaunchpadService,
	getTokenDetails,
	getNetworkInfoService,
	deploy,
	getLaunchpadDeployHistoryService,
	toggleSwapService,
	updateStageService,
	toggleStageSwapService,
	deployUpdatedStageService,
	getLauchpadStagesService,
	getUpdatedLaunchpadService,
} from "./services";

function* getLaunchpadListOption({ payload }) {
	try {
		const response = yield call(getLaunchpadOptions);
		if (response.status === 200) {
			yield put({
				type: GET_LAUNCHPAD_OPTION_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_LAUNCHPAD_OPTION_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_LAUNCHPAD_OPTION_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* createLaunchpadOption({ payload: { data } }) {
	try {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key === "whitePaperFile") {
				formData.append(key, value);
			} else if (key === "teamInfoImages") {
				value.forEach((file) => {
					formData.append(file.name, file.image);
				});
			} else {
				formData.append(
					key,
					Array.isArray(value)
						? JSON.stringify(value)
						: typeof value === "object"
						? JSON.stringify(value)
						: value
				);
			}
		});
		const response = yield call(create, formData);
		if (response.status === 200) {
			yield put({
				type: CREATE_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: CREATE_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: CREATE_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* updateLaunchpadOption({ payload: { data } }) {
	try {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key === "whitePaperFile") {
				formData.append(key, value);
			} else if (key === "teamInfoImages") {
				value.forEach((file) => {
					formData.append(file.name, file.image);
				});
			} else {
				formData.append(
					key,
					Array.isArray(value)
						? JSON.stringify(value)
						: typeof value === "object"
						? JSON.stringify(value)
						: value
				);
			}
		});
		const response = yield call(update, formData, data._id);
		if (response.status === 200) {
			yield put({
				type: UPDATE_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: UPDATE_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: UPDATE_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* toggleLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(toggle, id);
		if (response.status === 200) {
			yield put({
				type: TOGGLE_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: TOGGLE_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: TOGGLE_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* removeLaunchpadOption({ payload: { id } }) {
	try {
		const response = yield call(remove, id);
		if (response.status === 200) {
			yield put({
				type: REMOVE_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: REMOVE_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: REMOVE_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* getAddressTokenDetails({ payload }) {
	try {
		const response = yield call(getTokenDetails, payload);
		if (response.status === 200) {
			yield put({
				type: GET_TOKEN_DETAILS_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_TOKEN_DETAILS_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_TOKEN_DETAILS_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* deployLaunchpad({ payload }) {
	try {
		// yield put({
		// 	type: CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
		// 	payload: payload,
		// });
		const response = yield call(deploy, payload);
		yield put({
			type: GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
			payload: payload,
		});
		yield delay(2000);
		if (response.status === 200) {
			yield put({
				type: DEPLOY_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: DEPLOY_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		// yield put({
		// 	type: GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
		// 	payload: payload,
		// });
		yield put({
			type: DEPLOY_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* getLaunchpads({ payload }) {
	try {
		const response = yield call(getLaunchpadService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_LAUNCHPAD_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* getNetworkInfo({ payload }) {
	try {
		const response = yield call(getNetworkInfoService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_NETWORK_INFO_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_NETWORK_INFO_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_NETWORK_INFO_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* getLaunchpadDeployHistory({ payload }) {
	try {
		const response = yield call(getLaunchpadDeployHistoryService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_LAUNCHPAD_DEPLOY_HISTORY_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function launchpadHistoryEvent(data) {
	return eventChannel((emitter) => {
		const iv = setInterval(() => {
			getLaunchpadDeployHistoryService(data)
				.then((response) => {
					emitter(response);
				})
				.catch((err) => {
					emitter(END);
				});
		}, 500);
		return () => {
			clearInterval(iv);
		};
	});
}

function* continueLaunchpadHistory({ payload }) {
	const event = yield call(launchpadHistoryEvent, payload);
	try {
		while (true) {
			let response = yield take(event);
			let launchpad = yield select((state) => state.launchpad);
			if (launchpad.response?.code) {
				yield delay(2000);
				event.close();
				yield put({
					type: GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
					payload: payload,
				});
			}
			if (response.status === 200) {
				yield put({
					type: GET_LAUNCHPAD_DEPLOY_HISTORY_SUCCESS,
					payload: response.data,
				});
			}
		}
	} finally {
		if (yield cancelled()) {
			event.close();
		}
	}
}

function* toggleSwap({ payload }) {
	try {
		const response = yield call(toggleSwapService, payload);
		if (response.status === 200) {
			yield put({
				type: TOGGLE_SWAP_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: TOGGLE_SWAP_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: TOGGLE_SWAP_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* updateStage({ payload }) {
	try {
		const response = yield call(updateStageService, payload);
		if (response.status === 200) {
			yield put({
				type: UPDATE_STAGE_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: UPDATE_STAGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: UPDATE_STAGE_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* toggleStageSwap({ payload }) {
	try {
		const response = yield call(toggleStageSwapService, payload);
		if (response.status === 200) {
			yield put({
				type: TOGGLE_STAGE_SWAP_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: TOGGLE_STAGE_SWAP_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: TOGGLE_STAGE_SWAP_FAILURE,
			payload: { msg: err?.message },
		});
	}
}

function* deployUpdatedStage({ payload }) {
	try {
		const response = yield call(deployUpdatedStageService, payload);
		if (response.status === 200) {
			yield put({
				type: DEPLOY_UPDATED_STAGE_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: DEPLOY_UPDATED_STAGE_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: DEPLOY_UPDATED_STAGE_FAILURE,
			payload: {},
		});
	}
}

function* getUpdatedLaunchpad({ payload }) {
	try {
		const response = yield call(getUpdatedLaunchpadService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_UPDATED_LAUNCHPAD_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_UPDATED_LAUNCHPAD_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_UPDATED_LAUNCHPAD_FAILURE,
			payload: {},
		});
	}
}

function* getLauchpadStages({ payload }) {
	try {
		const response = yield call(getLauchpadStagesService, payload);
		if (response.status === 200) {
			yield put({
				type: GET_LAUCHPAD_STAGES_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_LAUCHPAD_STAGES_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_LAUCHPAD_STAGES_FAILURE,
			payload: {},
		});
	}
}

function* saga() {
	yield takeEvery(GET_LAUNCHPAD_OPTION_REQUEST, getLaunchpadListOption);
	yield takeEvery(CREATE_LAUNCHPAD_REQUEST, createLaunchpadOption);
	yield takeEvery(UPDATE_LAUNCHPAD_REQUEST, updateLaunchpadOption);
	yield takeEvery(REMOVE_LAUNCHPAD_REQUEST, removeLaunchpadOption);
	yield takeEvery(TOGGLE_LAUNCHPAD_REQUEST, toggleLaunchpadOption);
	yield takeEvery(GET_TOKEN_DETAILS_REQUEST, getAddressTokenDetails);
	yield takeEvery(DEPLOY_LAUNCHPAD_REQUEST, deployLaunchpad);
	yield takeEvery(GET_LAUNCHPAD_REQUEST, getLaunchpads);
	yield takeEvery(GET_NETWORK_INFO_REQUEST, getNetworkInfo);
	yield takeEvery(
		GET_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
		getLaunchpadDeployHistory
	);
	yield takeEvery(
		CONTINUE_LAUNCHPAD_DEPLOY_HISTORY_REQUEST,
		continueLaunchpadHistory
	);
	yield takeEvery(TOGGLE_SWAP_REQUEST, toggleSwap);
	yield takeEvery(UPDATE_STAGE_REQUEST, updateStage);
	yield takeEvery(TOGGLE_STAGE_SWAP_REQUEST, toggleStageSwap);
	yield takeEvery(DEPLOY_UPDATED_STAGE_REQUEST, deployUpdatedStage);
	yield takeEvery(GET_UPDATED_LAUNCHPAD_REQUEST, getUpdatedLaunchpad);
	yield takeEvery(GET_LAUCHPAD_STAGES_REQUEST, getLauchpadStages);
}

export default saga;
