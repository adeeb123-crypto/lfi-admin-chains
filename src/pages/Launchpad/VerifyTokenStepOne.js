import React from "react";
import { FormFeedback, FormText, Form, Input, Alert } from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import isEmpty from "../../utils/isEmpty";

const VerifyTokenStepOne = ({
	networkInfo,
	validationForFirstStep,
	getAddressTokenDetails,
	clearTokenResponse,
	launchpad,
	handleChangeNetwork,
	handleChangeCurrency,
	getCurrencyOption,
	getCurrencyName,
	details,
}) => {
	const animatedComponents = makeAnimated();
	return (
		<React.Fragment>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validationForFirstStep.handleSubmit();
					return false;
				}}
			>
				<fieldset disabled={!isEmpty(details?.launchPadDetails?._id)}>
					<div className="text-center mb-4">
						<h5>Verify Token</h5>
						<p className="card-title-desc">
							Enter the token address and verify
						</p>
					</div>

					<div className="row">
						<div className="text-center mb-4">
							{details?.launchPadDetails?._id && (
								<Alert
									className="alert-outline text-danger"
									color="danger"
								>
									Token already deployed you can not edit this
									section
								</Alert>
							)}
						</div>
					</div>

					<div className="mb-3">
						<label
							htmlFor="basicpill-vatno-input"
							className="form-label"
						>
							Network
						</label>
						<Input
							name="network"
							type="select"
							onChange={(e) => {
								validationForFirstStep.handleChange(e);
								handleChangeNetwork(e);
								if (
									launchpad.tokenDetailResponse?.errors !==
									undefined
								) {
									dispatch(clearTokenResponse());
								}
							}}
							onBlur={(e) => {
								getAddressTokenDetails();
								validationForFirstStep.handleBlur(e);
							}}
							value={validationForFirstStep.values.network || ""}
							invalid={
								validationForFirstStep.touched.network &&
								validationForFirstStep.errors.network
									? true
									: false
							}
						>
							<option value="" disabled>
								Select Network
							</option>
							{networkInfo &&
								networkInfo.map((network, index) => (
									<option
										key={`${index}network`}
										value={network.name}
									>
										{network.name}
									</option>
								))}
						</Input>
						{validationForFirstStep.touched.network &&
						validationForFirstStep.errors.network ? (
							<FormFeedback type="invalid">
								{validationForFirstStep.errors.network}
							</FormFeedback>
						) : null}
					</div>

					<div className="row">
						<div className="col-lg-12">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Token Address
								</label>
								<Input
									name="tokenAddress"
									type="text"
									onChange={(e) => {
										validationForFirstStep.handleChange(e);

										if (
											launchpad.tokenDetailResponse
												?.errors
										) {
											dispatch(clearTokenResponse());
										}
									}}
									onBlur={(e) => {
										getAddressTokenDetails();
										validationForFirstStep.handleBlur(e);
									}}
									value={
										validationForFirstStep.values
											.tokenAddress || ""
									}
									invalid={
										validationForFirstStep.touched
											.tokenAddress &&
										validationForFirstStep.errors
											.tokenAddress
											? true
											: launchpad.tokenDetailResponse
													?.errors &&
											  launchpad.tokenDetailResponse
													?.errors?.tokenAddress
											? true
											: false
									}
								/>
								<FormText
									color="primary"
									className="card-title-desc"
								>
									{`Pool creation fee: 1 BNB`}
								</FormText>
								{validationForFirstStep.touched.tokenAddress &&
								validationForFirstStep.errors.tokenAddress ? (
									<FormFeedback type="invalid">
										{
											validationForFirstStep.errors
												.tokenAddress
										}
									</FormFeedback>
								) : null}

								{launchpad.tokenDetailResponse?.errors &&
								launchpad.tokenDetailResponse?.errors
									?.tokenAddress ? (
									<FormFeedback type="invalid">
										{
											launchpad.tokenDetailResponse
												?.errors?.tokenAddress
										}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					{validationForFirstStep.values.tokenName && (
						<div className="row">
							<div className="col-lg-6">
								<div className="mb-3">
									<label
										htmlFor="basicpill-vatno-input"
										className="form-label"
									>
										Token Name
									</label>
									<Input
										name="tokenName"
										type="text"
										disabled
										value={
											validationForFirstStep.values
												.tokenName || ""
										}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="mb-3">
									<label
										htmlFor="basicpill-vatno-input"
										className="form-label"
									>
										Token Symbol
									</label>
									<Input
										name="tokenSymbol"
										type="text"
										disabled
										value={
											validationForFirstStep.values
												.tokenSymbol || ""
										}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="mb-3">
									<label
										htmlFor="basicpill-vatno-input"
										className="form-label"
									>
										Token Decimal
									</label>
									<Input
										name="tokenDecimal"
										type="text"
										disabled
										value={
											validationForFirstStep.values
												.tokenDecimal || ""
										}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="mb-3">
									<label
										htmlFor="basicpill-vatno-input"
										className="form-label"
									>
										Token TotalSupply
									</label>
									<Input
										name="tokenTotalSupply"
										type="text"
										disabled
										value={
											validationForFirstStep.values
												.tokenTotalSupply || ""
										}
									/>
								</div>
							</div>
						</div>
					)}

					<div className="row">
						<div className="col-lg-12">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Token Owner Address
								</label>
								<Input
									name="tokenOwnerAddress"
									type="text"
									onChange={
										validationForFirstStep.handleChange
									}
									onBlur={validationForFirstStep.handleBlur}
									value={
										validationForFirstStep.values
											.tokenOwnerAddress || ""
									}
									invalid={
										validationForFirstStep.touched
											.tokenOwnerAddress &&
										validationForFirstStep.errors
											.tokenOwnerAddress
											? true
											: false
									}
								/>
								<FormText
									color="primary"
									className="card-title-desc"
								>
									{`Raised fund will be send To this wallet address`}
								</FormText>
								{validationForFirstStep.touched
									.tokenOwnerAddress &&
								validationForFirstStep.errors
									.tokenOwnerAddress ? (
									<FormFeedback type="invalid">
										{
											validationForFirstStep.errors
												.tokenOwnerAddress
										}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="mb-3">
							<label className="control-label">Currency</label>
							<Select
								name="currency"
								value={
									validationForFirstStep.values.currency || ""
								}
								onChange={(value, action) => {
									handleChangeCurrency(value, action);
								}}
								isMulti={true}
								options={getCurrencyOption}
								classNamePrefix="select2-selection"
								onSelectResetsInput={true}
								closeMenuOnSelect={true}
								components={animatedComponents}
								isDisabled={
									!isEmpty(details?.launchPadDetails?._id)
								}
							/>
							<FormText
								color="primary"
								className="card-title-desc"
							>
								{`Users will pay with ${getCurrencyName} for your token`}
							</FormText>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-12">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Fee(%)
								</label>
								<Input
									name="fee"
									type="text"
									onChange={(e) => {
										e.target.value = e.target.value.match(
											/^([0-9]{1,})?(\.)?([0-9]{1,})?$/
										)
											? e.target.value.match(
													/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
											  )[0]
											: validationForFirstStep.values
													.fee || "";
										validationForFirstStep.handleChange(e);
									}}
									onBlur={validationForFirstStep.handleBlur}
									value={
										validationForFirstStep.values.fee || ""
									}
									invalid={
										validationForFirstStep.touched.fee &&
										validationForFirstStep.errors.fee
											? true
											: false
									}
								/>
								{validationForFirstStep.touched.fee &&
								validationForFirstStep.errors.fee ? (
									<FormFeedback type="invalid">
										{validationForFirstStep.errors.fee}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					{/* <div className="row">
																					<div className="mb-3">
																						<label
																							htmlFor="basicpill-vatno-input"
																							className="form-label"
																						>
																							Fee
																							Options
																						</label>
																						<Input
																							name="feeOption"
																							type="select"
																							onChange={(
																								e
																							) => {
																								validationForFirstStep.handleChange(
																									e
																								);
																							}}
																							onBlur={
																								validationForFirstStep.handleBlur
																							}
																							value={
																								validationForFirstStep
																									.values
																									.feeOption ||
																								""
																							}
																							invalid={
																								validationForFirstStep
																									.touched
																									.feeOption &&
																								validationForFirstStep
																									.errors
																									.feeOption
																									? true
																									: false
																							}
																						>
																							<option
																								value=""
																								disabled
																							>
																								Select
																								Fee
																								option
																							</option>
																							{currencyFeeOptions &&
																								currencyFeeOptions.map(
																									(
																										fee,
																										index
																									) => (
																										<option
																											key={`${index}fee`}
																											value={
																												fee.fee
																											}
																										>
																											{
																												fee.description
																											}
																										</option>
																									)
																								)}
																						</Input>
																						{validationForFirstStep
																							.touched
																							.feeOption &&
																						validationForFirstStep
																							.errors
																							.feeOption ? (
																							<FormFeedback type="invalid">
																								{
																									validationForFirstStep
																										.errors
																										.feeOption
																								}
																							</FormFeedback>
																						) : null}
																					</div>
																				</div> */}

					<div className="row">
						<div className="col-lg-12">
							<div className="mb-3">
								<label
									htmlFor="basicpill-vatno-input"
									className="form-label"
								>
									Claim Option
								</label>
								<Input
									name="listingOption"
									type="select"
									onChange={
										validationForFirstStep.handleChange
									}
									onBlur={validationForFirstStep.handleBlur}
									value={
										validationForFirstStep.values
											.listingOption || ""
									}
									invalid={
										validationForFirstStep.touched
											.listingOption &&
										validationForFirstStep.errors
											.listingOption
											? true
											: false
									}
								>
									<option value="" disabled>
										Select option
									</option>
									<option value={"automatic"}>
										Auto Listing
									</option>
									<option value={"manual"}>
										Manual Listing
									</option>
								</Input>
								{validationForFirstStep.touched.listingOption &&
								validationForFirstStep.errors.listingOption ? (
									<FormFeedback type="invalid">
										{
											validationForFirstStep.errors
												.listingOption
										}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="text-center mb-4">
							{validationForFirstStep.values.listingOption && (
								<Alert
									className="alert-outline text-primary"
									color="warning"
								>
									{validationForFirstStep.values
										.listingOption === "automatic"
										? "For auto listing, after you finalize the pool your token will be auto listed on DEX."
										: "For manual listing, won't charge tokens for liquidity You may withdraw BNB after the pool ends then do DEX listing yourself."}
								</Alert>
							)}
						</div>
					</div>
				</fieldset>
			</Form>
		</React.Fragment>
	);
};

export default VerifyTokenStepOne;
