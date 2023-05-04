import axios from "axios";
import { apiUrl } from "../../config";

export const create = (data) =>
	axios
		.post(`${apiUrl}/admin/user-admin/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const update = (data) =>
	axios
		.put(`${apiUrl}/admin/user-admin/update/${data._id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const remove = (id) =>
	axios
		.delete(`${apiUrl}/admin/user-admin/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const createPermission = (data) =>
	axios
		.post(`${apiUrl}/admin/role-permission/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const updatePermission = (data) =>
	axios
		.put(`${apiUrl}/admin/role-permission/update/${data._id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const togglePermission = (id) =>
	axios
		.patch(`${apiUrl}/admin/role-permission/toggle-status/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const removePermission = (id) =>
	axios
		.delete(`${apiUrl}/admin/role-permission/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const createRole = (data) =>
	axios
		.post(`${apiUrl}/admin/role/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const updateRole = (data) =>
	axios
		.put(`${apiUrl}/admin/role/update/${data._id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const removeRole = (id) =>
	axios
		.delete(`${apiUrl}/admin/role/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const toggleRole = (id) =>
	axios
		.patch(`${apiUrl}/admin/role/toggle-status/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const getPermissions = () =>
	axios
		.get(`${apiUrl}/admin/role-permission`)
		.then((response) => response)
		.catch((err) => err.response);

export const getRoles = () =>
	axios.get(`${apiUrl}/admin/role`).then((response) => response);
