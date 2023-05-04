import React, { useMemo, useRef, useState, useEffect } from "react";
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
import DeployDetailModal from "./DeployDetailModal";
import { toast } from "react-toastify";
import { wsUrl } from "../../config";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { getContinueLaunchpadDeployHistory } from "../../store/launchpad/actions";

const DeployInfoModal = ({
	deployInfo,
	isDeploying,
	handleDeployAllStep,
	// lauchpadDeployHistory,
	handleDeployLunchpad,
	deployDetails,
	setDeployDetails,
	handleDeployUpdatedStage,
	updatedLaunchpadStages,
}) => {
	const reactTooltipRefs = useRef([]);
	const dispatch = useDispatch();
	const [historySocketIO, setHistorySocketIO] = useState(null);
	const { lauchpadDeployHistory } = useSelector((state) => ({
		lauchpadDeployHistory: state.launchpad.lauchpadDeployHistory,
	}));
	const { launchpad } = deployInfo;
	const launchPadDeployHistory = !isEmpty(lauchpadDeployHistory)
		? lauchpadDeployHistory
		: launchpad.launchPadDeployHistory;

	const isDeployAll = useMemo(() => {
		const stages = updatedLaunchpadStages ?? launchpad?.stages ?? [];
		let isDeploy = true;
		for (let i = 0; i < stages?.length; i++) {
			const stageNumber = stages[i].stageNumber;
			const stageDeployHistory =
				launchPadDeployHistory?.stageDetails?.find(
					(stageHistoryDetail) =>
						parseInt(stageHistoryDetail.stage) ===
						parseInt(stageNumber)
				);
			if (
				isEmpty(stageDeployHistory) ||
				stageDeployHistory?.isDone === false
			) {
				isDeploy = false;
				break;
			}
			if (
				stages[i].status === "pending" &&
				stages[i].isDeplorable === true
			) {
				isDeploy = false;
				break;
			}
		}
		return isDeploy;
	}, [lauchpadDeployHistory, launchpad]);

	const connnectSocketIo = () => {
		const socket = io(wsUrl, { path: "/launchpad-history/" });
		socket.on("connect", () => {
			setHistorySocketIO(socket);
		});
		socket.on("launchpad history", (data) => {
			dispatch(getContinueLaunchpadDeployHistory(data));
		});
		socket.on("disconnect", (reason) => {
			console.log(`socket io disconnect reason: -- ${reason}`);
			if (reason === "io server disconnect") {
				socket.connect();
			}
		});
	};

	useEffect(() => {
		connnectSocketIo();
		return () => {
			historySocketIO?.disconnect();
			historySocketIO?.close();
		};
	}, [setHistorySocketIO]);

	useEffect(() => {
		let timer = setInterval(() => {
			if (historySocketIO) {
				historySocketIO.emit("launchpad history", {
					_id: launchpad._id,
				});
			}
		}, 1000);
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [historySocketIO, launchpad._id]);

	const handleToggleDeployDetails = (data) => {
		setDeployDetails({
			isOpenModal: !deployDetails.isOpenModal,
			details: data,
		});
	};

	return (
		<React.Fragment>
			{deployDetails?.isOpenModal && (
				<DeployDetailModal
					handleToggleDeployDetails={handleToggleDeployDetails}
					deployDetails={deployDetails}
				/>
			)}
			<Modal isOpen={deployInfo.isOpenModal} size="lg" centered={true}>
				<ModalHeader
					toggle={() => {
						if (isDeploying === false) {
							historySocketIO?.disconnect();
							historySocketIO?.close();
							handleDeployLunchpad({});
						} else {
							toast.error("You can't close.");
						}
					}}
					tag="h4"
				>
					{"Launchpad deployment details"}
				</ModalHeader>
				<ModalBody>
					<Card>
						{/* Render Email Top Tool Bar */}
						<div
							className="text-end btn-toolbar p-3"
							role="toolbar"
						>
							<div className="btn-group me-2 mb-2 mb-sm-0">
								<Button
									type="button"
									color="primary"
									className="waves-light waves-effect"
									disabled={
										isDeploying || isDeployAll === true
									}
									onClick={(e) => {
										e.preventDefault();
										handleDeployAllStep({
											_id: launchpad._id,
										});
									}}
								>
									{isDeploying ? (
										<>
											<i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
											{"Loading"}
										</>
									) : isDeployAll ? (
										"Done"
									) : launchPadDeployHistory?.deployDetails
											?.isDone === true ? (
										"Deploy Remaing All"
									) : (
										"Deploy All"
									)}
								</Button>
							</div>
						</div>

						{launchpad?._id && (
							<div className="table-responsive">
								<Table className="table table-borderless mb-0">
									<thead></thead>
									<tbody>
										<tr>
											<td className="">
												<p className="mt-2">
													Deploy Token
												</p>
											</td>
											<td></td>
											<td>
												{!isEmpty(
													launchPadDeployHistory
														?.deployDetails?.message
												) && (
													<div
														style={{
															cursor: "pointer",
														}}
														className={`mt-2 badge badge-soft-${
															launchPadDeployHistory
																?.deployDetails
																?.isDone ===
															true
																? "success"
																: "danger"
														} font-size-12`}
														onClick={(e) => {
															e.preventDefault();
															handleToggleDeployDetails(
																launchPadDeployHistory?.deployDetails
															);
														}}
													>
														click here to view
														details
													</div>
												)}
											</td>
											<td></td>
											<td>
												<div className="mt-2">
													{launchPadDeployHistory
														?.deployDetails
														?.isDone ? (
														<div
															className="badge badge-soft-success font-size-12"
															// style={{
															// 	cursor: "pointer",
															// }}
														>
															Deployed
														</div>
													) : launchPadDeployHistory
															?.deployDetails
															?.message ? (
														<div className="badge badge-soft-danger font-size-12">
															Error
														</div>
													) : (
														<>
															{launchPadDeployHistory
																?.deployDetails
																?.isStarted ===
															true ? (
																<i className="bx bx-loader text-primary bx-spin font-size-16 text-center align-middle"></i>
															) : (
																<div className="badge badge-soft-warning font-size-12">
																	Pending
																</div>
															)}
														</>
													)}
												</div>
											</td>
										</tr>

										<tr>
											<td className="">
												<p className="mt-2">
													Approve total liquidity
												</p>
											</td>
											<td></td>
											<td>
												{!isEmpty(
													launchPadDeployHistory
														?.liquidityDetails
														?.message
												) && (
													<div
														style={{
															cursor: "pointer",
														}}
														className={`mt-2 badge badge-soft-${
															launchPadDeployHistory
																?.liquidityDetails
																?.isDone ===
															true
																? "success"
																: "danger"
														} font-size-12`}
														onClick={(e) => {
															e.preventDefault();
															handleToggleDeployDetails(
																launchPadDeployHistory?.liquidityDetails
															);
														}}
													>
														click here to view
														details
													</div>
												)}
											</td>
											<td></td>
											<td>
												<div className="mt-2">
													{launchPadDeployHistory
														?.liquidityDetails
														?.isDone ? (
														<div
															className="badge badge-soft-success font-size-12"
															// style={{
															// 	cursor: "pointer",
															// }}
														>
															Deployed
														</div>
													) : launchPadDeployHistory
															?.liquidityDetails
															?.message ? (
														<div className="badge badge-soft-danger font-size-12">
															Error
														</div>
													) : (
														<>
															{launchPadDeployHistory
																?.liquidityDetails
																?.isStarted ===
															true ? (
																<i className="bx bx-loader text-primary bx-spin font-size-16 text-center align-middle"></i>
															) : (
																<div className="badge badge-soft-warning font-size-12">
																	Pending
																</div>
															)}
														</>
													)}
												</div>
											</td>
										</tr>

										{launchpad.stages.map((stage) => {
											const stageHistory =
												launchPadDeployHistory?.stageDetails?.find(
													(stageHistoryDetail) =>
														parseInt(
															stageHistoryDetail.stage
														) ===
														parseInt(
															stage.stageNumber
														)
												);

											{
												/* let prevStageHistory =
												stage.stageNumber === 0
													? {}
													: launchPadDeployHistory?.stageDetails?.find(
															(
																stageHistoryDetail
															) =>
																parseInt(
																	stageHistoryDetail.stage
																) ===
																parseInt(
																	stage.stageNumber -
																		1
																)
													  ); */
											}
											return (
												<tr key={stage.stageNumber}>
													<td className="">
														<p className="mt-2">
															{`Stage ${stage.stageNumber} - ${stage.stage}`}
														</p>
													</td>
													<td></td>
													<td>
														{!isEmpty(
															stageHistory?.message
														) && (
															<div
																className={`mt-2 badge badge-soft-${
																	stageHistory?.isDone ===
																	true
																		? "success"
																		: "danger"
																} font-size-12`}
																style={{
																	cursor: "pointer",
																}}
																onClick={(
																	e
																) => {
																	e.preventDefault();
																	handleToggleDeployDetails(
																		stageHistory
																	);
																}}
															>
																click here to
																view details
															</div>
														)}
													</td>
													<td></td>
													<td>
														<div className="mt-2">
															{stageHistory?.isDone ===
															true ? (
																stage.status ===
																	"pending" &&
																stage.isDeplorable ===
																	true ? (
																	<button
																		type="button"
																		color="primary"
																		className="btn btn-sm btn-primary waves-effect waves-light"
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			handleDeployUpdatedStage(
																				{
																					_id: launchpad._id,
																					stageNumber:
																						stage.stageNumber,
																				}
																			);
																		}}
																	>
																		Deploy
																		Again
																	</button>
																) : (
																	<div className="badge badge-soft-success font-size-12">
																		Deployed
																	</div>
																)
															) : !isEmpty(
																	stageHistory?.message
															  ) ? (
																stage.status ===
																	"pending" &&
																stage.isDeplorable ===
																	true ? (
																	<button
																		type="button"
																		color="primary"
																		className="btn btn-sm btn-primary waves-effect waves-light"
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			handleDeployUpdatedStage(
																				{
																					_id: launchpad._id,
																					stageNumber:
																						stage.stageNumber,
																				}
																			);
																		}}
																	>
																		Deploy
																		Again
																	</button>
																) : (
																	<div className="badge badge-soft-danger font-size-12">
																		Error
																	</div>
																)
															) : (
																<>
																	{stageHistory?.isStarted ===
																	true ? (
																		<i className="bx bx-loader text-primary bx-spin font-size-16 text-center align-middle"></i>
																	) : (
																		<div className="badge badge-soft-warning font-size-12">
																			Pending
																		</div>
																	)}
																</>
															)}
														</div>
													</td>
													{/* <td> */}
													{/* {!isEmpty(
															stageHistory?.message
														) && (
															<div
																style={{
																	cursor: "pointer",
																}}
																className={`mt-2 badge badge-soft-${
																	stageHistory?.isDone ===
																	true
																		? "success"
																		: "danger"
																} font-size-12`}
															>
																click here to
																view details
															</div>
														)} */}
													{/* </td> */}
													{/* <td>
														{stageHistory?.isDone ===
														true ? (
															<button
																type="button"
																className="btn btn-success waves-effect waves-light"
															>
																<i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "}
																Success
															</button>
														) : !isEmpty(
																stageHistory?.message
														  ) ? (
															<button
																type="button"
																color="primary"
																className="btn btn-primary waves-effect waves-light"
																disabled={
																	prevStageHistory?.isDone ===
																	true
																		? false
																		: true
																}
															>
																{stageHistory?.isStarted ===
																true ? (
																	<>
																		<i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
																		{
																			"Loading"
																		}
																	</>
																) : (
																	"Deploy"
																)}
															</button>
														) : (
															<button
																color="primary"
																type="button"
																className="btn m-0 btn-primary waves-effect waves-light"
																disabled={
																	prevStageHistory?.isDone ===
																	true
																		? false
																		: true
																}
															>
																{stageHistory?.isStarted ===
																true ? (
																	<>
																		<i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
																		{
																			"Loading"
																		}
																	</>
																) : (
																	"Deploy"
																)}
															</button>
														)}
													</td> */}
												</tr>
											);
										})}
									</tbody>
								</Table>
							</div>
						)}
					</Card>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default DeployInfoModal;
