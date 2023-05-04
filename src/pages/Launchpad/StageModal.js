import React, { useState, useEffect } from "react";
import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
	FormText,
	Form,
	Label,
	Input,
	FormGroup,
	InputGroup,
	Alert,
} from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { Grid } from "@mui/material";
import Checkbox from "react-custom-checkbox";
import LiveDateTime from "./LiveDateTime";

const StageModal = ({
	stageModalDetails,
	toggleStageModal,
	validationForStage,
	validationForFirstStep,
	couldHaveAddUpdatePermission,
	launchpadOptions,
}) => {
	return (
		<React.Fragment>
			<Modal isOpen={stageModalDetails.active} size="lg" centered={true}>
				<ModalHeader
					toggle={() => {
						toggleStageModal({
							...stageModalDetails,
							active: !stageModalDetails.active,
						});
						validationForStage.resetForm();
					}}
					tag="h4"
				>
					{stageModalDetails.action === "edit"
						? "Edit Stage"
						: "Add Stage"}
				</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validationForStage.handleSubmit();
							return false;
						}}
					>
						<fieldset disabled={!couldHaveAddUpdatePermission()}>
							<div className="row">
								<div className="row">
									<div className="col-lg-12">
										{/* <FormGroup className="mb-3">
											<Checkbox
												name="isExchangeList"
												id={`${"isExchangeList"}`}
												checked={
													validationForStage.values
														.isExchangeList || false
												}
												onChange={(value, event) => {
													validationForStage.setFieldValue(
														"isExchangeList",
														value
													);
												}}
												borderColor="#5156be"
												style={{
													cursor: "pointer",
													// backgroundColor:
													// 	"#fff",
												}}
												labelStyle={{
													marginLeft: 5,
													userSelect: "none",
												}}
												className="isExchangeList"
												label="Exchange Listing"
											/>
										</FormGroup> */}
										<div className="mb-3">
											<label className="control-label">
												Stage
											</label>

											<Input
												name="stage"
												type="text"
												onChange={
													validationForStage.handleChange
												}
												onBlur={
													validationForStage.handleBlur
												}
												value={
													validationForStage.values
														.stage || ""
												}
												invalid={
													validationForStage.touched
														.stage &&
													validationForStage.errors
														.stage
														? true
														: false
												}
											/>

											{validationForStage.touched.stage &&
											validationForStage.errors.stage ? (
												<FormFeedback type="invalid">
													{
														validationForStage
															.errors.stage
													}
												</FormFeedback>
											) : null}
										</div>
									</div>
								</div>
								{validationForStage.values.isExchangeList !==
									true && (
									<>
										<div className="row">
											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														Softcap (USDT)
													</label>
													<Input
														name="softcap"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.softcap ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.softcap || ""
														}
														invalid={
															validationForStage
																.touched
																.softcap &&
															validationForStage
																.errors.softcap
																? true
																: false
														}
													/>
													<FormText
														color="primary"
														className="card-title-desc"
													>
														{`Softcap must be >=50% of Hardcap!`}
													</FormText>
													{validationForStage.touched
														.softcap &&
													validationForStage.errors
														.softcap ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.softcap
															}
														</FormFeedback>
													) : null}
												</div>
											</div>

											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														Hardcap (USDT)
													</label>
													<Input
														name="hardcap"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.hardcap ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.hardcap || ""
														}
														invalid={
															validationForStage
																.touched
																.hardcap &&
															validationForStage
																.errors.hardcap
																? true
																: false
														}
													/>
													{validationForStage.touched
														.hardcap &&
													validationForStage.errors
														.hardcap ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.hardcap
															}
														</FormFeedback>
													) : null}
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														Minimum Buy
													</label>
													<Input
														name="minimumBuy"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.minimumBuy ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.minimumBuy ||
															""
														}
														invalid={
															validationForStage
																.touched
																.minimumBuy &&
															validationForStage
																.errors
																.minimumBuy
																? true
																: false
														}
													/>
													{validationForStage.touched
														.minimumBuy &&
													validationForStage.errors
														.minimumBuy ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.minimumBuy
															}
														</FormFeedback>
													) : null}
												</div>
											</div>

											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														Maximum Buy
													</label>
													<Input
														name="maximumBuy"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.maximumBuy ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.maximumBuy ||
															""
														}
														invalid={
															validationForStage
																.touched
																.maximumBuy &&
															validationForStage
																.errors
																.maximumBuy
																? true
																: false
														}
													/>
													{validationForStage.touched
														.maximumBuy &&
													validationForStage.errors
														.maximumBuy ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.maximumBuy
															}
														</FormFeedback>
													) : null}
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-lg-12">
												<div className="mb-3">
													<label
														htmlFor="basicpill-vatno-input"
														className="form-label"
													>
														Refund Type
													</label>

													<Input
														name="refundType"
														type="select"
														onChange={
															validationForStage.handleChange
														}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.refundType ||
															""
														}
														invalid={
															validationForStage
																.touched
																.refundType &&
															validationForStage
																.errors
																.refundType
																? true
																: false
														}
													>
														<option
															value=""
															disabled
														>
															Select refund type
														</option>
														{launchpadOptions?.refundType &&
															launchpadOptions?.refundType.data.map(
																(
																	type,
																	refundTypeIndex
																) => (
																	<option
																		key={
																			type.name +
																			refundTypeIndex
																		}
																		value={
																			type.name
																		}
																	>
																		{
																			type.name
																		}
																	</option>
																)
															)}
													</Input>
													{validationForStage.touched
														.refundType &&
													validationForStage.errors
														.refundType ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.refundType
															}
														</FormFeedback>
													) : null}
												</div>
											</div>
										</div>
									</>
								)}
								{validationForStage.values.isExchangeList ==
									true && (
									<>
										<div className="row">
											<div className="col-lg-12">
												<div className="mb-3">
													<label
														htmlFor="basicpill-vatno-input"
														className="form-label"
													>
														Router
													</label>
													<Input
														name="router"
														type="select"
														onChange={
															validationForStage.handleChange
														}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.router || ""
														}
														invalid={
															validationForStage
																.touched
																.router &&
															validationForStage
																.errors.router
																? true
																: false
														}
													>
														<option
															value=""
															disabled
														>
															Select router
														</option>
														{launchpadOptions?.router &&
															launchpadOptions?.router.data.map(
																(
																	type,
																	routerIndex
																) => (
																	<option
																		key={
																			type.name +
																			routerIndex
																		}
																		value={
																			type.name
																		}
																	>
																		{
																			type.name
																		}
																	</option>
																)
															)}
													</Input>
													{validationForStage.touched
														.router &&
													validationForStage.errors
														.router ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.router
															}
														</FormFeedback>
													) : null}
												</div>
											</div>
										</div>

										<div className="row">
											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														{`${
															validationForStage
																.values
																.router ?? ""
														} Listing rate`}
													</label>
													<Input
														name="listingRate"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.listingRate ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.listingRate ||
															""
														}
														invalid={
															validationForStage
																.touched
																.listingRate &&
															validationForStage
																.errors
																.listingRate
																? true
																: false
														}
													/>
													{validationForStage?.values
														?.router && (
														<FormText
															color="primary"
															className="card-title-desc"
														>
															{`1 ${getCurrencyName} = ${validationForStage.values.listingRate} ${validationForStage.values.router}`}
														</FormText>
													)}
													{validationForStage.touched
														.listingRate &&
													validationForStage.errors
														.listingRate ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.listingRate
															}
														</FormFeedback>
													) : null}
												</div>
											</div>

											<div className="col-lg-6">
												<div className="mb-3">
													<label
														htmlFor="basicpill-firstname-input"
														className="form-label"
													>
														{`${
															validationForStage
																.values
																.router ?? ""
														} liquidity`}
													</label>
													<Input
														name="liquidity"
														type="text"
														onChange={(e) => {
															e.target.value =
																e.target.value.match(
																	/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																)
																	? e.target.value.match(
																			/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																	  )[0]
																	: validationForStage
																			.values
																			?.liquidity ||
																	  "";
															validationForStage.handleChange(
																e
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.liquidity || ""
														}
														invalid={
															validationForStage
																.touched
																.liquidity &&
															validationForStage
																.errors
																.liquidity
																? true
																: false
														}
													/>
													{validationForStage.touched
														.liquidity &&
													validationForStage.errors
														.liquidity ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.liquidity
															}
														</FormFeedback>
													) : null}
												</div>
											</div>
										</div>
									</>
								)}
								{validationForStage.values.isExchangeList !==
									true && (
									<div className="row">
										{validationForFirstStep.values
											?.currency &&
											validationForFirstStep.values?.currency?.map(
												(curr, currencyInd) => (
													<div
														key={curr + currencyInd}
														className="col-lg-6"
													>
														<div className="mb-3">
															<label
																htmlFor={`${curr.name}`}
																className="form-label"
															>
																{`Rate in ${curr.name}`}
															</label>
															<Input
																key={`input${curr.name}`}
																name={`${curr.name}`}
																type="text"
																onChange={(
																	e
																) => {
																	e.target.value =
																		e.target.value.match(
																			/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
																		)
																			? e.target.value.match(
																					/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																			  )[0]
																			: validationForStage
																					.values?.[
																					curr
																						.name
																			  ] ||
																			  "";
																	validationForStage.handleChange(
																		e
																	);
																}}
																onBlur={
																	validationForStage.handleBlur
																}
																value={
																	validationForStage
																		.values?.[
																		curr
																			.name
																	] || ""
																}
																invalid={
																	validationForStage
																		.touched[
																		curr
																			.name
																	] ===
																		true &&
																	validationForStage
																		.errors?.[
																		curr
																			.name
																	]
																		? true
																		: false
																}
															/>
															{validationForStage
																.touched[
																curr.name
															] === true &&
															validationForStage
																.errors?.[
																curr.name
															] ? (
																<FormFeedback type="invalid">
																	{
																		validationForStage
																			.errors?.[
																			curr
																				.name
																		]
																	}
																</FormFeedback>
															) : null}
														</div>
													</div>
												)
											)}

										{/* <div className="col-lg-6">
																					<div className="mb-3">
																						<label
																							htmlFor="basicpill-firstname-input"
																							className="form-label"
																						>
																							{`Rate/Price`}
																						</label>
																						<Input
																							name="presaleRate"
																							type="text"
																							onChange={
																								validationForStage.handleChange
																							}
																							onBlur={
																								validationForStage.handleBlur
																							}
																							value={
																								validationForStage
																									.values
																									.presaleRate ||
																								""
																							}
																							invalid={
																								validationForStage
																									.touched
																									.presaleRate &&
																								validationForStage
																									.errors
																									.presaleRate
																									? true
																									: false
																							}
																						/>
																						{validationForStage
																							.touched
																							.presaleRate &&
																						validationForStage
																							.errors
																							.presaleRate ? (
																							<FormFeedback type="invalid">
																								{
																									validationForStage
																										.errors
																										.presaleRate
																								}
																							</FormFeedback>
																						) : null}
																					</div>
																				</div> */}

										<div className="col-lg-6">
											<div className="mb-3">
												<label
													htmlFor="basicpill-firstname-input"
													className="form-label"
												>
													{`liquidity`}
												</label>
												<Input
													name="liquidity"
													type="text"
													onChange={(e) => {
														e.target.value =
															e.target.value.match(
																/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
															)
																? e.target.value.match(
																		/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
																  )[0]
																: validationForStage
																		.values
																		.liquidity;
														validationForStage.handleChange(
															e
														);
													}}
													onBlur={
														validationForStage.handleBlur
													}
													value={
														validationForStage
															.values.liquidity ||
														""
													}
													invalid={
														validationForStage
															.touched
															.liquidity &&
														validationForStage
															.errors.liquidity
															? true
															: false
													}
												/>
												{validationForStage.touched
													.liquidity &&
												validationForStage.errors
													.liquidity ? (
													<FormFeedback type="invalid">
														{
															validationForStage
																.errors
																.liquidity
														}
													</FormFeedback>
												) : null}
											</div>
										</div>
									</div>
								)}

								<div className="row">
									<div className="text-center">
										<Alert
											className="alert-outline text-default"
											color="info"
										>
											Current UTC DATE TIME : {"  "}
											<LiveDateTime />
										</Alert>
									</div>
								</div>

								{validationForStage.values.isExchangeList !==
									true && (
									<div className="row">
										<div className="col-lg-6">
											<FormGroup className="mb-3">
												<Label>Start Date (UTC)</Label>

												<InputGroup>
													<Flatpickr
														className={`form-control d-block ${
															validationForStage
																.touched
																.startDate &&
															validationForStage
																.errors
																.startDate
																? "is-invalid"
																: ""
														}`}
														placeholder="Select start date"
														options={{
															altInput: true,
															altFormat:
																"Y-m-d H:i",
															dateFormat:
																"Y-m-d H:i",
															enableTime: true,
															time_24hr: true,
															// minDate:
															// 	getMinDateForStage(
															// 		stageDetailIndex
															// 	),
														}}
														onChange={(
															date,
															dateInString
														) => {
															// handleDateChange(
															// 	"startDate",
															// 	dateInString
															// );
															validationForStage.setFieldValue(
																"startDate",
																dateInString
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.startDate || ""
														}
														invalid={
															validationForStage
																.touched
																.startDate &&
															validationForStage
																.errors
																.startDate
																? "true"
																: "false"
														}
														name="startDate"
													/>
													{/* <div className="input-group-append">
																											<span className="input-group-text">
																												<i className="mdi mdi-clock-outline" />
																											</span>
																										</div> */}
													{validationForStage.touched
														.startDate &&
													validationForStage.errors
														.startDate ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.startDate
															}
														</FormFeedback>
													) : null}
												</InputGroup>
											</FormGroup>
										</div>

										<div className="col-lg-6">
											<FormGroup className="mb-3">
												<Label>End Date (UTC)</Label>

												<InputGroup>
													<Flatpickr
														className={`form-control d-block ${
															validationForStage
																.touched
																.endDate &&
															validationForStage
																.errors.endDate
																? "is-invalid"
																: ""
														}`}
														placeholder="Select end date"
														options={{
															altInput: true,
															altFormat:
																"Y-m-d H:i",
															dateFormat:
																"Y-m-d H:i",
															enableTime: true,
															time_24hr: true,
															// minDate:
															// 	"today",
														}}
														name="endDate"
														onChange={(
															date,
															dateInString
														) => {
															// handleDateChange(
															// 	"endDate",
															// 	dateInString
															// );
															validationForStage.setFieldValue(
																"endDate",
																dateInString
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.endDate || ""
														}
													/>
													{/* <div className="input-group-append">
																											<span className="input-group-text">
																												<i className="mdi mdi-clock-outline" />
																											</span>
																										</div> */}
													{validationForStage.touched
														.endDate &&
													validationForStage.errors
														.endDate ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.endDate
															}
														</FormFeedback>
													) : null}
												</InputGroup>
											</FormGroup>
										</div>
									</div>
								)}
								{validationForStage.values.isExchangeList ===
									true && (
									<div className="row">
										<div className="col-lg-12">
											<FormGroup className="mb-3">
												<Label>Listing Date</Label>

												<InputGroup>
													<Flatpickr
														className={`form-control d-block ${
															validationForStage
																.touched
																.startDate &&
															validationForStage
																.errors
																.startDate
																? "is-invalid"
																: ""
														}`}
														placeholder="Select start date"
														options={{
															altInput: true,
															altFormat:
																"Y-m-d H:i",
															dateFormat:
																"Y-m-d H:i",
															enableTime: true,
															time_24hr: true,
															// minDate:
															// 	getMinDateForStage(
															// 		stageDetailIndex
															// 	),
														}}
														onChange={(
															date,
															dateInString
														) => {
															// handleDateChange(
															// 	"startDate",
															// 	dateInString
															// );
															validationForStage.setFieldValue(
																"startDate",
																dateInString
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.startDate || ""
														}
														invalid={
															validationForStage
																.touched
																.startDate &&
															validationForStage
																.errors
																.startDate
																? "true"
																: "false"
														}
														name="startDate"
													/>
													{/* <div className="input-group-append">
																											<span className="input-group-text">
																												<i className="mdi mdi-clock-outline" />
																											</span>
																										</div> */}
													{validationForStage.touched
														.startDate &&
													validationForStage.errors
														.startDate ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.startDate
															}
														</FormFeedback>
													) : null}
												</InputGroup>
											</FormGroup>
										</div>
									</div>
								)}
								{validationForStage.values.isExchangeList !==
									true &&
								validationForStage.values.isVesting ===
									false ? (
									<div className="row">
										<div className="col-lg-6">
											<FormGroup className="mb-3">
												<Label>
													Release Date-Time (UTC)
												</Label>

												<InputGroup>
													<Flatpickr
														className={`form-control d-block ${
															validationForStage
																.touched
																.releaseDate &&
															validationForStage
																.errors
																.releaseDate
																? "is-invalid"
																: ""
														}`}
														placeholder="Select release datetime"
														options={{
															altInput: true,
															altFormat:
																"Y-m-d H:i",
															dateFormat:
																"Y-m-d H:i",
															enableTime: true,
															time_24hr: true,
															// minDate:
															// 	getMinDateForStage(
															// 		stageDetailIndex
															// 	),
														}}
														onChange={(
															date,
															dateInString
														) => {
															validationForStage.setFieldValue(
																"releaseDate",
																dateInString
															);
														}}
														onBlur={
															validationForStage.handleBlur
														}
														value={
															validationForStage
																.values
																.releaseDate ||
															""
														}
														invalid={
															validationForStage
																.touched
																.releaseDate &&
															validationForStage
																.errors
																.releaseDate
																? "true"
																: "false"
														}
														name="releaseDate"
													/>

													{validationForStage.touched
														.releaseDate &&
													validationForStage.errors
														.releaseDate ? (
														<FormFeedback type="invalid">
															{
																validationForStage
																	.errors
																	.releaseDate
															}
														</FormFeedback>
													) : null}
												</InputGroup>
											</FormGroup>
										</div>
									</div>
								) : undefined}
								{/* {validationForStage.values.isExchangeList !==
									true && (
									<div className="row">
										<div className="col-lg-12">
											<FormGroup className="mb-3">
												<Checkbox
													name="isVesting"
													id={`${"isVesting"}`}
													checked={
														validationForStage
															.values.isVesting ||
														false
													}
													onChange={(
														value,
														event
													) => {
														validationForStage.setFieldValue(
															"isVesting",
															value
														);
														if (!value) {
															validationForStage.setFieldValue(
																"cliffing",
																0
															);
															validationForStage.setFieldValue(
																"vesting",
																0
															);
														}
													}}
													borderColor="#5156be"
													style={{
														cursor: "pointer",
														// backgroundColor:
														// 	"#fff",
													}}
													labelStyle={{
														marginLeft: 5,
														userSelect: "none",
													}}
													className="isVesting"
													label="Vesting & cliffing Time"
												/>
											</FormGroup>
										</div>
									</div>
								)} */}
								{validationForStage.values.isExchangeList !==
									true &&
								validationForStage.values.isVesting === true ? (
									<div className="row">
										<div className="col-lg-6">
											<div className="mb-3">
												<label
													htmlFor="basicpill-firstname-input"
													className="form-label"
												>
													Vesting (days)
												</label>
												<Grid
													container
													direction="row"
													spacing={2}
												>
													<Grid item md="7">
														<Input
															name="vesting"
															type="text"
															onChange={(e) => {
																validationForStage.setFieldValue(
																	"liquidityLockup",
																	e.target
																		.value
																);
																validationForStage.handleChange(
																	e
																);
															}}
															onBlur={
																validationForStage.handleBlur
															}
															value={
																validationForStage
																	.values
																	.vesting ||
																""
															}
															invalid={
																validationForStage
																	.touched
																	.vesting &&
																validationForStage
																	.errors
																	.vesting
																	? true
																	: false
															}
														/>
														{validationForStage
															.touched.vesting &&
														validationForStage
															.errors.vesting ? (
															<FormFeedback type="invalid">
																{
																	validationForStage
																		.errors
																		.vesting
																}
															</FormFeedback>
														) : null}
													</Grid>
													<Grid item md="5">
														<Input
															name="vestingTime"
															type="time"
															onChange={(e) => {
																validationForStage.setFieldValue(
																	"vestingTime",
																	e.target
																		.value
																);
																validationForStage.handleChange(
																	e
																);
															}}
															onBlur={
																validationForStage.handleBlur
															}
															value={
																validationForStage
																	.values
																	.vestingTime ||
																""
															}
															invalid={
																validationForStage
																	.touched
																	.vestingTime &&
																validationForStage
																	.errors
																	.vestingTime
																	? true
																	: false
															}
														/>
														{validationForStage
															.touched
															.vestingTime &&
														validationForStage
															.errors
															.vestingTime ? (
															<FormFeedback type="invalid">
																{
																	validationForStage
																		.errors
																		.vestingTime
																}
															</FormFeedback>
														) : null}
													</Grid>
												</Grid>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="mb-3">
												<label
													htmlFor="basicpill-firstname-input"
													className="form-label"
												>
													Cliffing (days)
												</label>
												<Grid
													container
													direction="row"
													spacing={2}
												>
													<Grid item md="7">
														<Input
															name="cliffing"
															type="text"
															onChange={
																validationForStage.handleChange
															}
															onBlur={
																validationForStage.handleBlur
															}
															value={
																validationForStage
																	.values
																	.cliffing ||
																""
															}
															invalid={
																validationForStage
																	.touched
																	.cliffing &&
																validationForStage
																	.errors
																	.cliffing
																	? true
																	: false
															}
														/>
														{validationForStage
															.touched.cliffing &&
														validationForStage
															.errors.cliffing ? (
															<FormFeedback type="invalid">
																{
																	validationForStage
																		.errors
																		.cliffing
																}
															</FormFeedback>
														) : null}
													</Grid>
													<Grid item md="5">
														<Input
															name="cliffingTime"
															type="time"
															onChange={(e) => {
																validationForStage.setFieldValue(
																	"cliffingTime",
																	e.target
																		.value
																);
																validationForStage.handleChange(
																	e
																);
															}}
															onBlur={
																validationForStage.handleBlur
															}
															value={
																validationForStage
																	.values
																	.cliffingTime ||
																""
															}
															invalid={
																validationForStage
																	.touched
																	.cliffingTime &&
																validationForStage
																	.errors
																	.cliffingTime
																	? true
																	: false
															}
														/>
														{validationForStage
															.touched
															.cliffingTime &&
														validationForStage
															.errors
															.cliffingTime ? (
															<FormFeedback type="invalid">
																{
																	validationForStage
																		.errors
																		.cliffingTime
																}
															</FormFeedback>
														) : null}
													</Grid>
												</Grid>
											</div>
										</div>
										<div className="col-lg-6">
											<div className="mb-3">
												<label
													htmlFor="basicpill-firstname-input"
													className="form-label"
												>
													Total Vesting (Days)
												</label>
												<Grid
													container
													direction="row"
													spacing={2}
												>
													<Grid item md="7">
														<Input
															name="totalDays"
															type="text"
															onChange={
																validationForStage.handleChange
															}
															onBlur={
																validationForStage.handleBlur
															}
															value={
																validationForStage
																	.values
																	.totalDays ||
																""
															}
															invalid={
																validationForStage
																	.touched
																	.totalDays &&
																validationForStage
																	.errors
																	.totalDays
																	? true
																	: false
															}
														/>
														{validationForStage
															.touched
															.totalDays &&
														validationForStage
															.errors
															.totalDays ? (
															<FormFeedback type="invalid">
																{
																	validationForStage
																		.errors
																		.totalDays
																}
															</FormFeedback>
														) : null}
													</Grid>
												</Grid>
											</div>
										</div>
									</div>
								) : undefined}
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
							</div>
						</fieldset>
					</Form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default StageModal;
