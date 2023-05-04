import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Input,
	FormFeedback,
	Form,
} from "reactstrap";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import { useSelector, useDispatch } from "react-redux";
//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import Avatar from "react-avatar";
import {
	updateProfilePassword,
	updateProfile,
	clearResponse,
} from "../../store/auth/actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserProfile = () => {
	document.title = "Profile | LFinance";
	const dispatch = useDispatch();
	const emailInputRef = useRef(null);
	const { response, auth, errors } = useSelector((state) => ({
		auth: state.auth,
		response: state.auth.response,
		errors: state.auth.errors,
	}));
	useEffect(() => {
		if (response && response.code === "200") {
			toast.success(response.msg, {
				onOpen: () => {
					dispatch(clearResponse());
				},
			});
		} else if (response && response?.msg) {
			toast.error(response.msg, {
				onOpen: () => {
					dispatch(clearResponse());
				},
			});
		}
	}, [dispatch, response]);
	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			password: Yup.string().required("Please enter password."),
			// .matches(
			// 	/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
			// 	"Password must contain at least eight character long one least one uppercase and loewrcase letter, number and special character."
			// ),
			confirmPassword: Yup.string()
				.required("Please enter confirm password.")
				.oneOf([Yup.ref("password"), null], "Passwords must match."),
		}),
		onSubmit: (values) => {
			Swal.fire({
				title: "Are you sure?",
				text: "Do you really want to update password?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Confirm",
			}).then((result) => {
				validation.resetForm();
				if (result.value) {
					dispatch(updateProfilePassword(values));
				}
			});
		},
	});

	const validationProfile = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: auth.user.name,
			email: emailInputRef.current?.props?.value
				? emailInputRef.current.props.value
				: auth.user.email,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please enter name."),
			email: Yup.string().required("Please enter email."),
		}),
		onSubmit: (values) => {
			Swal.fire({
				title: "Are you sure?",
				text: "Do you really want to update?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Confirm",
			}).then((result) => {
				validationProfile.resetForm();
				if (result.value) {
					dispatch(updateProfile(values));
				}
			});
		},
	});
	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					{/* Render Breadcrumb */}
					<Breadcrumb title="Login User" breadcrumbItem="Profile" />
					<Row>
						<Col lg="12">
							<Card>
								<CardBody>
									<div className="d-flex">
										<div className="ms-3">
											<Avatar
												className=""
												color={"#74788d"}
												name={auth.user?.name}
												round={true}
												size={60}
											/>
										</div>
										<div className="flex-grow-1 align-self-center ms-3">
											<div className="text-muted">
												<h5>{auth?.user.name}</h5>
												<p className="mb-1">
													{auth?.user.email}
												</p>
												<p className="mb-0">
													Role: #
													{auth?.user?.roles[0]?.name.toUpperCase()}
												</p>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col xs={6}>
							<Card>
								<CardBody>
									<Form
										name="profileUpdateForm"
										onSubmit={(e) => {
											e.preventDefault();
											validationProfile.handleSubmit();
											return false;
										}}
									>
										<Row form={"true"}>
											<Col xs={12}>
												<div className="mb-3">
													<Input
														name="name"
														type="text"
														placeholder="Name"
														onChange={
															validationProfile.handleChange
														}
														onBlur={
															validationProfile.handleBlur
														}
														value={
															validationProfile
																.values.name ||
															""
														}
														invalid={
															validationProfile
																.touched.name &&
															validationProfile
																.errors.name
																? true
																: false
														}
													/>
													{validationProfile.touched
														.name &&
													validationProfile.errors
														.name ? (
														<FormFeedback type="invalid">
															{
																validationProfile
																	.errors.name
															}
														</FormFeedback>
													) : null}
												</div>
											</Col>

											<Col xs={12}>
												<div className="mb-3">
													<Input
														ref={emailInputRef}
														name="email"
														type="email"
														placeholder="Email"
														onChange={
															validationProfile.handleChange
														}
														onBlur={
															validationProfile.handleBlur
														}
														value={
															validationProfile
																.values.email ||
															""
														}
														invalid={
															validationProfile
																.touched
																.email &&
															validationProfile
																.errors.email
																? true
																: errors?.fields
																		?.email
																? true
																: false
														}
													/>
													{validationProfile.touched
														.email &&
													validationProfile.errors
														.email ? (
														<FormFeedback type="invalid">
															{
																validationProfile
																	.errors
																	.email
															}
														</FormFeedback>
													) : null}

													{errors?.fields?.email ? (
														<FormFeedback type="invalid">
															{
																errors.fields
																	.email[0]
															}
														</FormFeedback>
													) : null}
												</div>
											</Col>

											<Row>
												<Col>
													<div className="text-end mt-3">
														<button
															type="submit"
															className="btn btn-success save-user"
														>
															Update Profile
														</button>
													</div>
												</Col>
											</Row>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
						<Col xs={6}>
							<Card>
								<CardBody>
									<Form
										name="passwordUpdateForm"
										onSubmit={(e) => {
											e.preventDefault();
											validation.handleSubmit();
											return false;
										}}
									>
										<Row form={"true"}>
											<Col xs={12}>
												<div className="mb-3">
													<Input
														name="password"
														type="password"
														placeholder="New Password"
														onChange={
															validation.handleChange
														}
														onBlur={
															validation.handleBlur
														}
														value={
															validation.values
																.password || ""
														}
														invalid={
															validation.touched
																.password &&
															validation.errors
																.password
																? true
																: false
														}
													/>
													{validation.touched
														.password &&
													validation.errors
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

											<Col xs={12}>
												<div className="mb-3">
													<Input
														name="confirmPassword"
														type="password"
														placeholder="Confirm Password"
														onChange={
															validation.handleChange
														}
														onBlur={
															validation.handleBlur
														}
														value={
															validation.values
																.confirmPassword ||
															""
														}
														invalid={
															validation.touched
																.confirmPassword &&
															validation.errors
																.confirmPassword
																? true
																: false
														}
													/>
													{validation.touched
														.confirmPassword &&
													validation.errors
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
											<Row>
												<Col>
													<div className="text-end mt-3">
														<button
															type="submit"
															className="btn btn-success save-user"
														>
															Update Password
														</button>
													</div>
												</Col>
											</Row>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default UserProfile;
