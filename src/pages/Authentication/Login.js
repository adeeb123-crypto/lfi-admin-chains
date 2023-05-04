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
	login as loginUser,
	setLogin,
	confirmLogin,
	clearLoginVerificationResponse,
	clearResponse,
	resendVerificationCode,
} from "../../store/auth/actions";
// import images
import logo from "../../assets/images/logo_lyo.png";
//Import config
import CarouselPage from "../Authentication/CarouselPage";
import Countdown, { zeroPad } from "react-countdown";
import moment from "moment";
import { toast } from "react-toastify";
import isEmpty from "../../utils/isEmpty";

const Login = (props) => {
	const dispatch = useDispatch();
	const { errors, verificationResponse, response, isLoading, auth } =
		useSelector((state) => ({
			auth: state.auth,
			errors: state.auth.errors,
			response: state.auth.response,
			isLoading: state.auth.loading,
			verificationResponse: state.auth.verificationResponse,
		}));
	useEffect(() => {
		if (auth.isAuthenticated) props.history.push("/dashboard");
	}, [auth.isAuthenticated]);

	const checkVerificationTabView = useCallback(() => {
		if (
			verificationResponse?.data &&
			verificationResponse?.code === "200" &&
			isEmpty(verificationResponse.data.directLogin)
		)
			return true;
		return false;
	}, [verificationResponse]);

	useEffect(() => {
		if (
			verificationResponse?.code === "200" &&
			verificationResponse.data.directLogin
		) {
			dispatch(setLogin(verificationResponse.data.token, props.history));
		}
	}, [dispatch, verificationResponse]);

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
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Please Enter Your Email"),
			password: Yup.string().required("Please Enter Your Password"),
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values, props.history));
		},
	});

	const loginValidation = useFormik({
		enableReinitialize: true,
		initialValues: {
			code: "",
		},
		validationSchema: Yup.object({
			code: Yup.string().required("Please Enter verification code."),
		}),
		onSubmit: (values) => {
			dispatch(
				confirmLogin(
					{ ...values, ...verificationResponse.data },
					props.history
				)
			);
		},
	});

	const clearLoginResponse = () => {
		dispatch(clearLoginVerificationResponse());
		dispatch(clearResponse());
	};

	const handleResendVerificationCode = () => {
		dispatch(resendVerificationCode(verificationResponse.data));
	};

	document.title = "Login | LFinance";

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

										{checkVerificationTabView() ? (
											<div className="auth-content my-auto">
												<div className="text-center">
													<h5 className="mb-0">
														Security Verification
													</h5>
													{/* <p className="text-muted mt-2">
													Sign in to continue to
													LFinance Admin.
												</p> */}
												</div>
												<Form
													name="confirmLoginForm"
													className="custom-form mt-4 pt-2"
													onSubmit={(e) => {
														e.preventDefault();
														loginValidation.handleSubmit();
														return false;
													}}
												>
													{errors?.msg ? (
														<Alert color="danger">
															{errors?.msg}
														</Alert>
													) : null}
													<Row>
														<Col>
															<div className="mb-3 position-relative">
																<div className="input-group">
																	<Input
																		name="code"
																		className="form-control"
																		placeholder={
																			verificationResponse
																				.data
																				.verificationType ===
																			"emailCode"
																				? "Email verification code"
																				: "Google verification code"
																		}
																		type="text"
																		onChange={
																			loginValidation.handleChange
																		}
																		onBlur={
																			loginValidation.handleBlur
																		}
																		value={
																			loginValidation
																				.values
																				.code ||
																			""
																		}
																		invalid={
																			loginValidation
																				.touched
																				.code &&
																			loginValidation
																				.errors
																				.code
																				? true
																				: false
																		}
																	/>
																	<div className="input-group-prepend">
																		{verificationResponse
																			.data
																			.verificationType ===
																			"emailCode" && (
																			<Countdown
																				date={
																					verificationResponse.verificationCodeTime
																						? verificationResponse.verificationCodeTime
																						: Date.now()
																				}
																				zeroPadTime={
																					2
																				}
																				key={
																					verificationResponse.verificationCodeTime.toString() ??
																					""
																				}
																				renderer={({
																					days,
																					hours,
																					minutes,
																					seconds,
																					completed,
																					api,
																				}) => {
																					if (
																						completed
																					) {
																						// return "";
																						// api?.stop();
																						return (
																							<button
																								style={{
																									zIndex: 10000000000,
																								}}
																								className="btn btn-info"
																								type="button"
																								onClick={() =>
																									handleResendVerificationCode()
																								}
																							>
																								Click
																								to
																								send
																							</button>
																						);
																					} else {
																						return (
																							<button
																								style={{
																									zIndex: 10000000000,
																								}}
																								className="btn btn-info"
																								type="button"
																								disabled
																							>
																								{`${zeroPad(
																									minutes
																								)}:${zeroPad(
																									seconds
																								)}`}
																							</button>
																						);
																					}
																				}}
																			/>
																		)}
																	</div>
																</div>
															</div>
														</Col>
													</Row>
													<Row>
														<div className="d-flex justify-content-end  gap-2">
															<button
																onClick={
																	clearLoginResponse
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
											</div>
										) : (
											<div className="auth-content my-auto">
												<div className="text-center">
													<h5 className="mb-0">
														Welcome Back !
													</h5>
													<p className="text-muted mt-2">
														Sign in to continue to
														LFinance Admin.
													</p>
												</div>
												<Form
													className="custom-form mt-4 pt-2"
													onSubmit={(e) => {
														e.preventDefault();
														validation.handleSubmit();
														return false;
													}}
												>
													{errors?.msg ? (
														<Alert color="danger">
															{errors?.msg}
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
																	.email || ""
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

													<div className="mb-3">
														<Label className="form-label">
															Password
														</Label>
														<Input
															name="password"
															value={
																validation
																	.values
																	.password ||
																""
															}
															type="password"
															placeholder="Enter Password"
															onChange={
																validation.handleChange
															}
															onBlur={
																validation.handleBlur
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
															autoComplete="false"
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

													<div className="row mb-4">
														<div className="col">
															<p className="mb-0 text-end">
																<Link
																	to="forgot-password"
																	className="text-primary"
																>
																	Forgot
																	Password?
																</Link>
															</p>

															<div className="mt-3 d-grid">
																<button
																	className="btn btn-primary btn-block"
																	type="submit"
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
																		"Log In"
																	)}
																</button>
															</div>
														</div>
													</div>
												</Form>

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
