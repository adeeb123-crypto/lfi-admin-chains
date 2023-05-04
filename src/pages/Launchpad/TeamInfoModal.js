import React from "react";
import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
	Form,
	Input,
} from "reactstrap";
import "../../assets/scss/launchpad.scss";
import Dropzone from "react-dropzone";
import { apiUrl } from "../../config";

const TeamInfoModal = ({
	teamInfoModalDetails,
	toggleTeamInfoModal,
	validationForTeamInfoStep,
	selectedTeamFile,
}) => {
	return (
		<React.Fragment>
			<Modal
				isOpen={teamInfoModalDetails.active}
				size="lg"
				centered={true}
			>
				<ModalHeader
					toggle={() => {
						toggleTeamInfoModal({
							...teamInfoModalDetails,
							active: !teamInfoModalDetails.active,
						});
						validationForTeamInfoStep.resetForm();
					}}
					tag="h4"
				>
					{teamInfoModalDetails.action === "edit"
						? "Edit Team"
						: "Add Team"}
				</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validationForTeamInfoStep.handleSubmit();
							return false;
						}}
					>
						<fieldset>
							<div className="row">
								<div className="row">
									<div className="col-lg-12">
										<div className="mb-3">
											<label
												htmlFor="basicpill-firstname-input"
												className="form-label"
											>
												Upload Image
											</label>
											<Dropzone
												onDrop={(acceptedFiles) => {
													selectedTeamFile(
														acceptedFiles
													);
												}}
												// validator={
												// 	nameLengthValidator
												// }
												accept="image/png, image/jpeg, image/webp"
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

																	{validationForTeamInfoStep
																		.values
																		.image
																		?.path ? (
																		<div className="dropzon-input">
																			<div className="imgBox">
																				<img
																					width="100px"
																					src={
																						validationForTeamInfoStep
																							.values
																							.image
																							? URL.createObjectURL(
																									validationForTeamInfoStep
																										.values
																										.image
																							  )
																							: validationForTeamInfoStep
																									.values
																									.image
																									?.path
																					}
																					alt={
																						validationForTeamInfoStep
																							.values
																							.image
																							?.path
																					}
																				/>
																			</div>
																			{
																				validationForTeamInfoStep
																					.values
																					.image
																					?.path
																			}
																		</div>
																	) : validationForTeamInfoStep
																			.values
																			?.url ? (
																		<div className="dropzon-input">
																			<div className="imgBox">
																				<img
																					width="100px"
																					src={
																						apiUrl +
																						validationForTeamInfoStep
																							.values
																							.url
																					}
																					alt={
																						apiUrl +
																						validationForTeamInfoStep
																							.values
																							.url
																					}
																				/>
																			</div>
																			{validationForTeamInfoStep.values.url.slice(
																				validationForTeamInfoStep.values.url.lastIndexOf(
																					"/"
																				) +
																					1
																			)}
																		</div>
																	) : (
																		<h4>
																			click
																			to
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
									</div>

									<div className="col-lg-12">
										<div className="mb-3">
											<label className="control-label">
												Name
											</label>

											<Input
												name="name"
												type="text"
												onChange={
													validationForTeamInfoStep.handleChange
												}
												onBlur={
													validationForTeamInfoStep.handleBlur
												}
												value={
													validationForTeamInfoStep
														.values.name || ""
												}
												invalid={
													validationForTeamInfoStep
														.touched.name &&
													validationForTeamInfoStep
														.errors.name
														? true
														: false
												}
											/>

											{validationForTeamInfoStep.touched
												.name &&
											validationForTeamInfoStep.errors
												.name ? (
												<FormFeedback type="invalid">
													{
														validationForTeamInfoStep
															.errors.name
													}
												</FormFeedback>
											) : null}
										</div>
									</div>

									<div className="col-lg-12">
										<div className="mb-3">
											<label className="control-label">
												Designation
											</label>

											<Input
												name="designation"
												type="text"
												onChange={
													validationForTeamInfoStep.handleChange
												}
												onBlur={
													validationForTeamInfoStep.handleBlur
												}
												value={
													validationForTeamInfoStep
														.values.designation ||
													""
												}
												invalid={
													validationForTeamInfoStep
														.touched.designation &&
													validationForTeamInfoStep
														.errors.designation
														? true
														: false
												}
											/>

											{validationForTeamInfoStep.touched
												.designation &&
											validationForTeamInfoStep.errors
												.designation ? (
												<FormFeedback type="invalid">
													{
														validationForTeamInfoStep
															.errors.designation
													}
												</FormFeedback>
											) : null}
										</div>
									</div>

									<div className="col-lg-12">
										<div className="mb-3">
											<label className="control-label">
												Linkedin
											</label>

											<Input
												name="linkedin"
												type="text"
												onChange={
													validationForTeamInfoStep.handleChange
												}
												onBlur={
													validationForTeamInfoStep.handleBlur
												}
												value={
													validationForTeamInfoStep
														.values.linkedin || ""
												}
												invalid={
													validationForTeamInfoStep
														.touched.linkedin &&
													validationForTeamInfoStep
														.errors.linkedin
														? true
														: false
												}
											/>

											{validationForTeamInfoStep.touched
												.linkedin &&
											validationForTeamInfoStep.errors
												.linkedin ? (
												<FormFeedback type="invalid">
													{
														validationForTeamInfoStep
															.errors.linkedin
													}
												</FormFeedback>
											) : null}
										</div>
									</div>
								</div>

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

export default TeamInfoModal;
