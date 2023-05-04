import React from "react";
import { Card, CardBody, Col, Row, CardHeader } from "reactstrap";
import moment from "moment";
const AdditionalInfoStepThird = ({
	validationForThirdStep,
	getCurrencyName,
	validationForFirstStep,
	stageDetails,
}) => {
	return (
		<React.Fragment>
			<div>
				<div className="text-center mb-4">
					<h5>Finish</h5>
					<p className="card-title-desc">Review your information</p>
				</div>
				<Card>
					<CardHeader>
						<h5 className="card-title mb-0">Review</h5>
					</CardHeader>
					<CardBody>
						<div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Network
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.network
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Token Address
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.tokenAddress
												}
											</p>
										</div>
									</div>
								</Row>
							</div>

							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Token Name
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.tokenName
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Token Symbol
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.tokenSymbol
												}
											</p>
										</div>
									</div>
								</Row>
							</div>

							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Token Decimal
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.tokenDecimal
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Token Owner Address
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values
														.tokenOwnerAddress
												}
											</p>
										</div>
									</div>
								</Row>
							</div>

							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Currency
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{getCurrencyName?.join(", ")}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Fee
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForFirstStep
														.values.fee
												}
											</p>
										</div>
									</div>
								</Row>
							</div>

							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Claim Option
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{validationForFirstStep.values
													.listingOption ===
												"automatic"
													? "Auto Listing"
													: "Manual Listing"}
											</p>
										</div>
									</div>
								</Row>
							</div>

							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Stages{" "}
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2"></p>
										</div>
									</div>
								</Row>
							</div>

							<div className="row pb-2">
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
												</Card>
											</div>
										))}
									</div>
								) : (
									<div className="text-center ">
										<span className="text-center text-muted">{`No stage`}</span>
									</div>
								)}
							</div>

							{/* <div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Logo URL
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.logoURL
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Website
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.websiteURL
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Facebook
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.facebook
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Twitter
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.twitter
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Github
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.github
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Telegram
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.telegram
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Instagram
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.instagram
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Discord
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.discord
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Reddit
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.reddit
												}
											</p>
										</div>
									</div>
								</Row>
							</div>
							<div className="pb-2">
								<Row>
									<Col xl={3}>
										<div>
											<h5 className="font-size-15">
												Description
											</h5>
										</div>
									</Col>
									<div className="col-xl">
										<div className="text-muted">
											<p className="mb-2">
												{
													validationForThirdStep
														.values.description
												}
											</p>
										</div>
									</div>
								</Row>
							</div> */}
						</div>
					</CardBody>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default AdditionalInfoStepThird;
