import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useMemo,
} from "react";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Helmet } from "react-helmet";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import classnames from "classnames";
//redux
import { useSelector, useDispatch } from "react-redux";
import HasAnyPermission from "../../common/Permission";
import ReactDataTable from "../../common/ReactDataTable";
import { currencyList } from "../../common/currencyList";
import { apiUrl } from "../../config";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import "../../assets/scss/launchpad.scss";
import { Grid, Switch } from "@mui/material";
import Launchpad from "../Launchpad";
import {
	getLaunchpads,
	clearTokenResponse,
	clearNotification,
} from "../../store/launchpad/actions";

const Transaction = (props) => {
	// const dispatch = useDispatch();
	const refreshTableData = useRef(null);

	// useEffect(() => {
	// 	dispatch(getLaunchpads());
	// }, []);

	// const { launchpad } = useSelector((state) => ({
	// 	launchpad: state.launchpad,
	// }));
	// const { launchpads } = launchpad;

	const columns = () => [
		{
			label: "Token Name",
			name: "action",
			options: {
				customBodyRender: (action) => {
					return action?.launchPad?.tokenName;
				},
				customFilterListOptions: {
					render: (v) => {
						if (v?.[1]) return `${v[1]}`;
						else if (v?.[0]) return `${v[0]}`;
						return [];
					},
					update: (filterList, filterPos, index) => {
						filterList[index] = [];
						return filterList;
					},
				},
				filterType: "custom",
				filterOptions: {
					names: [],
					display: (filterList, onChange, index, column) => {
						const optionValues = launchpads;
						return (
							<div className="auto">
								{/* <label
									htmlFor="currency-transaction"
									className="form-label font-size-13 text-muted"
								></label> */}
								<select
									value={filterList[index][0] || ""}
									onChange={(event) => {
										const name =
											event.target[
												event.target.selectedIndex
											]?.getAttribute("data-name");
										filterList[index][0] =
											event.target.value;
										filterList[index][1] = name;
										onChange(
											filterList[index],
											index,
											column
										);
									}}
									className="form-control"
									name="currency-transaction"
								>
									<option disabled value="">
										Launchpad
									</option>
									{optionValues.map((item) => (
										<option
											data-name={`${item.tokenName} (${item.tokenSymbol})`}
											key={item._id}
											value={item._id}
										>
											{`${item.tokenName} (${item.tokenSymbol})`}
										</option>
									))}
								</select>
							</div>
						);
					},
				},
				sort: false,
			},
		},
		{
			label: "Token Symbol",
			name: "action",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (action) => {
					return action?.launchPad?.tokenSymbol;
				},
			},
		},
		{
			label: "Amount",
			name: "price",
			options: {
				customFilterListOptions: {
					render: (v) => {
						if (v?.[0] || v?.[1])
							return `From Amount :  ${
								v[0] ?? ""
							} - To Amount : ${v[1] ?? ""}`;
						return [];
					},
					update: (filterList, filterPos, index) => {
						filterList[index] = [];
						return filterList;
					},
				},
				filterType: "custom",
				filterOptions: {
					names: [],
					display: (filterList, onChange, index, column) => {
						return (
							<div className="auto">
								{/* <label
									htmlFor="currency-transaction"
									className="form-label font-size-13 text-muted"
								></label> */}
								<div className="input-group">
									<label className="input-group-text">
										Min Amount{" "}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder=""
										value={filterList[index][0] || ""}
										onChange={(event) => {
											filterList[index][0] =
												event.target.value =
													event.target.value.match(
														/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
													)
														? event.target.value
														: filterList[
																index
														  ][0] || "";
											onChange(
												filterList[index],
												index,
												column
											);
										}}
									/>
									<label className="input-group-text">
										Max Amount
									</label>
									<input
										type="text"
										className="form-control"
										placeholder=""
										value={filterList[index][1] || ""}
										onChange={(event) => {
											filterList[index][1] =
												event.target.value =
													event.target.value.match(
														/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
													)
														? event.target.value
														: filterList[
																index
														  ][1] || "";
											onChange(
												filterList[index],
												index,
												column
											);
										}}
									/>
								</div>
							</div>
						);
					},
				},
				sort: false,
			},
		},

		{
			label: "Currency",
			name: "currency",
			options: {
				// customFilterListOptions: {
				//     render: v => v.map(l => this.getCountryName(l)),
				// },
				filterType: "custom",
				filterOptions: {
					names: [],
					display: (filterList, onChange, index, column) => {
						const optionValues = currencyList;
						return (
							<div className="auto">
								{/* <label
									htmlFor="currency-transaction"
									className="form-label font-size-13 text-muted"
								></label> */}
								<select
									value={filterList[index][0] || ""}
									onChange={(event) => {
										filterList[index][0] =
											event.target.value;
										onChange(
											filterList[index],
											index,
											column
										);
									}}
									className="form-control"
									name="currency-transaction"
								>
									<option disabled value="">
										Currency
									</option>
									{optionValues.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
						);
					},
				},
				sort: false,
			},
		},
		{
			label: "Currency Amount",
			name: "amount",
			options: {
				customFilterListOptions: {
					render: (v) => {
						if (v?.[0] || v?.[1])
							return `From Currency Amount :  ${
								v[0] ?? ""
							} - To Currency Amount : ${v[1] ?? ""}`;
						return [];
					},
					update: (filterList, filterPos, index) => {
						filterList[index] = [];
						return filterList;
					},
				},
				filterType: "custom",
				filterOptions: {
					names: [],
					display: (filterList, onChange, index, column) => {
						return (
							<div className="auto">
								{/* <label
									htmlFor="currency-transaction"
									className="form-label font-size-13 text-muted"
								></label> */}
								<div className="input-group">
									<label className="input-group-text">
										Min Currency Amount{" "}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder=""
										value={filterList[index][0] || ""}
										onChange={(event) => {
											event.target.value =
												event.target.value.match(
													/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
												)
													? event.target.value
													: filterList[index][0] ||
													  "";

											filterList[index][0] =
												event.target.value;
											onChange(
												filterList[index],
												index,
												column
											);
										}}
									/>
									<label className="input-group-text">
										Max Currency Amount
									</label>
									<input
										type="text"
										className="form-control"
										placeholder=""
										value={filterList[index][1] || ""}
										onChange={(event) => {
											event.target.value =
												event.target.value.match(
													/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
												)
													? event.target.value
													: filterList[index][1] ||
													  "";
											filterList[index][1] =
												event.target.value;
											onChange(
												filterList[index],
												index,
												column
											);
										}}
									/>
								</div>
							</div>
						);
					},
				},
				sort: false,
			},
		},

		{
			label: "Transaction ID",
			name: "transactionID",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			label: "Wallet ID",
			name: "walletID",
			options: {
				filter: false,
				sort: false,
			},
		},

		{
			label: "Date",
			name: "createdAt",
			options: {
				customBodyRender: (date) => {
					return moment(date).format("LLL");
				},
				filterType: "custom",
				customFilterListOptions: {
					render: (v) => {
						if (v?.[0])
							return `From Date : ${moment(v[0]).format(
								"MM/DD/YYYY"
							)} - To Date : ${moment(v[1]).format(
								"MM/DD/YYYY"
							)}`;
						return [];
					},
					update: (filterList, filterPos, index) => {
						filterList[index] = [];
						return filterList;
					},
				},
				filterOptions: {
					display: (filterList, onChange, index, column) => {
						return (
							<div className="auto">
								{/* <label
									htmlFor="currency-transaction"
									className="form-label font-size-13 text-muted"
								></label> */}
								<div className="input-group">
									<Flatpickr
										className="form-control d-block"
										placeholder="Date Range"
										options={{
											mode: "range",
											dateFormat: "m/d/Y",
										}}
										value={
											filterList[index] || [
												new Date(),
												new Date(),
											]
										}
										onChange={(date) => {
											filterList[index] = date;
											onChange(
												filterList[index],
												index,
												column
											);
										}}
									/>
								</div>
							</div>
						);
					},
				},
				sort: true,
			},
		},
	];

	const resultFormatter = (result) => {
		return result.docs.map((item) => {
			return {
				...item,
				active: item,
				action: item,
			};
		});
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Helmet>
					<title>Transaction | LFinance</title>
				</Helmet>
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs
						title="Transaction"
						breadcrumbItem="Transaction"
					/>
					<Card>
						<CardBody>
							<Row>
								<Col xl="12">
									<div className="table-rep-plugin">
										<div className="table-responsive">
											<HasAnyPermission
												permission={["launchpad list"]}
											>
												<ReactDataTable
													url={`${apiUrl}/admin/transaction/pagination`}
													columns={columns()}
													resultFormatter={
														resultFormatter
													}
													setRefresh={
														refreshTableData
													}
													// disableFilterIcon={
													// 	true
													// }
													// disableSearchIcon={
													// 	true
													// }
													origin={
														<div className="row">
															<div className="col-auto h4">
																Transaction
																&nbsp;
																<button
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		refreshTableData?.current();
																	}}
																	type="button"
																	className="btn m-1 btn-info waves-effect waves-light"
																>
																	REFRESH
																</button>
															</div>
														</div>
													}
													rowsPerPage={10}
												/>
											</HasAnyPermission>
										</div>
									</div>
								</Col>
							</Row>
						</CardBody>
					</Card>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Transaction;
