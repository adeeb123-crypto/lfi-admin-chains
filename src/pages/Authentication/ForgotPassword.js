import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
	Row,
	Col,
	Alert,
	Container,
	Form,
	Input,
	FormFeedback,
	Label,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
// actions
import {
	forgotPassword,
	clearResponse,
	resetPassword,
} from "../../store/auth/actions";
// import images
import logo from "../../assets/images/logo_lyo.png";
//Import config
import CarouselPage from "./CarouselPage";
import { toast } from "react-toastify";
import isEmpty from "../../utils/isEmpty";

const Login = (props) => {
	const dispatch = useDispatch();
	const { errors, response, resetResponse, forgotResponse, isLoading, auth } =
		useSelector((state) => ({
			auth: state.auth,
			errors: state.auth.errors,
			response: state.auth.response,
			resetResponse: state.auth.resetResponse,
			forgotResponse: state.auth.forgotResponse,
			isLoading: state.auth.loading,
		}));

	const resetTabView = useCallback(() => {
		if (props.match?.params?.token) return true;
		return false;
	}, [props.match?.params?.token]);

	useEffect(() => {
		if (response && response.code === "200") {
			toast.success(response.msg, {
				onClose: () => {
					dispatch(clearResponse());
				},
			});
		} else if (response && response?.msg) {
			toast.error(response.msg, {
				onClose: () => {
					dispatch(clearResponse());
				},
			});
		}
	}, [dispatch, response]);

	const redirectPageLogin = () => {
		dispatch(clearResponse());
		props.history.push("/login");
	};

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Please Enter Your Email"),
		}),
		onSubmit: (values) => {
			dispatch(forgotPassword(values));
		},
	});

	const resetValidation = useFormik({
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
			dispatch(
				resetPassword({
					...values,
					token: props.match.params.token,
					key: props.match?.params.tokenKey,
				})
			);
		},
	});

	const clearLoginResponse = () => {
		dispatch(clearResponse());
	};

	document.title = "Forgot Password | LFinance";

	return (
		<React.Fragment>
			<div className="auth-page">
				<Container fluid className="p-0">
					<Row className="g-0">
						<Col lg={4} md={5} className="col-xxl-3">
							<div className="auth-full-page-content d-flex p-sm-5 p-4">
								<div className="w-100">
									<div className="d-flex flex-column h-100">
										<div className="mb-4 mb-md-5 text-center">
											<Link
												to="/dashboard"
												className="d-block auth-logo"
											>
												<img
													src={logo}
													alt=""
													height="28"
												/>{" "}
												<span className="logo-txt">
													LFinance
												</span>
											</Link>
										</div>

										{resetTabView() ? (
											<div className="auth-content my-auto">
												<div className="text-center">
													<h5 className="mb-0">
														Reset Password
													</h5>
												</div>
												{resetResponse &&
												resetResponse.code === "200" ? (
													<div className="text-center">
														<h6 className="text-muted mt-5">
															{resetResponse.msg}
														</h6>
														<button
															type="button"
															onClick={() =>
																props.history.push(
																	"/login"
																)
															}
															className=" mt-5 btn btn-primary"
														>
															Login
														</button>
													</div>
												) : (
													<Form
														name="changePassword"
														className="custom-form mt-4 pt-2"
														onSubmit={(e) => {
															e.preventDefault();
															resetValidation.handleSubmit();
															return false;
														}}
													>
														{response &&
														response.msg ? (
															<Alert
																color={
																	response.code ===
																	"200"
																		? "success"
																		: "danger"
																}
															>
																{response.msg}
															</Alert>
														) : null}
														<Row>
															<Col>
																<div className="mb-3 position-relative">
																	<div className="input-group">
																		<Input
																			name="password"
																			type="password"
																			placeholder="New Password"
																			onChange={
																				resetValidation.handleChange
																			}
																			onBlur={
																				resetValidation.handleBlur
																			}
																			value={
																				resetValidation
																					.values
																					.password ||
																				""
																			}
																			invalid={
																				resetValidation
																					.touched
																					.password &&
																				resetValidation
																					.errors
																					.password
																					? true
																					: false
																			}
																		/>
																		{resetValidation
																			.touched
																			.password &&
																		resetValidation
																			.errors
																			.password ? (
																			<FormFeedback type="invalid">
																				{
																					resetValidation
																						.errors
																						.password
																				}
																			</FormFeedback>
																		) : null}
																	</div>
																</div>
															</Col>
														</Row>
														<Row>
															<Col>
																<div className="mb-3 position-relative">
																	<div className="input-group">
																		<Input
																			name="confirmPassword"
																			type="password"
																			placeholder="Confirm Password"
																			onChange={
																				resetValidation.handleChange
																			}
																			onBlur={
																				resetValidation.handleBlur
																			}
																			value={
																				resetValidation
																					.values
																					.confirmPassword ||
																				""
																			}
																			invalid={
																				resetValidation
																					.touched
																					.confirmPassword &&
																				resetValidation
																					.errors
																					.confirmPassword
																					? true
																					: false
																			}
																		/>
																		{resetValidation
																			.touched
																			.confirmPassword &&
																		resetValidation
																			.errors
																			.confirmPassword ? (
																			<FormFeedback type="invalid">
																				{
																					resetValidation
																						.errors
																						.confirmPassword
																				}
																			</FormFeedback>
																		) : null}
																	</div>
																</div>
															</Col>
														</Row>
														<Row>
															<div className="d-flex justify-content-end  gap-2">
																<button
																	onClick={
																		redirectPageLogin
																	}
																	disabled={
																		isLoading
																			? true
																			: false
																	}
																	type="reset"
																	className="btn btn-secondary"
																>
																	Cancel
																</button>

																<button
																	type="submit"
																	className="btn btn-primary"
																	disabled={
																		isLoading
																			? true
																			: false
																	}
																>
																	{isLoading ? (
																		<>
																			<i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
																			{
																				"Loading"
																			}
																		</>
																	) : (
																		"Confirm"
																	)}
																</button>
															</div>
														</Row>
													</Form>
												)}
											</div>
										) : (
											<div className="auth-content my-auto">
												<div className="text-center">
													<h5 className="mb-0">
														Reset password
													</h5>
													<p className="text-muted mt-2"></p>
												</div>

												{forgotResponse &&
												forgotResponse.code ===
													"200" ? (
													<div className="text-center">
														<h6 className="text-muted mt-5">
															{forgotResponse.msg}
														</h6>
														<button
															type="button"
															onClick={() =>
																props.history.push(
																	"/login"
																)
															}
															className=" mt-5 btn btn-primary"
														>
															Login
														</button>
													</div>
												) : (
													<Form
														className="custom-form mt-4 pt-2"
														onSubmit={(e) => {
															e.preventDefault();
															validation.handleSubmit();
															return false;
														}}
													>
														{response &&
														response.msg ? (
															<Alert
																color={
																	response.code ===
																	"200"
																		? "success"
																		: "danger"
																}
															>
																{response.msg}
															</Alert>
														) : null}
														<div className="mb-3">
															<Label className="form-label">
																Email
															</Label>
															<Input
																name="email"
																className="form-control"
																placeholder="Enter email"
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
															{validation.touched
																.email &&
															validation.errors
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
														<div className="d-flex justify-content-end  gap-2">
															<button
																disabled={
																	isLoading
																		? true
																		: false
																}
																type="reset"
																onClick={
																	redirectPageLogin
																}
																className="btn btn-secondary"
															>
																Cancel
															</button>

															<button
																type="submit"
																className="btn btn-primary"
																disabled={
																	isLoading
																		? true
																		: false
																}
															>
																{isLoading ? (
																	<>
																		<i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
																		{
																			"Loading"
																		}
																	</>
																) : (
																	"Send"
																)}
															</button>
														</div>
													</Form>
												)}
												<div className="mt-5 text-center">
													{/* <p className="text-muted mb-0">
														Don't have an account ?{" "}
														<Link
															to="/login"
															className="text-primary fw-semibold"
														>
															{" "}
															Signup now{" "}
														</Link>{" "}
													</p> */}
												</div>
											</div>
										)}
										<div className="mt-4 mt-md-5 text-center">
											<p className="mb-0">
												© {new Date().getFullYear()}{" "}
												LFinance
											</p>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<CarouselPage />
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(Login);

Login.propTypes = {
	history: PropTypes.object,
};
