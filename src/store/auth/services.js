import axios from "axios";
import { apiUrl } from "../../config";

export const loginUser = (credentials) =>
	axios
		.post(`${apiUrl}/admin/auth/login`, credentials)
		.then((response) => response)
		.catch((err) => err.response);

export const confirmLoginUser = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/confirm-login`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const updateProfilePassword = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/change-password`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const updateProfile = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/update-profile`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const resendVerificationCode = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/lyo-send-again-verification`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const getLoginUserRole = (id) =>
	axios
		.get(`${apiUrl}/admin/role/get-single/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const forgotPassword = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/forgot-password`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const resetPassword = (data) =>
	axios
		.post(`${apiUrl}/admin/auth/reset-password`, data)
		.then((response) => response)
		.catch((err) => err.response);
