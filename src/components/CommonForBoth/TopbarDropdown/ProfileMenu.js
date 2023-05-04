import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

const ProfileMenu = (props) => {
	// Declare a new state variable, which we'll call "menu"
	const [menu, setMenu] = useState(false);

	return (
		<React.Fragment>
			<Dropdown
				isOpen={menu}
				toggle={() => setMenu(!menu)}
				className="d-inline-block"
			>
				<DropdownToggle
					className="btn header-item bg-soft-light border-start border-end"
					id="page-header-user-dropdown"
					tag="button"
				>
					<Avatar
						className=""
						color={"#74788d"}
						name={props.auth.user?.name}
						round={true}
						size={35}
					/>
					<span className="d-none d-xl-inline-block ms-2 me-1">
						{props.auth.user?.name}
					</span>
					<i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
				</DropdownToggle>
				<DropdownMenu className="dropdown-menu-end">
					<DropdownItem tag="a" href="/profile">
						{" "}
						<i className="bx bx-user font-size-16 align-middle me-1" />
						{props.t("Profile")}{" "}
					</DropdownItem>
					<div className="dropdown-divider" />
					<Link to="/logout" className="dropdown-item">
						<i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
						<span>{props.t("Logout")}</span>
					</Link>
				</DropdownMenu>
			</Dropdown>
		</React.Fragment>
	);
};

ProfileMenu.propTypes = {
	auth: PropTypes.any,
	t: PropTypes.any,
};

const mapStatetoProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStatetoProps, {})(withTranslation()(ProfileMenu));
