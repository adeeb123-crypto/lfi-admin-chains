import {	
	GET_ALL_CHAINS_DETAILS,
	
} from "./actionTypes";


export const getAllChains = (payload) => {
	return {
		type: GET_ALL_CHAINS_DETAILS,
		payload,
	};
};

