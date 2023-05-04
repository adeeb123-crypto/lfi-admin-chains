import {	
	GET_ALL_TRANSACTIONS_REQUEST,
	
} from "./actionTypes";


export const getAllTransactions = (payload) => {
	return {
		type: GET_ALL_TRANSACTIONS_REQUEST,
		payload,
	};
};

