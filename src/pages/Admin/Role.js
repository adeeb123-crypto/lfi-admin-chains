import React, {
	useEffect,
	useState,
	useRef,
	useMemo,
	useCallback,
} from "react";
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
	createRole as create,
	updateRole as update,
	removeRole as remove,
	toggleRole as toggle,
	getPermissions,
	clearResponse,
} from "../../store/admin/actions";

let refreshTableData;

const Role = (props) => {
	const dispatch = useDispatch();
	const refreshTableData = useRef(null);
	const { response, permissions, roles, auth } = useSelector((state) => ({
		response: state.admin.response,
		permissions: state.admin.permissions,
		auth: state.auth,
	}));

	const [isOpenAddEditModal, toggleAddEditModal] = useState(false);
	const [details, handleFormData] = useState({
		active: true,
		permissions: [],
	});

	useEffect(() => {
		dispatch(getPermissions());
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

	const toggleItem = (id) => {
		if (!isEmpty(id)) {
			dispatch(toggle(id));
		}
	};

	let validationSchema = {
		name: Yup.string().required("Please enter name."),
		// permissions: Yup.array(
		// 	Yup.object({
		// 		permissionId: Yup.string().required(
		// 			"Please select permissions."
		// 		),
		// 		permission: Yup.string().required("Please select permissions."),
		// 	})
		// ).required("Please select permissions."),
		// permissions: Yup.array()
		// 	.of(
		// 		Yup.object().shape({
		// 			permissionId: Yup.string().required(),
		// 			permission: Yup.string().required(),
		// 		})
		// 	)
		// 	.required("Please select permissions."),
	};

	const useFormikOptions = {
		enableReinitialize: true,
		initialValues: {
			name: details && details.name ? details.name : "",
		},
		validationSchema: Yup.object(validationSchema),
		onSubmit: (values) => {
			const { role, ...restValue } = values;
			if (details._id) {
				dispatch(
					update({
						...restValue,
						_id: details._id,
					})
				);
			} else {
				dispatch(create(values));
			}
		},
	};
	const validation = useFormik(useFormikOptions);

	const handleAddEditModal = (data = null) => {
		if (!isEmpty(data) && data?._id) {
			handleFormData(data);
			validation.setFieldValue("permissions", data.permissions);
		} else {
			handleFormData({
				active: true,
				permissions: [],
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
			label: "Permission",
			name: "permissions",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (rowData) => {
					return rowData
						?.map((colPerm) => colPerm.permission)
						.join(",  ");
				},
			},
		},
		{
			name: "active",
			label: "Active",
			options: {
				filter: false,
				sort: false,
				download: false,
				customBodyRender: (rowData) => {
					if (
						rowData.name === "super admin" ||
						rowData.name === "Administrator" ||
						rowData.name === "administrator"
					) {
						return "YES";
					} else {
						return (
							<div className="square-switch">
								<Input
									type="checkbox"
									id={`square-switch-${rowData._id}-role`}
									switch="none"
									checked={rowData.active}
									onClick={() => {
										toggleItem(rowData._id);
									}}
									onChange={() => {
										toggleItem(rowData._id);
									}}
								/>
								<Label
									htmlFor={`square-switch-${rowData._id}-role`}
									data-on-label="Yes"
									data-off-label="No"
								></Label>
							</div>
						);
					}
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
					["role update", "role delete", "role view"],
					auth.currentUserRolePermissions
				),
				viewColumns: hasPermission(
					["role update", "role delete", "role view"],
					auth.currentUserRolePermissions
				),
				customBodyRender: (data) => {
					if (
						// false
						data.name === "super admin" ||
						data.name === "Administrator" ||
						data.name === "administrator"
					) {
						return null;
					} else {
						return (
							<div className="text-center">
								<HasAnyPermission
									permission={["role update", "role view"]}
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
								&nbsp;
								<HasAnyPermission permission={["role delete"]}>
									<button
										onClick={(e) => removeItem(data._id)}
										type="button"
										className="btn btn-soft-danger waves-effect waves-light"
									>
										<i className="bx bx-trash font-size-16 align-middle"></i>
									</button>
								</HasAnyPermission>
							</div>
						);
					}
				},
			},
		},
	];

	const resultFormatter = useCallback((result) => {
		return result.map((item) => {
			return {
				...item,
				active: item,
				action: item,
			};
		});
	}, []);

	const handleCheckBoxChange = (permission) => (event) => {
		let permissions = details.permissions;
		if (event.target.checked) {
			permissions.push({
				permissionId: event.target.name,
				permission: permission,
			});
		} else {
			permissions = permissions.filter(
				(per) => per.permissionId !== event.target.name
			);
		}
		validation.setFieldValue(
			"permissions",
			permissions.length ? permissions : undefined
		);
		handleFormData({ ...details, permissions });
	};

	// const couldCheckedCheckBox = useCallback(
	// 	(permissionId) => {
	// 		const check = details.permissions.find(
	// 			(per) => per.permissionId === permissionId
	// 		);
	// 		return !isEmpty(check);
	// 	},
	// 	[details?.permissions]
	// );

	const couldCheckedCheckBox = (permissionId) => {
		const check = details.permissions.find(
			(per) => per.permissionId === permissionId
		);
		return !isEmpty(check);
	};

	const checkboxRenders = () => {
		return permissions
			? permissions.map((permission) => (
					<Col key={permission._id} md={3}>
						<div className="form-check mb-3">
							<input
								className="form-check-input"
								type="checkbox"
								name={permission._id}
								defaultChecked={couldCheckedCheckBox(
									permission._id
								)}
								onChange={handleCheckBoxChange(permission.name)}
							/>
							<label
								className="form-check-label"
								htmlFor={permission._id}
							>
								{permission.name}
							</label>
						</div>
					</Col>
			  ))
			: null;
	};

	const couldHaveAddUpdatePermission = () => {
		const isUpdatePermission = hasPermission(
			["role update"],
			auth.currentUserRolePermissions
		);
		const isAddPermission = hasPermission(
			["role add"],
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
					<title>Admin Role | LFinance</title>
				</Helmet>
				<Container fluid>
					{/* Render Breadcrumbs */}
					<Breadcrumbs title="Role" breadcrumbItem="List" />
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
															"role list",
														]}
													>
														<ReactDataTable
															url={`${apiUrl}/admin/role`}
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
																		Role
																		&nbsp;
																		<HasAnyPermission
																			permission={[
																				"role add",
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
																	</Row>
																	<Row>
																		{checkboxRenders()}

																		{validation
																			.errors
																			.permissions && (
																			<Col
																				md={
																					6
																				}
																			>
																				<div
																					style={{
																						display:
																							"block",
																					}}
																					type="invalid"
																					class="invalid-feedback"
																				>
																					{
																						validation
																							.errors
																							.permissions
																					}
																				</div>
																			</Col>
																		)}
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

export default Role;
