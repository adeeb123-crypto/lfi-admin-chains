import React from "react";
import { Card, CardBody, Row, Form } from "reactstrap";
import moment from "moment";
import isEmpty from "../../utils/isEmpty";

const StageDetailStepSecond = ({
	validationForSecondStep,
	handleAddNewStage,
	stageDetails,
	handleDeleteStage,
	handleEditStage,
}) => {
	return (
		<React.Fragment>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validationForSecondStep.handleSubmit();
					return false;
				}}
			>
				<div>
					<div className="text-center mb-4">
						<h5>Launchpad Stages Info</h5>
						<p className="card-title-desc">
							Enter the launchpad stages information.
						</p>
					</div>
					<Row>
						<div className="d-flex flex-wrap align-items-center mb-4">
							<h5 className="card-title me-2">{"Stages"}</h5>
							<button
								type="button"
								className="btn btn-soft-primary waves-effect waves-light"
								onClick={(e) => {
									e.preventDefault();
									handleAddNewStage();
								}}
							>
								<i className="bx bx-plus font-size-16 align-middle"></i>
							</button>
						</div>

						<Card className="editStagesBody">
							<CardBody
								style={{
									padding: "0",
								}}
							>
								{stageDetails[0].active ? (
									<div className="row">
										{stageDetails.map((stage, idx) => (
											<div
												className="col-lg-3 col-md-3"
												key={idx}
											>
												<Card className="m-1">
													<div className="card-header align-items-center d-flex">
														<h4 className="card-title mb-0 flex-grow-1">
															Stage
														</h4>
														<div className="flex-shrink-0">
															<span className="font-size-12 fw-medium">
																{stage.stage}
															</span>
														</div>
													</div>
													<CardBody>
														<div className="mt-0">
															<div className="d-flex align-items-center">
																<div className="flex-grow-1">
																	<span className="font-size-12">
																		liquidity
																	</span>
																</div>

																<div className="flex-shrink-0">
																	<span className="font-size-12 fw-medium">
																		{
																			stage.liquidity
																		}
																	</span>
																</div>
															</div>
														</div>

														{stage.currencyRateDetails?.map(
															(
																curr,
																currencyInd
															) => (
																<div
																	key={
																		currencyInd
																	}
																	className="mt-0"
																>
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				{`Rate in ${curr.currency}`}
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					curr.rate
																				}
																			</span>
																		</div>
																	</div>
																</div>
															)
														)}

														{/* {stage.isExchangeList ? (
															<div className="mt-0">
																<div className="d-flex align-items-center">
																	<div className="flex-grow-1">
																		<span className="font-size-12">
																			Listing
																			Rate
																		</span>
																	</div>

																	<div className="flex-shrink-0">
																		<span className="font-size-12 fw-medium">
																			{
																				stage.listingRate
																			}
																		</span>
																	</div>
																</div>
															</div>
														) : (
															<div className="mt-0">
																<div className="d-flex align-items-center">
																	<div className="flex-grow-1">
																		<span className="font-size-12">
																			Rate/Price
																		</span>
																	</div>

																	<div className="flex-shrink-0">
																		<span className="font-size-12 fw-medium">
																			{
																				stage.presaleRate
																			}
																		</span>
																	</div>
																</div>
															</div>
														)} */}
														{stage.isExchangeList && (
															<div className="mt-0">
																<div className="d-flex align-items-center">
																	<div className="flex-grow-1">
																		<span className="font-size-12">
																			Router
																		</span>
																	</div>

																	<div className="flex-shrink-0">
																		<span className="font-size-12 fw-medium">
																			{
																				stage.router
																			}
																		</span>
																	</div>
																</div>
															</div>
														)}
														{stage.isExchangeList !==
															true && (
															<>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Softcap
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.softcap
																				}
																			</span>
																		</div>
																	</div>
																</div>

																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Hardcap
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.hardcap
																				}
																			</span>
																		</div>
																	</div>
																</div>

																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Refund
																				Type
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.refundType
																				}
																			</span>
																		</div>
																	</div>
																</div>

																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Minimum
																				Buy
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.minimumBuy
																				}
																			</span>
																		</div>
																	</div>
																</div>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Maximum
																				Buy
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.maximumBuy
																				}
																			</span>
																		</div>
																	</div>
																</div>
															</>
														)}

														<div className="mt-0">
															<div className="d-flex align-items-center">
																<div className="flex-grow-1">
																	<span className="font-size-12">
																		{stage.isExchangeList
																			? "Listing Date"
																			: "Start Date"}
																	</span>
																</div>

																<div className="flex-shrink-0">
																	<span className="font-size-12 fw-medium">
																		{stage.startDate
																			? moment(
																					stage.startDate?.replace(
																						"Z",
																						""
																					)
																			  ).format(
																					"lll"
																			  )
																			: ""}
																	</span>
																</div>
															</div>
														</div>

														{stage.isExchangeList !==
															true && (
															<>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				End
																				Date
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{stage.endDate
																					? moment(
																							stage.endDate?.replace(
																								"Z",
																								""
																							)
																					  ).format(
																							"lll"
																					  )
																					: ""}
																			</span>
																		</div>
																	</div>
																</div>

																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Release
																				Date
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{stage.releaseDate
																					? moment(
																							stage.releaseDate?.replace(
																								"Z",
																								""
																							)
																					  ).format(
																							"lll"
																					  )
																					: "-"}
																			</span>
																		</div>
																	</div>
																</div>

																{/* <div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Vesting
																				(days)
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.vesting
																				}
																			</span>
																		</div>
																	</div>
																</div>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Cliffing
																				(days)
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					stage.cliffing
																				}
																			</span>
																		</div>
																	</div>
																</div> */}
															</>
														)}
													</CardBody>
													<div className="actionBtn">
														<div className="d-flex align-items-center">
															<div className="flex-grow-1">
																<span className="font-size-16">
																	{isEmpty(
																		stage.status
																	) ||
																	(stage.status &&
																		stage.status ===
																			"draft") ? (
																		<button
																			type="button"
																			className="btn btn-soft-danger waves-effect waves-light"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				handleDeleteStage(
																					idx
																				);
																			}}
																		>
																			<i className="mdi mdi-trash-can d-block font-size-16 align-middle"></i>
																		</button>
																	) : null}
																</span>
															</div>

															<div className="flex-shrink-0">
																{isEmpty(
																	stage.status
																) ||
																(stage.status &&
																	stage.status ===
																		"draft") ? (
																	<button
																		type="button"
																		className="btn btn-soft-success waves-effect waves-light"
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			handleEditStage(
																				idx
																			);
																		}}
																	>
																		<i className="mdi mdi-pencil d-block font-size-16 align-middle"></i>
																	</button>
																) : null}
															</div>
														</div>
													</div>
												</Card>
											</div>
										))}
									</div>
								) : (
									<div className="text-center ">
										<span className="text-center text-muted">{`No stage`}</span>
									</div>
								)}
							</CardBody>
						</Card>
					</Row>
				</div>
			</Form>
		</React.Fragment>
	);
};

export default StageDetailStepSecond;
