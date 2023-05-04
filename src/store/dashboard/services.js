import axios from "axios";
import { apiUrl } from "../../config";

export const getTotalLaunchpadService = (data) =>
	axios
		.get(`${apiUrl}/admin/dashboard/get-total-launchpad`, {
			params: data,
		})
		.then((response) => response)
		.catch((err) => err.response);
