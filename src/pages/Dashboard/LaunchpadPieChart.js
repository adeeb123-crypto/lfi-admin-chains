import React, {
	useEffect,
	useState,
	useCallback,
	useRef,
	useMemo,
} from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import {
	clearResponse,
	getTotalLaunchpad,
} from "../../store/dashboard/actions";
import { useSelector, useDispatch } from "react-redux";

const LaunchpadPieChart = () => {
	const dispatch = useDispatch();
	const { totalLunchpadInfo } = useSelector((state) => ({
		totalLunchpadInfo: state.dashboard.totalLunchpadInfo,
	}));

	const getGraphOptions = useMemo(() => {
		const options = {
			chart: {
				width: 227,
				height: 227,
				type: "pie",
			},
			labels: ["Live", "Upcoming", "Draft", "Finished"],
			colors: ["#2ab57d", "#4ba6ef", "#ffbf53", "#fd625e"],
			stroke: {
				width: 0,
			},
			legend: {
				show: false,
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
					},
				},
			],
		};
		return options;
	}, [totalLunchpadInfo.details]);

	const getGraphDetails = useMemo(() => {
		let graphValues = [0, 0, 0, 0];
		if (totalLunchpadInfo.details) {
			graphValues = ["live", "pending", "draft", "finished"].map(
				(item) => {
					return totalLunchpadInfo.details[item]
						? parseFloat(
								(totalLunchpadInfo.details[item] /
									totalLunchpadInfo.details.total) *
									100
						  ) ?? 0
						: 0;
				}
			);
		}
		return graphValues;
	}, [totalLunchpadInfo.details]);

	useEffect(() => {
		dispatch(getTotalLaunchpad());
	}, []);

	return (
		<React.Fragment>
			<Col xl={5}>
				<Card className="card-h-100">
					<CardBody>
						<div className="d-flex flex-wrap align-items-center mb-4">
							<h5 className="card-title me-2">Launchpad</h5>
						</div>

						<Row className="align-items-center">
							<div className="col-sm">
								<div
									id="wallet-balance"
									className="apex-charts"
								>
									<ReactApexChart
										options={getGraphOptions}
										series={getGraphDetails}
										type="pie"
										height="227"
									/>
								</div>
							</div>
							<div className="col-sm align-self-center">
								<div className="mt-4 mt-sm-0">
									<div>
										<p className="mb-2">
											<i className="mdi mdi-circle align-middle font-size-10 me-2 text-success"></i>{" "}
											Live{"    "}
											<span className="badge badge-soft-success font-size-10 font-weight-bold rounded-pill bg-soft-success float-end">
												{totalLunchpadInfo.details
													?.live ?? 0}
											</span>
										</p>
									</div>

									<div className="mt-1 pt-2">
										<p className="mb-2">
											<i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary"></i>{" "}
											Upcoming{"    "}
											<span className="badge badge-soft-primary font-size-10 rounded-pill bg-soft-primary float-end">
												{totalLunchpadInfo.details
													?.pending ?? 0}
											</span>
										</p>
									</div>

									<div className="mt-1 pt-2">
										<p className="mb-2">
											<i className="mdi mdi-circle align-middle font-size-10 me-2 text-warning"></i>{" "}
											Draft{"    "}
											<span className="badge badge-soft-warning font-size-10 rounded-pill bg-soft-warning float-end">
												{totalLunchpadInfo.details
													?.draft ?? 0}
											</span>
										</p>
									</div>
									<div className="mt-1 pt-2">
										<p className="mb-2">
											<i className="mdi mdi-circle align-middle font-size-10 me-2 text-danger"></i>{" "}
											Finished{"    "}
											<span className="badge badge-soft-danger font-size-10 rounded-pill bg-soft-danger float-end">
												{totalLunchpadInfo.details
													?.finished ?? 0}
											</span>
										</p>
									</div>
								</div>
							</div>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</React.Fragment>
	);
};

export default LaunchpadPieChart;
