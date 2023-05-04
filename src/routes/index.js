import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard/index";
import Admin from "../pages/Admin";
import Role from "../pages/Admin/Role";
import userProfile from "../pages/Authentication/user-profile";
// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import LaunchpadOption from "../pages/LaunchpadOption";
import Launchpad from "../pages/Launchpad";
import NetworkInfo from "../pages/NetworkInfo";
import Transaction from "../pages/Transaction/Transaction";
import Bridge from "../pages/Bridge";
import Chains from "../pages/Chains"

const userRoutes = [
	//dashboard
	{ path: "/dashboard", component: Dashboard },
	//profile
	{
		path: "/profile",
		component: userProfile,
	},
	{
		path: "/admins",
		exact: true,
		component: Admin,
		permission: ["admin add", "admin list"],
	},
	{
		path: "/roles",
		exact: true,
		component: Role,
		permission: ["role add", "role list"],
	},

	{
		path: "/launchpad-option",
		exact: true,
		component: LaunchpadOption,
		permission: ["launchpad option add", "launchpad option list"],
	},
	{
		path: "/network-info",
		exact: true,
		component: NetworkInfo,
		permission: ["launchpad option add", "launchpad option list"],
	},
	{
		path: "/launchpad",
		exact: true,
		component: Launchpad,
		permission: ["launchpad option add", "launchpad option list"],
	},
	{
		path: "/transaction",
		exact: true,
		component: Transaction,
		permission: ["launchpad option add", "launchpad option list"],
	},
	{
		path: "/bridge",
		exact: true,
		component: Bridge,
		// permission: ["launchpad option add", "launchpad option list"],
	},
	{
		path: "/chains",
		exact: true,
		component: Chains,
		// permission: ["launchpad option add", "launchpad option list"],
	},
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
	//authencation page
	{ path: "/logout", exact: true, component: Logout },
	{ path: "/login", exact: true, component: Login },
	{
		path: "/forgot-password/:token/:tokenKey",
		exact: true,
		component: ForgotPassword,
	},
	{ path: "/forgot-password", exact: true, component: ForgotPassword },
];

export { userRoutes, authRoutes };
