import axios from "axios";
import { apiUrl } from "../../config";

export const create = (data) =>
	axios
		.post(`${apiUrl}/admin/network-info/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const update = (data, _id) =>
	axios
		.put(`${apiUrl}/admin/network-info/update/${_id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const toggle = (id) =>
	axios
		.patch(`${apiUrl}/admin/network-info/toggle-status/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const remove = (id) =>
	axios
		.delete(`${apiUrl}/admin/network-info/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);
