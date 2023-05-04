import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { logout as logOutUser } from "../../store/auth/actions";
//redux
import { useDispatch } from "react-redux";

const Logout = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logOutUser());
		props.history.push("/login");
	}, [dispatch, props.history]);
	return <></>;
};

Logout.propTypes = {
	history: PropTypes.object,
};

export default Logout;
