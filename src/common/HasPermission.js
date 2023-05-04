const hasPermission = (permission, userPermissions) => {
	const couldShow = userPermissions.some((item) => permission.includes(item));
	return couldShow ? true : false;
	// return true;
};
export default hasPermission;
