import React, { useEffect, useState, useRef, useMemo } from "react";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Helmet } from "react-helmet";
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
	Form,
	Label,
	Input,
	CardTitle,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HasAnyPermission from "../../common/Permission";
import hasPermission from "../../common/HasPermission";
import ReactDataTable from "../../common/ReactDataTable";
import isEmpty from "../../utils/isEmpty";
import { apiUrl } from "../../config";
import {
	create,
	update,
	remove,
	toggle,
	clearResponse,
} from "../../store/launchpadOption/actions";
import Swal from "sweetalert2";

const LaunchpadOption = (props) => {
	const dispatch = useDispatch();
	const refreshTableData = useRef(null);
	const { response, auth } = useSelector((state) => ({
		response: state.launchpadOption.response,
		auth: state.auth,
	}));

	const [isOpenAddEditModal, toggleAddEditModal] = useState(false);
	const [details, handleformData] = useState({
		name: "",
		type: "",
		active: "",
		data: [],
	});

	useEffect(() => {
		if (response && response.code === "200") {
			refreshTableData.current();
			if (isOpenAddEditModal) toggleAddEditModal(!isOpenAddEditModal);
			toast.success(response.msg, {
				onOpen: () => {
					dispatch(clearResponse());
				},
			});
		} else if (response && response?.msg) {
			refreshTableData.current();
			toast.error(response.msg, {
				onOpen: () => {
					dispatch(clearResponse());
				},
			});
		}
	}, [dispatch, response]);

	const removeItem = (id) => {
		if (!isEmpty(id)) {
			Swal.fire({
				title: "Are you sure?",
				text: "Do you really want to delete?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Confirm",
			}).then((result) => {
				if (result.value) {
					dispatch(remove(id));
				}
			});
		}
	};

	const toggleItem = (id) => {
		if (!isEmpty(id)) {
			dispatch(toggle(id));
		}
	};

	let validationSchema = {
		name: Yup.string().required("Please enter name."),
	};

	const useFormikOptions = {
		enableReinitialize: true,
		initialValues: {
			name: details && details.name ? details.name : "",
		},
		validationSchema: Yup.object(validationSchema),
		onSubmit: (values) => {
			if (details._id) {
				dispatch(update(details));
			} else {
				dispatch(create(values));
			}
		},
	};

	const validation = useFormik(useFormikOptions);

	const handleAddEditModal = (data = null) => {
		if (!isEmpty(data) && data?._id) {
			handleformData(data);
		} else {
			handleformData({
				name: "",
				active: true,
			});
			validation.resetForm();
		}
		toggleAddEditModal(!isOpenAddEditModal);
	};

	const handleChange = (e) => {
		details[e.target.name] = e.target.value;
		handleformData(details);
	};

	const handleChangeData = (name, index) => (e) => {
		let detailData = [...details.data];
		detailData[index][name] = e.target.value;
		handleformData({
			...details,
			data: detailData,
		});
	};

	const addCurrency = (e) => {
		e.preventDefault();
		handleformData({
			...details,
			data: [
				...details.data,
				{
					name: "",
					feeOption: [{ fee: "", description: "" }],
					active: true,
				},
			],
		});
	};

	const handleChangeFeeData = (name, index, feeOptionIndex) => (e) => {
		if (name === "fee") {
			details.data[index]["feeOption"][feeOptionIndex]["fee"] =
				e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)
					? e.target.value
					: details.data[index]["feeOption"][feeOptionIndex]["fee"];
		} else if (name === "description") {
			details.data[index]["feeOption"][feeOptionIndex]["description"] =
				e.target.value;
		}
		handleformData({ ...details });
	};

	const addFeeDescription = (e, dataIndex) => {
		e.preventDefault();
		if (details.data?.[dataIndex]) {
			details.data[dataIndex] = {
				...details.data[dataIndex],
				feeOption: [
					...details.data[dataIndex].feeOption,
					{ fee: "", description: "" },
				],
			};
			handleformData({
				...details,
			});
		}
	};

	const removeFeeDescription = (e, dataIndex, index) => {
		e.preventDefault();
		let currencyDetails = { ...details };
		if (currencyDetails.data[dataIndex].feeOption) {
			currencyDetails.data[dataIndex].feeOption.splice(index, 1);
			handleformData({
				...currencyDetails,
			});
		}
	};

	const removeCurrency = (e, index) => {
		e.preventDefault();
		details.data.splice(index, 1);
		handleformData({
			...details,
			data: [...details.data],
		});
	};

	const currencyToggleItem = (e, index) => {
		e.preventDefault();
		details.data[index].active = !details.data[index].active;
		handleformData({
			...details,
			data: [...details.data],
		});
	};

	const columns = () => [
		{
			label: "Name",
			name: "name",
			options: {
				filter: true,
				sort: false,
			},
		},

		{
			label: "Type",
			name: "type",
			options: {
				filter: true,
				sort: false,
			},
		},

		// {
		// 	name: "active",
		// 	label: "Active",
		// 	options: {
		// 		filter: false,
		// 		sort: false,
		// 		download: false,
		// 		customBodyRender: (rowData) => (
		// 			<div className="square-switch">
		// 				<Input
		// 					type="checkbox"
		// 					id={`square-switch-${rowData._id}-banner`}
		// 					switch="none"
		// 					checked={rowData.active}
		// 					onClick={() => {
		// 						toggleItem(rowData._id);
		// 					}}
		// 					onChange={() => {
		// 						toggleItem(rowData._id);
		// 					}}
		// 				/>
		// 				<Label
		// 					htmlFor={`square-switch-${rowData._id}-banner`}
		// 					data-on-label="Yes"
		// 					data-off-label="No"
		// 				></Label>
		// 			</div>
		// 		),
		// 	},
		// },

		{
			label: "Actions",
			name: "action",
			options: {
				filter: false,
				sort: false,
				empty: true,
				download: false,
				display: hasPermission(
					[
						"launchpad option update",
						"launchpad option delete",
						"launchpad option view",
					],
					auth.currentUserRolePermissions
				),
				viewColumns: hasPermission(
					[
						"launchpad option update",
						"launchpad option delete",
						"launchpad option view",
					],
					auth.currentUserRolePermissions
				),
				customBodyRender: (data) => {
					return (
						<div className="text-center">
							<HasAnyPermission
								permission={[
									"launchpad option update",
									"launchpad option view",
								]}
							>
								<button
									onClick={(e) => handleAddEditModal(data)}
									type="button"
									className="btn btn-soft-primary waves-effect waves-light"
								>
									<i className="bx bx-edit-alt font-size-16 align-middle"></i>
								</button>
							</HasAnyPermission>
							&nbsp;
							{/* <HasAnyPermission
								permission={["launchpad option delete"]}
							>
								<button
									onClick={(e) => removeItem(data._id)}
									type="button"
									className="btn btn-soft-danger waves-effect waves-light"
								>
									<i className="bx bx-trash font-size-16 align-middle"></i>
								</button>
							</HasAnyPermission> */}
						</div>
					);
				},
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

	const couldHaveAddUpdatePermission = () => {
		const isUpdatePermission = hasPermission(
			["launchpad option update"],
			auth.currentUserRolePermissions
		);
		const isAddPermission = hasPermission(
			["launchpad option add"],
			auth.currentUserRolePermissions
		);
		if (isUpdatePermission && isAddPermission) return true;
		else if (isUpdatePermission && !isEmpty(details._id)) return true;
		else if (isAddPermission && isEmpty(details._id)) return true;
		else return false;
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Helmet>
					<title>LaunchpadOption | LFinance</title>
				</Helmet>
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs
						title="Launchpad Option"
						breadcrumbItem="List"
					/>
					<Row>
						<Col lg="12">
							<Card>
								<CardBody>
									<Row>
										<Col xl="12">
											<div className="table-rep-plugin">
												<div className="table-responsive">
													<HasAnyPermission
														permission={[
															"launchpad option list",
														]}
													>
														<ReactDataTable
															url={`${apiUrl}/admin/launchpad-option/pagination`}
															columns={columns()}
															resultFormatter={
																resultFormatter
															}
															setRefresh={
																refreshTableData
															}
															disableFilterIcon={
																true
															}
															disableSearchIcon={
																true
															}
															origin={
																<div className="row">
																	<div className="col-auto h4">
																		Option
																		&nbsp;
																		<HasAnyPermission
																			permission={[
																				"launchpad option add",
																			]}
																		>
																			{/* <button
																				onClick={() => {
																					handleAddEditModal();
																				}}
																				type="button"
																				className="btn btn-primary waves-effect waves-light"
																			>
																				<i className="bx bx-plus-medical font-size-16 align-middle"></i>
																			</button> */}
																		</HasAnyPermission>
																	</div>
																</div>
															}
															rowsPerPage={10}
														/>
													</HasAnyPermission>

													<Modal
														isOpen={
															isOpenAddEditModal
														}
														toggle={
															handleAddEditModal
														}
														size="xl"
														centered={true}
													>
														<ModalHeader
															toggle={
																handleAddEditModal
															}
															tag="h4"
														>
															{details?._id
																? "Edit Option"
																: "Add Option"}
														</ModalHeader>
														<ModalBody>
															<fieldset
																disabled={
																	!couldHaveAddUpdatePermission()
																}
															>
																<Form
																	// form={true}
																	// onSubmit={
																	// 	validation.handleSubmit
																	// }
																	onSubmit={(
																		e
																	) => {
																		e.preventDefault();
																		validation.handleSubmit();
																		return false;
																	}}
																>
																	<Row>
																		<Col
																			xs={
																				12
																			}
																		>
																			<div className="mb-3">
																				<Label className="form-label">
																					Name
																				</Label>
																				<Input
																					name="name"
																					type="text"
																					readOnly
																					onChange={
																						handleChange
																					}
																					value={
																						details.name ||
																						""
																					}
																				/>
																			</div>
																		</Col>
																	</Row>

																	{details?.type ===
																	"currency" ? (
																		<>
																			<Row>
																				<Col
																					xs={
																						6
																					}
																				>
																					<div>
																						<div className="mb-3">
																							<div className="col-auto">
																								{`Currency
																											and
																											Fee
																											options `}
																								<button
																									type="button"
																									className="btn btn-soft-primary waves-effect waves-light"
																									onClick={
																										addCurrency
																									}
																								>
																									<i className="bx bx-plus font-size-16 align-middle"></i>
																								</button>
																							</div>
																						</div>
																					</div>
																				</Col>
																			</Row>
																			<Row>
																				{details.data &&
																					details.data.map(
																						(
																							detail,
																							index
																						) => (
																							<Col
																								xs={
																									6
																								}
																								key={`data${index}`}
																							>
																								<Card>
																									<CardBody>
																										<div className="d-flex flex-wrap align-items-center mb-4">
																											<h5 className="card-title me-2">
																												{/* {`${
																													index +
																													1
																												}   `} */}
																												<button
																													type="button"
																													className="btn btn-soft-primary waves-effect waves-light"
																													onClick={(
																														e
																													) =>
																														removeCurrency(
																															e,
																															index
																														)
																													}
																												>
																													<i className="bx bx-minus font-size-16 align-middle"></i>
																												</button>
																											</h5>
																											<div className="ms-auto">
																												<div className="mb-3">
																													<select
																														className="form-control"
																														name="active"
																														value={
																															detail.active
																																? true
																																: false
																														}
																														onChange={(
																															e
																														) => {
																															currencyToggleItem(
																																e,
																																index
																															);
																														}}
																													>
																														<option
																															value={
																																true
																															}
																														>
																															Active
																														</option>
																														<option
																															value={
																																false
																															}
																														>
																															Inactive
																														</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										<div>
																											<div className="mb-3">
																												<Input
																													placeholder="Currency"
																													name="name"
																													type="text"
																													value={
																														detail.name
																													}
																													onChange={handleChangeData(
																														"name",
																														index
																													)}
																													required
																												/>
																											</div>
																										</div>
																										<div>
																											<div className="mb-3">
																												Add
																												Fee
																												&
																												Description{" "}
																												{
																													"  "
																												}
																												<button
																													type="button"
																													className="btn btn-soft-primary waves-effect waves-light mb-1"
																													onClick={(
																														e
																													) => {
																														addFeeDescription(
																															e,
																															index
																														);
																													}}
																												>
																													<i className="bx bx-plus font-size-16 align-middle"></i>
																												</button>
																											</div>
																										</div>
																										{detail.feeOption?.map(
																											(
																												feeOption,
																												feeOptionIndex
																											) => (
																												<div
																													key={`fees-detail-${feeOptionIndex}`}
																												>
																													{feeOptionIndex !==
																														0 && (
																														<div>
																															<div className="mb-3">
																																<button
																																	type="button"
																																	className="btn btn-soft-primary waves-effect waves-light mb-1"
																																	onClick={(
																																		e
																																	) => {
																																		removeFeeDescription(
																																			e,
																																			index
																																		);
																																	}}
																																>
																																	<i className="bx bx-minus font-size-16 align-middle"></i>
																																</button>
																															</div>
																														</div>
																													)}

																													<div>
																														<div className="mb-3">
																															<Input
																																placeholder="Fee"
																																type="text"
																																data-type="data"
																																name="fee"
																																value={
																																	feeOption.fee
																																}
																																onChange={handleChangeFeeData(
																																	"fee",
																																	index,
																																	feeOptionIndex
																																)}
																																required
																															/>
																														</div>
																													</div>

																													<div>
																														<div className="mb-3">
																															<Input
																																name="description"
																																type="text"
																																data-type="data"
																																placeholder="Fee description"
																																value={
																																	feeOption.description
																																}
																																onChange={handleChangeFeeData(
																																	"description",
																																	index,
																																	feeOptionIndex
																																)}
																																required
																															/>
																														</div>
																													</div>
																												</div>
																											)
																										)}
																									</CardBody>
																								</Card>
																							</Col>
																						)
																					)}
																			</Row>
																		</>
																	) : details?.type ===
																			"refundType" ||
																	  "router" ? (
																		<>
																			<Row>
																				<Col
																					xs={
																						6
																					}
																				>
																					<div>
																						<div className="mb-3">
																							<div className="col-auto">
																								{` ${
																									details?.type ===
																									"refundType"
																										? "Refund Type "
																										: details?.type ===
																										  "router"
																										? "Routers "
																										: "Stages "
																								}`}
																								<button
																									type="button"
																									className="btn btn-soft-primary waves-effect waves-light"
																									onClick={
																										addCurrency
																									}
																								>
																									<i className="bx bx-plus font-size-16 align-middle"></i>
																								</button>
																							</div>
																						</div>
																					</div>
																				</Col>
																			</Row>
																			<Row>
																				{details?.data &&
																					details.data?.map(
																						(
																							detail,
																							index
																						) => (
																							<Col
																								xs={
																									6
																								}
																								key={`data${index}`}
																							>
																								<Card>
																									<CardBody>
																										<div className="d-flex flex-wrap align-items-center mb-4">
																											<h5 className="card-title me-2">
																												{/* {`${
																													index +
																													1
																												}   `} */}
																												<button
																													type="button"
																													className="btn btn-soft-primary waves-effect waves-light"
																													onClick={(
																														e
																													) =>
																														removeCurrency(
																															e,
																															index
																														)
																													}
																												>
																													<i className="bx bx-minus font-size-16 align-middle"></i>
																												</button>
																											</h5>

																											<div className="ms-auto">
																												<div className="mb-3">
																													<select
																														className="form-control"
																														name="active"
																														value={
																															detail.active
																																? true
																																: false
																														}
																														onChange={(
																															e
																														) => {
																															currencyToggleItem(
																																e,
																																index
																															);
																														}}
																													>
																														<option
																															value={
																																true
																															}
																														>
																															Active
																														</option>
																														<option
																															value={
																																false
																															}
																														>
																															Inactive
																														</option>
																													</select>
																												</div>
																											</div>
																										</div>
																										<div>
																											<div className="mb-3">
																												<Input
																													placeholder="Name"
																													name="name"
																													type="text"
																													value={
																														detail.name
																													}
																													onChange={handleChangeData(
																														"name",
																														index
																													)}
																													required
																												/>
																											</div>
																										</div>
																									</CardBody>
																								</Card>
																							</Col>
																						)
																					)}
																			</Row>
																		</>
																	) : null}
																	<Row>
																		<Col>
																			<div className="text-end mt-3">
																				<button
																					type="submit"
																					className="btn btn-success save-user"
																				>
																					Save
																				</button>
																			</div>
																		</Col>
																	</Row>
																</Form>
															</fieldset>
														</ModalBody>
													</Modal>
												</div>
											</div>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default LaunchpadOption;
