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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HasAnyPermission from "../../common/Permission";
import hasPermission from "../../common/HasPermission";
import ReactDataTable from "../../common/ReactDataTable";
import isEmpty from "../../utils/isEmpty";
import { apiUrl } from "../../config";
import Swal from "sweetalert2";

import {
	create,
	update,
	remove,
	getRoles,
	clearResponse,
} from "../../store/admin/actions";

const Admin = (props) => {
	const dispatch = useDispatch();
	const refreshTableData = useRef(null);
	const { response, roles, auth } = useSelector((state) => ({
		response: state.admin.response,
		roles: state.admin.roles,
		auth: state.auth,
	}));

	const [isOpenAddEditModal, toggleAddEditModal] = useState(false);
	const [details, handleFormData] = useState({
		active: true,
	});

	useEffect(() => {
		dispatch(getRoles());
	}, []);

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

	// const toggleItem = (id) => {
	// 	if (!isEmpty(id)) {
	// 		dispatch(toggle(id));
	// 	}
	// };

	let validationSchema = {
		name: Yup.string().required("Please enter name."),
		email: Yup.string().email().required("Please enter valid email."),
		role: Yup.string().required("Please select role."),
		password: Yup.string().required("Please enter password."),
		// .matches(
		// 	/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
		// 	"Password must contain at least eight character long one least one uppercase and loewrcase letter, number and special character."
		// ),
		confirmPassword: Yup.string()
			.required("Please enter confirm password.")
			.oneOf([Yup.ref("password"), null], "Passwords must match."),
	};

	if (details._id) {
		delete validationSchema.password;
		delete validationSchema.confirmPassword;
	}

	const useFormikOptions = {
		enableReinitialize: true,
		initialValues: {
			name: details && details.name ? details.name : "",
			email: details && details.email ? details.email : "",
			role: details && details.role ? details.role : "",
		},
		validationSchema: Yup.object(validationSchema),
		onSubmit: (values) => {
			const { role, ...restValue } = values;
			if (details._id) {
				dispatch(
					update({
						...restValue,
						_id: details._id,
						roles: [role],
					})
				);
			} else {
				dispatch(create({ ...values, roles: [role] }));
			}
		},
	};
	const validation = useFormik(useFormikOptions);

	const handleAddEditModal = (data = null) => {
		if (!isEmpty(data) && data?._id) {
			handleFormData({ ...data, role: data.roles?.[0]?._id });
		} else {
			handleFormData({
				active: true,
			});
			validation.resetForm();
		}
		toggleAddEditModal(!isOpenAddEditModal);
	};

	const columns = () => [
		{
			label: "Name",
			name: "name",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			label: "Email",
			name: "email",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			label: "Role",
			name: "roles",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (roles) => {
					let data = "";
					if (roles) {
						data = roles.map((role) => role.name);
					}
					return data.toString();
				},
			},
		},
		{
			label: "Actions",
			name: "action",
			options: {
				filter: false,
				sort: false,
				empty: true,
				download: false,
				display: hasPermission(
					["admin update", "admin delete", "admin view"],
					auth.currentUserRolePermissions
				),
				viewColumns: hasPermission(
					["admin update", "admin delete", "admin view"],
					auth.currentUserRolePermissions
				),
				customBodyRender: (data) => {
					return (
						<div className="text-center">
							{data?.roles?.[0]?.name !== "Administrator" && (
								<HasAnyPermission
									permission={["admin update", "admin view"]}
								>
									<button
										onClick={(e) =>
											handleAddEditModal(data)
										}
										type="button"
										className="btn btn-soft-primary waves-effect waves-light"
									>
										<i className="bx bx-edit-alt font-size-16 align-middle"></i>
									</button>
								</HasAnyPermission>
							)}
							&nbsp;
							{data?.roles?.[0]?.name !== "Administrator" && (
								<HasAnyPermission permission={["admin delete"]}>
									<button
										onClick={(e) => removeItem(data._id)}
										type="button"
										disabled={
											data?.roles?.[0]?.name ===
											"Administrator"
										}
										className="btn btn-soft-danger waves-effect waves-light"
									>
										<i className="bx bx-trash font-size-16 align-middle"></i>
									</button>
								</HasAnyPermission>
							)}
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
				action: item,
			};
		});
	};

	const couldHaveAddUpdatePermission = () => {
		const isUpdatePermission = hasPermission(
			["admin update"],
			auth.currentUserRolePermissions
		);
		const isAddPermission = hasPermission(
			["admin add"],
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
					<title>Admin | LFinance</title>
				</Helmet>
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs title="Admin" breadcrumbItem="List" />
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
															"admin list",
														]}
													>
														<ReactDataTable
															url={`${apiUrl}/admin/user-admin/pagination`}
															columns={columns()}
															resultFormatter={
																resultFormatter
															}
															setRefresh={
																refreshTableData
															}
															disableFilterIcon={
																false
															}
															disableSearchIcon={
																false
															}
															origin={
																<div className="row">
																	<div className="col-auto h4">
																		Admin
																		&nbsp;
																		<HasAnyPermission
																			permission={[
																				"admin add",
																			]}
																		>
																			<button
																				onClick={() => {
																					handleAddEditModal();
																				}}
																				type="button"
																				className="btn btn-primary waves-effect waves-light"
																			>
																				<i className="bx bx-plus-medical font-size-16 align-middle"></i>
																			</button>
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
														backdrop={"static"}
														size="lg"
														centered={true}
													>
														<ModalHeader
															toggle={
																handleAddEditModal
															}
															tag="h4"
														>
															{details?._id
																? "Edit"
																: "Add"}
														</ModalHeader>
														<ModalBody>
															<Form
																// form={true}
																// onSubmit={
																// 	validation.handleSubmit
																// }
																disabled
																onSubmit={(
																	e
																) => {
																	e.preventDefault();
																	validation.handleSubmit();
																	return false;
																}}
															>
																<fieldset
																	disabled={
																		!couldHaveAddUpdatePermission()
																	}
																>
																	<Row
																		form={
																			"true"
																		}
																	>
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
																					onChange={
																						validation.handleChange
																					}
																					onBlur={
																						validation.handleBlur
																					}
																					value={
																						validation
																							.values
																							.name ||
																						""
																					}
																					invalid={
																						validation
																							.touched
																							.name &&
																						validation
																							.errors
																							.name
																							? true
																							: false
																					}
																				/>
																				{validation
																					.touched
																					.name &&
																				validation
																					.errors
																					.name ? (
																					<FormFeedback type="invalid">
																						{
																							validation
																								.errors
																								.name
																						}
																					</FormFeedback>
																				) : null}
																			</div>
																		</Col>

																		<Col
																			xs={
																				12
																			}
																		>
																			<div className="mb-3">
																				<Label className="form-label">
																					Email
																				</Label>
																				<Input
																					name="email"
																					type="email"
																					onChange={
																						validation.handleChange
																					}
																					onBlur={
																						validation.handleBlur
																					}
																					value={
																						validation
																							.values
																							.email ||
																						""
																					}
																					invalid={
																						validation
																							.touched
																							.email &&
																						validation
																							.errors
																							.email
																							? true
																							: false
																					}
																				/>
																				{validation
																					.touched
																					.email &&
																				validation
																					.errors
																					.email ? (
																					<FormFeedback type="invalid">
																						{
																							validation
																								.errors
																								.email
																						}
																					</FormFeedback>
																				) : null}
																			</div>
																		</Col>

																		<Col
																			xs={
																				12
																			}
																		>
																			<div className="mb-3">
																				<Label className="form-label">
																					Role
																				</Label>
																				<Input
																					name="role"
																					type="select"
																					onChange={
																						validation.handleChange
																					}
																					onBlur={
																						validation.handleBlur
																					}
																					value={
																						validation
																							.values
																							.role ||
																						""
																					}
																					invalid={
																						validation
																							.touched
																							.role &&
																						validation
																							.errors
																							.role
																							? true
																							: false
																					}
																				>
																					<option
																						disabled
																						value=""
																					>
																						Role
																					</option>
																					{roles?.map(
																						(
																							item
																						) => (
																							<option
																								key={
																									item._id
																								}
																								value={
																									item._id
																								}
																							>
																								{
																									item.name
																								}
																							</option>
																						)
																					)}
																				</Input>

																				{validation
																					.touched
																					.role &&
																				validation
																					.errors
																					.role ? (
																					<FormFeedback type="invalid">
																						{
																							validation
																								.errors
																								.role
																						}
																					</FormFeedback>
																				) : null}
																			</div>
																		</Col>
																		{details._id ===
																		undefined ? (
																			<>
																				<Col
																					xs={
																						12
																					}
																				>
																					<div className="mb-3">
																						<Label className="form-label">
																							Password
																						</Label>
																						<Input
																							name="password"
																							type="password"
																							onChange={
																								validation.handleChange
																							}
																							onBlur={
																								validation.handleBlur
																							}
																							value={
																								validation
																									.values
																									.password ||
																								""
																							}
																							invalid={
																								validation
																									.touched
																									.password &&
																								validation
																									.errors
																									.password
																									? true
																									: false
																							}
																						/>
																						{validation
																							.touched
																							.password &&
																						validation
																							.errors
																							.password ? (
																							<FormFeedback type="invalid">
																								{
																									validation
																										.errors
																										.password
																								}
																							</FormFeedback>
																						) : null}
																					</div>
																				</Col>

																				<Col
																					xs={
																						12
																					}
																				>
																					<div className="mb-3">
																						<Label className="form-label">
																							Confirm
																							Password
																						</Label>
																						<Input
																							name="confirmPassword"
																							type="password"
																							onChange={
																								validation.handleChange
																							}
																							onBlur={
																								validation.handleBlur
																							}
																							value={
																								validation
																									.values
																									.confirmPassword ||
																								""
																							}
																							invalid={
																								validation
																									.touched
																									.confirmPassword &&
																								validation
																									.errors
																									.confirmPassword
																									? true
																									: false
																							}
																						/>
																						{validation
																							.touched
																							.confirmPassword &&
																						validation
																							.errors
																							.confirmPassword ? (
																							<FormFeedback type="invalid">
																								{
																									validation
																										.errors
																										.confirmPassword
																								}
																							</FormFeedback>
																						) : null}
																					</div>
																				</Col>
																			</>
																		) : null}
																	</Row>
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
																</fieldset>
															</Form>
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

export default Admin;
