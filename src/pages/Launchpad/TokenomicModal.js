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

const TokenomicModal = ({
	tokenomicModalDetails,
	toggleTokenomicModal,
	validationForTokenomicStep,
	couldHaveAddUpdatePermission,
}) => {
	return (
		<React.Fragment>
			<Modal
				isOpen={tokenomicModalDetails.active}
				size="lg"
				centered={true}
			>
				<ModalHeader
					toggle={() => {
						toggleTokenomicModal({
							...tokenomicModalDetails,
							active: !tokenomicModalDetails.active,
						});
						validationForTokenomicStep.resetForm();
					}}
					tag="h4"
				>
					{tokenomicModalDetails.action === "edit" ? "Edit" : "Add"}
				</ModalHeader>
				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validationForTokenomicStep.handleSubmit();
							return false;
						}}
					>
						<fieldset disabled={!couldHaveAddUpdatePermission()}>
							<div className="row">
								<div className="row">
									<div className="col-lg-12">
										<div className="mb-3">
											<label className="control-label">
												Name
											</label>

											<Input
												name="name"
												type="text"
												onChange={
													validationForTokenomicStep.handleChange
												}
												onBlur={
													validationForTokenomicStep.handleBlur
												}
												value={
													validationForTokenomicStep
														.values.name || ""
												}
												invalid={
													validationForTokenomicStep
														.touched.name &&
													validationForTokenomicStep
														.errors.name
														? true
														: false
												}
											/>

											{validationForTokenomicStep.touched
												.name &&
											validationForTokenomicStep.errors
												.name ? (
												<FormFeedback type="invalid">
													{
														validationForTokenomicStep
															.errors.name
													}
												</FormFeedback>
											) : null}
										</div>
									</div>

									<div className="col-lg-12">
										<div className="mb-3">
											<label className="control-label">
												Value (%)
											</label>

											<Input
												name="value"
												type="text"
												onChange={
													validationForTokenomicStep.handleChange
												}
												onBlur={
													validationForTokenomicStep.handleBlur
												}
												value={
													validationForTokenomicStep
														.values.value || ""
												}
												invalid={
													validationForTokenomicStep
														.touched.value &&
													validationForTokenomicStep
														.errors.value
														? true
														: false
												}
											/>

											{validationForTokenomicStep.touched
												.value &&
											validationForTokenomicStep.errors
												.value ? (
												<FormFeedback type="invalid">
													{
														validationForTokenomicStep
															.errors.value
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

export default TokenomicModal;
