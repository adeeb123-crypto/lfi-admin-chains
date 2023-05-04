import axios from "axios";
import { apiUrl } from "../../config";

export const create = (data) =>
	axios
		.post(`${apiUrl}/admin/launchpad-option/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const update = (data, _id) =>
	axios
		.put(`${apiUrl}/admin/launchpad-option/update/${_id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const toggle = (id) =>
	axios
		.patch(`${apiUrl}/admin/launchpad-option/toggle-status/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const remove = (id) =>
	axios
		.delete(`${apiUrl}/admin/launchpad-option/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);
