import axios from "axios";
import { apiChainsUrl } from "../../config";

export const getAllChains = () =>
	axios
		.get(`${apiChainsUrl}/chains`,{
			headers: {
				'x-api-key': 'L1XSvO8uwGEDdif5CyANC9TZwUQQSTxi'
			  }	
		})	
	
		.then((response) => response)
		.catch((err) => err.response);
