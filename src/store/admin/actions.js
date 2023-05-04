import {
	ERRORS,
	CLEAR_RESPONSE,
	CREATE_ADMIN_REQUEST,
	UPDATE_ADMIN_REQUEST,
	REMOVE_ADMIN_REQUEST,
	CREATE_ROLE_REQUEST,
	UPDATE_ROLE_REQUEST,
	TOGGLE_ROLE_REQUEST,
	REMOVE_ROLE_REQUEST,
	CREATE_PERMISSION_REQUEST,
	UPDATE_PERMISSION_REQUEST,
	REMOVE_PERMISSION_REQUEST,
	TOGGLE_PERMISSION_REQUEST,
	PERMISSION_REQUEST,
	ROLE_REQUEST,
} from "./actionTypes";

export const clearResponse = () => {
	return {
		type: CLEAR_RESPONSE,
		payload: {},
	};
};

export const create = (data) => {
	return {
		type: CREATE_ADMIN_REQUEST,
		payload: { data },
	};
};

export const update = (data) => {
	return {
		type: UPDATE_ADMIN_REQUEST,
		payload: { data },
	};
};

export const remove = (id) => {
	return {
		type: REMOVE_ADMIN_REQUEST,
		payload: { id },
	};
};

export const getRoles = () => {
	return {
		type: ROLE_REQUEST,
		payload: {},
	};
};

export const createRole = (data) => {
	return {
		type: CREATE_ROLE_REQUEST,
		payload: { data },
	};
};

export const updateRole = (data) => {
	return {
		type: UPDATE_ROLE_REQUEST,
		payload: { data },
	};
};

export const removeRole = (id) => {
	return {
		type: REMOVE_ROLE_REQUEST,
		payload: { id },
	};
};

export const toggleRole = (id) => {
	return {
		type: TOGGLE_ROLE_REQUEST,
		payload: { id },
	};
};

export const getPermissions = () => {
	return {
		type: PERMISSION_REQUEST,
		payload: {},
	};
};

export const createPermission = (data) => {
	return {
		type: CREATE_PERMISSION_REQUEST,
		payload: { data },
	};
};

export const updatePermission = (data) => {
	return {
		type: UPDATE_PERMISSION_REQUEST,
		payload: { data },
	};
};

export const togglePermission = (id) => {
	return {
		type: TOGGLE_PERMISSION_REQUEST,
		payload: { id },
	};
};

export const removePermission = (id) => {
	return {
		type: REMOVE_PERMISSION_REQUEST,
		payload: { id },
	};
};
