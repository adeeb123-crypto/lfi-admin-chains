import React from "react";
import { Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import Dropzone from "react-dropzone";

const TeamTokenomicWhitepaperInfoStepFour = ({
	handleAddNewTeamInfo,
	teamInfo,
	handleDeleteTeamInfo,
	handleEditTeamInfo,
	handleAddNewTokenomic,
	tokenomicDetails,
	handleDeleteTokenomic,
	handleEditTokenomic,
	selectedFile,
	whitepaper,
}) => {
	return (
		<React.Fragment>
			<div>
				<div>
					<div className="text-center mb-4">
						<h5>Team & Tokenomics & Whitepaper Info</h5>
						<p className="card-title-desc">Team information</p>
					</div>
				</div>
				<Card>
					<CardHeader>
						<div className="d-flex flex-wrap align-items-center mb-4">
							<h5 className="card-title me-2">{"Team Info"}</h5>
							<button
								type="button"
								className="btn btn-soft-primary waves-effect waves-light"
								onClick={(e) => {
									e.preventDefault();
									handleAddNewTeamInfo();
								}}
							>
								<i className="bx bx-plus font-size-16 align-middle"></i>
							</button>
						</div>
					</CardHeader>
					<CardBody>
						<div>
							<Row>
								<Col xs={12}>
									{teamInfo[0]?.active ? (
										<div className="row">
											{teamInfo.map(
												(team, teamInfoId) => (
													<div
														className="teamInfoStage col-lg-4 col-md-4"
														key={teamInfoId}
														// style={{
														// 	width: "100%",
														// 	height: "100%",
														// }}
													>
														<Card className="m-1">
															<div className="card-header align-items-center d-flex">
																<h4 className="card-title mb-0 flex-grow-1">
																	Team member{" "}
																	{teamInfoId +
																		1}
																</h4>
															</div>
															<CardBody>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Name
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					team.name
																				}
																			</span>
																		</div>
																	</div>
																</div>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Designation
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					team.designation
																				}
																			</span>
																		</div>
																	</div>
																</div>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Linkedin
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="breakWord font-size-12 fw-medium">
																				{
																					team.linkedin
																				}
																			</span>
																		</div>
																	</div>
																</div>
															</CardBody>
															<div className="actionBtn">
																<div className="d-flex align-items-center">
																	<div className="flex-grow-1">
																		<span className="font-size-16">
																			<button
																				type="button"
																				className="btn btn-soft-danger waves-effect waves-light"
																				onClick={(
																					e
																				) => {
																					e.preventDefault();
																					handleDeleteTeamInfo(
																						teamInfoId
																					);
																				}}
																			>
																				<i className="mdi mdi-trash-can d-block font-size-16 align-middle"></i>
																			</button>
																		</span>
																	</div>

																	<div className="flex-shrink-0">
																		<button
																			type="button"
																			className="btn btn-soft-success waves-effect waves-light"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				handleEditTeamInfo(
																					teamInfoId
																				);
																			}}
																		>
																			<i className="mdi mdi-pencil d-block font-size-16 align-middle"></i>
																		</button>
																	</div>
																</div>
															</div>
														</Card>
													</div>
												)
											)}
										</div>
									) : (
										<div className="text-center ">
											<span className="text-center text-muted">{`No Team`}</span>
										</div>
									)}
								</Col>
							</Row>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardHeader>
						<div className="d-flex flex-wrap align-items-center mb-4">
							<h5 className="card-title me-2">{"Tokenomics"}</h5>
							<button
								type="button"
								className="btn btn-soft-primary waves-effect waves-light"
								onClick={(e) => {
									e.preventDefault();
									handleAddNewTokenomic();
								}}
							>
								<i className="bx bx-plus font-size-16 align-middle"></i>
							</button>
						</div>
					</CardHeader>
					<CardBody>
						<div>
							<Row>
								<Col xs={12}>
									{tokenomicDetails[0]?.active ? (
										<div className="row">
											{tokenomicDetails.map(
												(
													tokenomicDetail,
													tokenomicDetailId
												) => (
													<div
														className="col-lg-4 teamInfoStage col-md-4 "
														key={tokenomicDetailId}
														// style={{
														// 	width: "100%",
														// 	height: "100%",
														// }}
													>
														<Card className="m-1">
															<div className="card-header align-items-center d-flex">
																<h4 className="card-title mb-0 flex-grow-1">
																	{" "}
																	{tokenomicDetailId +
																		1}
																</h4>
																{/* <div className="flex-shrink-0">
													<span className="font-size-12 fw-medium">
														{
															team.name
														}
													</span>
												</div> */}
															</div>
															<CardBody>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Name
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					tokenomicDetail.name
																				}
																			</span>
																		</div>
																	</div>
																</div>
																<div className="mt-0">
																	<div className="d-flex align-items-center">
																		<div className="flex-grow-1">
																			<span className="font-size-12">
																				Value
																				(%)
																			</span>
																		</div>

																		<div className="flex-shrink-0">
																			<span className="font-size-12 fw-medium">
																				{
																					tokenomicDetail.value
																				}
																			</span>
																		</div>
																	</div>
																</div>
															</CardBody>
															<div className="actionBtn">
																<div className="d-flex align-items-center">
																	<div className="flex-grow-1">
																		<span className="font-size-16">
																			<button
																				type="button"
																				className="btn btn-soft-danger waves-effect waves-light"
																				onClick={(
																					e
																				) => {
																					e.preventDefault();
																					handleDeleteTokenomic(
																						tokenomicDetailId
																					);
																				}}
																			>
																				<i className="mdi mdi-trash-can d-block font-size-16 align-middle"></i>
																			</button>
																		</span>
																	</div>

																	<div className="flex-shrink-0">
																		<button
																			type="button"
																			className="btn btn-soft-success waves-effect waves-light"
																			onClick={(
																				e
																			) => {
																				e.preventDefault();
																				handleEditTokenomic(
																					tokenomicDetailId
																				);
																			}}
																		>
																			<i className="mdi mdi-pencil d-block font-size-16 align-middle"></i>
																		</button>
																	</div>
																</div>
															</div>
														</Card>
													</div>
												)
											)}
										</div>
									) : (
										<div className="text-center ">
											<span className="text-center text-muted">{`No Tokenomics`}</span>
										</div>
									)}
								</Col>
							</Row>
						</div>
					</CardBody>
				</Card>

				<Card>
					<CardHeader>
						<div className="d-flex flex-wrap align-items-center mb-4">
							<h5 className="card-title me-2">{"White paper"}</h5>
						</div>
					</CardHeader>
					<CardBody>
						<div>
							<Row>
								<Col xs={12}>
									<div className="mb-3">
										<label
											htmlFor="basicpill-firstname-input"
											className="form-label"
										>
											Upload file
										</label>
										<Dropzone
											onDrop={(acceptedFiles) => {
												selectedFile(acceptedFiles);
											}}
											// validator={
											// 	nameLengthValidator
											// }
											accept="image/png, image/jpeg, image/webp, application/pdf"
											maxFiles={1}
										>
											{({
												getRootProps,
												getInputProps,
											}) => (
												<div className="dropzone">
													{
														<div
															className="dz-message needsclick mt-2"
															{...getRootProps()}
														>
															<input
																name="image"
																{...getInputProps()}
															/>
															<div className="mb-3">
																<i className="display-4 text-muted bx bxs-cloud-upload" />

																{whitepaper
																	.uploadFile
																	?.path ? (
																	<div className="dropzon-input">
																		<div className="imgBox">
																			<img
																				width="100px"
																				src={
																					whitepaper?.uploadFile
																						? URL.createObjectURL(
																								whitepaper.uploadFile
																						  )
																						: whitepaper.path
																				}
																				alt={
																					whitepaper
																						.uploadFile
																						?.path
																				}
																			/>
																		</div>
																		{
																			whitepaper
																				.uploadFile
																				?.path
																		}
																	</div>
																) : whitepaper?.url ? (
																	<div className="dropzon-input">
																		<div className="imgBox">
																			<img
																				width="200px"
																				src={
																					whitepaper.url
																				}
																				alt={
																					whitepaper.url
																				}
																			/>
																		</div>
																		{whitepaper.url.slice(
																			whitepaper.url.lastIndexOf(
																				"/"
																			) +
																				1
																		)}
																	</div>
																) : (
																	<h4>
																		click to
																		upload.
																	</h4>
																)}
															</div>
														</div>
													}
												</div>
											)}
										</Dropzone>
									</div>
								</Col>
							</Row>
						</div>
					</CardBody>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default TeamTokenomicWhitepaperInfoStepFour;
