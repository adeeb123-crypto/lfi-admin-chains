import React, { useMemo, useRef } from "react";
import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
	Form,
	Input,
	Card,
	Button,
	Label,
	Table,
} from "reactstrap";
import "../../assets/scss/launchpad.scss";
import isEmpty from "../../utils/isEmpty";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
const ListingStageInfo = ({
	handleListingStageInfo,
	listingStageInfo,
	stageDetails,
	handleEditStage,
	handleAddNewStage,
	handleToggleStageSwap,
}) => {
	return (
		<React.Fragment>
			<Modal
				isOpen={listingStageInfo.isOpenModal ?? false}
				size="md"
				centered={true}
			>
				<ModalHeader
					toggle={() => {
						handleListingStageInfo({});
					}}
					tag="h4"
				>
					{"Stages"}{" "}
					<button
						id={"stageReactTooltipCreate"}
						data-tooltip-content="Click to add new stage"
						type="button"
						className="btn btn-soft-primary waves-effect waves-light"
						onClick={(e) => {
							e.preventDefault();
							handleAddNewStage(true);
						}}
					>
						<i className="bx bx-plus font-size-16 align-middle"></i>
						Add new stage
					</button>
					<ReactTooltip
						anchorId="stageReactTooltipCreate"
						variant="info"
						place="bottom"
						style={{
							zIndex: 2147483647,
						}}
					/>
				</ModalHeader>
				<ModalBody>
					<div>
						{stageDetails?.[0] && (
							<div className="table-responsive">
								<Table className="table table-borderless mb-0">
									<thead></thead>
									<tbody>
										{stageDetails?.map((stage, idx) => {
											return (
												<tr key={`keyTr${idx}`}>
													<td className="">
														<p className="mt-2">
															{`Stage ${stage.stageNumber} - ${stage.stage}`}
														</p>
													</td>
													<td></td>
													<td>
														{stage.status ===
														"finished" ? (
															<button
																disabled={true}
																type="button"
																className="m-1 btn btn-sm btn-danger waves-effect waves-light"
															>
																Finished
															</button>
														) : (
															<button
																id={`stageEditTooltip${idx}`}
																type="button"
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	handleEditStage(
																		idx,
																		true
																	);
																}}
																className="m-1 btn btn-sm btn-primary waves-effect waves-light"
															>
																<i className="bx bx-edit-alt font-size-16 align-middle me-2"></i>{" "}
																Edit
															</button>
														)}

														<ReactTooltip
															anchorId={`stageEditTooltip${idx}`}
															variant="info"
															place="bottom"
															content="Click to edit stage"
															style={{
																zIndex: 2147483647,
															}}
														/>
													</td>
													<td></td>
													<td>
														<div className="text-center">
															<div
																id={`stageToggleSwapTooltip${idx}`}
																className="m-1 square-switch"
															>
																<Input
																	className=""
																	type="checkbox"
																	id={`active-stage-${stage.stageNumber}`}
																	switch={
																		stage.status !==
																		"draft"
																			? "Info"
																			: "default"
																	}
																	checked={
																		stage.isSwapEnable
																	}
																	disabled={
																		stage.status ===
																		"draft"
																			? true
																			: false
																	}
																	onClick={(
																		e
																	) => {
																		e.preventDefault();
																		handleToggleStageSwap(
																			{
																				stageNumber:
																					stage.stageNumber,
																				isSwapEnable:
																					stage.isSwapEnable,
																			}
																		);
																	}}
																	onChange={(
																		e
																	) => {
																		e.preventDefault();
																		handleToggleStageSwap(
																			{
																				stageNumber:
																					stage.stageNumber,
																				isSwapEnable:
																					stage.isSwapEnable,
																			}
																		);
																	}}
																/>
																<Label
																	htmlFor={`active-stage-${stage.stageNumber}`}
																	data-on-label="Yes"
																	data-off-label="No"
																></Label>
																<ReactTooltip
																	anchorId={`stageToggleSwapTooltip${idx}`}
																	variant="info"
																	place="bottom"
																	style={{
																		zIndex: 2147483647,
																	}}
																	content={`${
																		stage.status ===
																		"draft"
																			? "stage not deploy yet"
																			: stage.isSwapEnable ===
																			  true
																			? "click to disable swap"
																			: "click to enable swap"
																	}`}
																/>
															</div>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							</div>
						)}
					</div>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default ListingStageInfo;
