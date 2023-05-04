import React from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container, Card, CardBody, Col, Row } from "reactstrap";
import moment from "moment";
import LaunchpadPieChart from "./LaunchpadPieChart";
import Transaction from "./Transaction";

const Dashboard = () => {
	document.title = "Admin Dashboard | LFinance";

	const formatValue = (val, formatter = 2) => {
		return isNaN(parseFloat(val))
			? 0.0
			: parseFloat(val).toFixed(formatter);
	};

	const getStringToDateRange = (filters) => {
		let { time } = filters;
		const timeValue = [];
		if (time) {
			const key = time.last.includes("years") ? "years" : time.last;
			const value = time[key];
			if (key === "years") {
				timeValue[0] = moment(value, "YYYY").toDate().toString();
				timeValue[1] = moment(value, "YYYY")
					.endOf("year")
					.toDate()
					.toString();
			} else if (key === "months") {
				timeValue[0] = moment().subtract(value, "months").toDate();
				timeValue[1] = moment().toDate();
			} else if (key === "hours") {
				timeValue[0] = moment().subtract(value, "hours").toDate();
				timeValue[1] = moment().toDate();
			}
		}

		return timeValue;
	};

	const getTotalYear = () => {
		const numberofYear = [];
		const currentYear = new Date().getFullYear();
		for (let i = 2019; i <= parseInt(currentYear); i++) {
			numberofYear.push(i);
		}
		return numberofYear;
	};

	const setDateFilter = (filters) => {
		const { time, ...rest } = filters;
		if (filters.date?.[0]) return rest;
		let newTimeValue = getStringToDateRange(filters);
		filters = { ...rest, date: newTimeValue };
		return filters;
	};

	const toggleResetFilter = (filters, set) => {
		if (set === "date") {
			return {
				...filters,
				time: {
					years: "",
					months: "",
					days: "",
					hours: "",
					last: "",
				},
			};
		}
		return { ...filters, date: [null, null] };
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
					<Row>
						<LaunchpadPieChart />
					</Row>
					<Row>
						<Transaction />
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
