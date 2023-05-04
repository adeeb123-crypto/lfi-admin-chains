import axios from "axios";
import { apiUrl } from "../../config";

export const create = (data) =>
	axios
		.post(`${apiUrl}/admin/launchpad/create`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const getLaunchpadOptions = () =>
	axios
		.get(`${apiUrl}/admin/launchpad-option`)
		.then((response) => response)
		.catch((err) => err.response);

export const update = (data, _id) =>
	axios
		.put(`${apiUrl}/admin/launchpad/update/${_id}`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const toggle = (id) =>
	axios
		.get(`${apiUrl}/admin/launchpad/toggle-status/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const remove = (id) =>
	axios
		.delete(`${apiUrl}/admin/launchpad/delete/${id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const getTokenDetails = (data) =>
	axios
		.post(`${apiUrl}/admin/launchpad/get-token-details`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const deploy = (data) =>
	axios
		.post(`${apiUrl}/admin/launchpad/deploy`, data)
		.then((response) => response)
		.catch((err) => err.response);

export const getLaunchpadService = () =>
	axios
		.get(`${apiUrl}/admin/launchpad/get-all`)
		.then((response) => response)
		.catch((err) => err.response);

export const getNetworkInfoService = () =>
	axios
		.get(`${apiUrl}/admin/network-info/`)
		.then((response) => response)
		.catch((err) => err.response);

export const getLaunchpadDeployHistoryService = (data) =>
	axios
		.get(`${apiUrl}/admin/launchpad/deploy-history/${data._id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const toggleSwapService = (data) =>
	axios
		.get(`${apiUrl}/admin/launchpad/toggle-swap/${data._id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const updateStageService = (data) =>
	axios
		.put(
			`${apiUrl}/admin/launchpad/stage/${data._id}/${data.stageNumber}`,
			data
		)
		.then((response) => response)
		.catch((err) => err.response);

export const deployUpdatedStageService = (data) =>
	axios
		.put(
			`${apiUrl}/admin/launchpad/deploy/stage/${data._id}/${data.stageNumber}`,
			data
		)
		.then((response) => response)
		.catch((err) => err.response);

export const toggleStageSwapService = (data) =>
	axios
		.get(
			`${apiUrl}/admin/launchpad/toggle-swap-stage/${data._id}/${data.stageNumber}`
		)
		.then((response) => response)
		.catch((err) => err.response);

export const getUpdatedLaunchpadService = (data) =>
	axios
		.get(`${apiUrl}/admin/launchpad/details/${data._id}`)
		.then((response) => response)
		.catch((err) => err.response);

export const getLauchpadStagesService = (data) =>
	axios
		.get(`${apiUrl}/admin/launchpad/stages/${data._id}`)
		.then((response) => response)
		.catch((err) => err.response);
