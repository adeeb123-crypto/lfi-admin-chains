import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@mui/material";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import error from "../assets/images/error-img.png";

class PermissionModal extends Component {
	state = {
		isModalOpen: true,
	};

	closeDialog = () => {
		this.setState({ isModalOpen: false });
		this.props.history.push("/dashboard");
	};

	render() {
		return (
			<React.Fragment>
				<Dialog
					open={this.state.isModalOpen}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth={true}
					maxWidth="md"
					disableEnforceFocus={true}
					onClose={(event, reason) => {
						if (
							reason !== "backdropClick" &&
							reason !== "escapeKeyDown"
						) {
							this.closeDialog();
						}
					}}
				>
					<DialogContent>
						<div className="my-5 pt-5">
							<Container>
								<Row>
									<Col lg={12}>
										<div className="text-center mb-5">
											<h1 className="display-1 fw-semibold">
												4
												<span className="text-primary mx-2">
													0
												</span>
												1
											</h1>
											<h4 className="text-uppercase">
												You do not have permission to
												access this page.
											</h4>
											<div className="mt-5 text-center">
												<Link
													className="btn btn-primary"
													to="/dashboard"
												>
													Back to Dashboard
												</Link>
											</div>
										</div>
									</Col>
								</Row>
								<div className="row justify-content-center">
									<div className="col-md-10 col-xl-8">
										<div>
											<img
												src={error}
												alt=""
												className="img-fluid"
											/>
										</div>
									</div>
								</div>
							</Container>
						</div>
					</DialogContent>
				</Dialog>
			</React.Fragment>
		);
	}
}

PermissionModal.propTypes = {
	history: PropTypes.object.isRequired,
};

export default PermissionModal;
