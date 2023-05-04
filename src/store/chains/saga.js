import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_CHAINS_DETAILS,
  GET_ALL_CHAINS_SUCCESS,
  GET_ALL_CHAINS_FAILURE,
} from "./actionTypes";

import { getAllChains } from "./services";

function* getAllChainsList() {
  try {
    let response = yield call(getAllChains);

    if (response.status === 200) {
      yield put({
        type: GET_ALL_CHAINS_SUCCESS,
        payload: response.data,

    });

    } else {
      yield put({
        type: GET_ALL_CHAINS_FAILURE,
        payload: response.data,

    });

    }

} catch (err) {
    yield put({
      type: GET_ALL_CHAINS_FAILURE,
      payload: response.data,

    });

}

}

function* saga() {	
	yield takeEvery(GET_ALL_CHAINS_DETAILS, getAllChainsList);	
}

export default saga;

