import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	GET_ALL_TRANSACTIONS_SUCCESS,
	GET_ALL_TRANSACTIONS_FAILURE,
	GET_ALL_TRANSACTIONS_REQUEST
} from "./actionTypes";

import { getAllTransactions } from "./services";

function* getAllTransactionsList() {
	
	try {
		let response = yield call(getAllTransactions);
		
		// console.log("🚀 ~ file: saga.js:14 ~ function*getAllTransactionsList ~ response:", response)
		
		
		if (response.status === 200) {
			yield put({
				type: GET_ALL_TRANSACTIONS_SUCCESS,
				payload: response.data,
			});
		} else {
			yield put({
				type: GET_ALL_TRANSACTIONS_FAILURE,
				payload: response.data,
			});
		}
	} catch (err) {
		yield put({
			type: GET_ALL_TRANSACTIONS_FAILURE,
			payload: response.data,
		});
	}
}



function* saga() {	
	yield takeEvery(GET_ALL_TRANSACTIONS_REQUEST, getAllTransactionsList);	
}

export default saga;
