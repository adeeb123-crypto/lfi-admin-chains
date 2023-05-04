import React from "react";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
const DeployDetailModal = ({ deployDetails, handleToggleDeployDetails }) => {
	return (
		<React.Fragment>
			<Modal
				isOpen={deployDetails.isOpenModal ?? false}
				size="lg"
				centered={true}
			>
				<ModalHeader
					toggle={() => {
						handleToggleDeployDetails({});
					}}
					tag="h4"
				>
					{"Deploy Response details"}
				</ModalHeader>
				<ModalBody>
					<div>
						<PerfectScrollbar style={{ height: "550px" }}>
							<pre>
								{JSON.stringify(deployDetails.details, null, 2)}
							</pre>
						</PerfectScrollbar>
					</div>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default DeployDetailModal;
