import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "./GlobalContent";
import { getPageContent } from "./mock-database/mock-database";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";

import { useMyStoreActions, useMyStoreState } from "./store";

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.assignmentName) {
		return null;
	}

	return getPageContent(params.courseId, params.assignmentName);
};

export const AssignmentPage = () => {
	const data = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	const submitAssignment = useMyStoreActions((actions) => actions.submitAssignment);
	const user = useMyStoreState((state) => state.user);
	const { treatNum, updateTreatNum } = useGlobalContext();
	const [showModal, setShowModal] = useState(false);
	const [activeTab, setActiveTab] = useState("upload");
	const [textSubmission, setTextSubmission] = useState("");

	if (!data) {
		return null;
	}

	const isAssignmentSubmitted = user.assignmentSubmissions.map((s) => s.name).includes(data.item.name);

	/**
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event
	 */
	const handleFormSubmit = (event) => {
		event.preventDefault(); // Prevent the button from reloading the page
		setShowModal(true); // Show the modal on form submission
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSubmitAssignment = () => {
		const newTreatNum = treatNum + 5;
		submitAssignment({ assignment: /** @type {import("./store").AssignmentItem} */ (data.item), content: [textSubmission] });
		updateTreatNum(newTreatNum);
		setShowModal(false);
	};

	return (
		<div>
			{!isAssignmentSubmitted && (
				<>
					<button type="button" className="rounded-md border-0 bg-red-200 px-4 py-2" onClick={() => setShowModal(true)}>
						Start Submission
					</button>
					<Modal show={showModal} onHide={handleCloseModal}>
						<Modal.Header closeButton>
							<Modal.Title>Submission Page</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Tabs defaultActiveKey={activeTab} id="assignment-tabs" onSelect={(key) => setActiveTab(key)} className="mb-3">
								<Tab eventKey="upload" title="Upload">
									<p>Uploading Documents will be added at a future date</p>
								</Tab>
								<Tab eventKey="text" title="Text">
									<Form>
										<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
											<Form.Label>Text Submission</Form.Label>
											<Form.Control as="textarea" rows={3} value={textSubmission} onChange={(e) => setTextSubmission(e.target.value)} />
										</Form.Group>
									</Form>
								</Tab>
							</Tabs>
						</Modal.Body>

						<Modal.Footer>
							<Button variant="primary" onClick={handleSubmitAssignment} className="no-hover-effect text-black">
								Submit
							</Button>
							<Button variant="danger" onClick={() => setShowModal(false)} className="text-black">
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			)}
			{isAssignmentSubmitted && (
				<button type="button" className="cursor-not-allowed rounded-md border-0 bg-gray-400 px-4 py-2" disabled>
					Submitted
				</button>
			)}
			<div dangerouslySetInnerHTML={{ __html: data.content }} className="page w-auto"></div>
		</div>
	);
};

// TextControlsExample component
function TextControlsExample() {
	return (
		<Form>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Text Submission</Form.Label>
				<Form.Control as="textarea" rows={3} />
			</Form.Group>
		</Form>
	);
}
