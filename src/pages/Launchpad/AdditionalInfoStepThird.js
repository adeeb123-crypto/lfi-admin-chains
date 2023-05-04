import React from "react";
import { FormFeedback, Form, Input } from "reactstrap";
import { apiUrl } from "../../config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const AdditionalInfoStepThird = ({
	validationForThirdStep,
	onEditorChange,
	editor,
}) => {
	return (
		<React.Fragment>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validationForThirdStep.handleSubmit();
					return false;
				}}
			>
				<div>
					<div className="text-center mb-4">
						<h5>Add Additional Info</h5>
						<p className="card-title-desc">
							Let people know who you are
						</p>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									LogoURL
								</label>
								<Input
									name="logoURL"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values.logoURL ||
										""
									}
									invalid={
										validationForThirdStep.touched
											.logoURL &&
										validationForThirdStep.errors.logoURL
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.logoURL &&
								validationForThirdStep.errors.logoURL ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.logoURL}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Website
								</label>
								<Input
									name="websiteURL"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.websiteURL || ""
									}
									invalid={
										validationForThirdStep.touched
											.websiteURL &&
										validationForThirdStep.errors.websiteURL
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.websiteURL &&
								validationForThirdStep.errors.websiteURL ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.websiteURL
										}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Facebook
								</label>
								<Input
									name="facebook"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.facebook || ""
									}
									invalid={
										validationForThirdStep.touched
											.facebook &&
										validationForThirdStep.errors.facebook
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.facebook &&
								validationForThirdStep.errors.facebook ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.facebook}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Twitter
								</label>
								<Input
									name="twitter"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values.twitter ||
										""
									}
									invalid={
										validationForThirdStep.touched
											.twitter &&
										validationForThirdStep.errors.twitter
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.twitter &&
								validationForThirdStep.errors.twitter ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.twitter}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Github
								</label>
								<Input
									name="github"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values.github ||
										""
									}
									invalid={
										validationForThirdStep.touched.github &&
										validationForThirdStep.errors.github
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.github &&
								validationForThirdStep.errors.github ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.github}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Telegram
								</label>
								<Input
									name="telegram"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.telegram || ""
									}
									invalid={
										validationForThirdStep.touched
											.telegram &&
										validationForThirdStep.errors.telegram
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.telegram &&
								validationForThirdStep.errors.telegram ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.telegram}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Instagram
								</label>
								<Input
									name="instagram"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.instagram || ""
									}
									invalid={
										validationForThirdStep.touched
											.instagram &&
										validationForThirdStep.errors.instagram
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.instagram &&
								validationForThirdStep.errors.instagram ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.instagram
										}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Reddit
								</label>
								<Input
									name="reddit"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values.reddit ||
										""
									}
									invalid={
										validationForThirdStep.touched.reddit &&
										validationForThirdStep.errors.reddit
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.reddit &&
								validationForThirdStep.errors.reddit ? (
									<FormFeedback type="invalid">
										{validationForThirdStep.errors.reddit}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Project Title
								</label>
								<Input
									name="projectTitle"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.projectTitle || ""
									}
									invalid={
										validationForThirdStep.touched
											.projectTitle &&
										validationForThirdStep.errors
											.projectTitle
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.projectTitle &&
								validationForThirdStep.errors.projectTitle ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.projectTitle
										}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Project Sub Title
								</label>
								<Input
									name="projectSubTitle"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.projectSubTitle || ""
									}
									invalid={
										validationForThirdStep.touched
											.projectSubTitle &&
										validationForThirdStep.errors
											.projectSubTitle
											? true
											: false
									}
								/>
								{validationForThirdStep.touched
									.projectSubTitle &&
								validationForThirdStep.errors
									.projectSubTitle ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.projectSubTitle
										}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Main Picture URL
								</label>
								<Input
									name="mainPictureURL"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.mainPictureURL || ""
									}
									invalid={
										validationForThirdStep.touched
											.mainPictureURL &&
										validationForThirdStep.errors
											.mainPictureURL
											? true
											: false
									}
								/>
								{validationForThirdStep.touched
									.mainPictureURL &&
								validationForThirdStep.errors.mainPictureURL ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.mainPictureURL
										}
									</FormFeedback>
								) : null}
							</div>
						</div>

						<div className="col-lg-6">
							<div className="mb-3">
								<label
									htmlFor="basicpill-firstname-input"
									className="form-label"
								>
									Embedded video URL
								</label>
								<Input
									name="embeddedURL"
									type="text"
									onChange={
										validationForThirdStep.handleChange
									}
									onBlur={validationForThirdStep.handleBlur}
									value={
										validationForThirdStep.values
											.embeddedURL || ""
									}
									invalid={
										validationForThirdStep.touched
											.embeddedURL &&
										validationForThirdStep.errors
											.embeddedURL
											? true
											: false
									}
								/>
								{validationForThirdStep.touched.embeddedURL &&
								validationForThirdStep.errors.embeddedURL ? (
									<FormFeedback type="invalid">
										{
											validationForThirdStep.errors
												.embeddedURL
										}
									</FormFeedback>
								) : null}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="mb-3">
							<label
								htmlFor="basicpill-firstname-input"
								className="form-label"
							>
								About Project
							</label>
							<CKEditor
								editor={DecoupledEditor}
								config={{
									ckfinder: {
										uploadUrl: `${apiUrl}/launchpad/save_image`,
										link: {
											decorators: {
												addTargetToExternalLinks: {
													mode: "automatic",
													callback: (url) =>
														/^(https?:)?\/\//.test(
															url
														),
													attributes: {
														target: "_blank",
														rel: "noopener noreferrer",
													},
												},
											},
										},
									},
									// plugins: [ Link ],
								}}
								data={validationForThirdStep.values.description}
								onReady={(editor) => {
									editor.ui
										.getEditableElement()
										.parentElement.insertBefore(
											editor.ui.view.toolbar.element,
											editor.ui.getEditableElement()
										);
									editor = editor;
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									onEditorChange(data);
								}}
							/>
						</div>
					</div>
				</div>
			</Form>
		</React.Fragment>
	);
};

export default AdditionalInfoStepThird;
