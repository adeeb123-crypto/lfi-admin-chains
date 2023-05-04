import axios from "axios";
import { apiBridgeUrl } from "../../config";

export const getAllTransactions = () =>
	axios
		.get(`${apiBridgeUrl}/transactions`,{
			headers: {
				'x-api-key': 'L1XSvO8uwGEDdif5CyANC9TZwUQQSTxi'
			  }	
		})	
	
		.then((response) => response)
		.catch((err) => err.response);


