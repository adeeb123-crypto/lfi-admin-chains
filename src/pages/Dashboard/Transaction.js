import React, { useMemo, useRef, useState, useEffect } from "react";
import { CardBody, Table } from "reactstrap";
import { wsUrl } from "../../config";
import { io } from "socket.io-client";
import moment from "moment";

const Transactions = () => {
	const [transactions, setTransaction] = useState([]);
	const [historySocketIO, setHistorySocketIO] = useState(null);
	const connnectSocketIo = () => {
		const socket = io(wsUrl, {
			path: "/transaction/",
		});
		socket.on("connect", () => {
			setHistorySocketIO(socket);
		});
		socket.on("transactions", (data) => {
			setTransaction(data);
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
				historySocketIO.emit("transactions", {});
			}
		}, 1000);
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [historySocketIO]);
	return (
		<React.Fragment>
			<div className="col-xl-12">
				<div className="card">
					<div className="card-header align-items-center d-flex">
						<h4 className="card-title mb-0 flex-grow-1">
							Recent Transactions
						</h4>
						<div className="flex-shrink-0"></div>
					</div>

					<CardBody className="px-0">
						<div className="table-responsive">
							<Table className="align-middle mb-0">
								<thead>
									<tr>
										<th>Token Name</th>
										<th>Amount</th>
										<th>Currency</th>
										<th>Currency Amount</th>
										<th>Transaction ID</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{transactions &&
										transactions.map((transaction) => (
											<tr key={transaction._id}>
												<td>
													{
														transaction.launchPadTokenName
													}
												</td>
												<td>{transaction.price}</td>
												<td>{transaction.currency}</td>
												<td>{transaction.amount}</td>
												<td>
													{transaction.transactionID}
												</td>
												<td>
													{moment(
														transaction.createdAt
													).format("LLL")}
												</td>
											</tr>
										))}
								</tbody>
							</Table>
						</div>
					</CardBody>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Transactions;
