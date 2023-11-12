import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "./GlobalContent";
import { getPageContent } from "./mock-database/mock-database";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';




/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.assignmentName) {
		return "";
	}

	return getPageContent(params.courseId, params.assignmentName);
};

export const AssignmentPage = () => {
	const htmlContent = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	const { treatNum, updateTreatNum } = useGlobalContext();
	const [showModal, setShowModal] = useState(false);
	const [activeTab, setActiveTab] = useState("upload");

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

	const handleSubmitModal = () => {
		const newTreatNum = treatNum + 5;
		updateTreatNum(newTreatNum);
		setShowModal(false);
	};

	return (
		<div>
		  <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="page w-auto"></div>
		  <form onSubmit={handleFormSubmit}>
			<button
			  type="submit"
			  className="rounded-md border-0 bg-red-200 px-4 py-2"
			>
			  Upload for Submission
			</button>
		  </form>
	
		  {/* Modal */}
		  <Modal show={showModal} onHide={handleCloseModal}>
			<Modal.Header closeButton>
			  <Modal.Title>Submission Page</Modal.Title>
			</Modal.Header>
	
			<Modal.Body>
			  <Tabs
				defaultActiveKey={activeTab}
				id="assignment-tabs"
				onSelect={(key) => setActiveTab(key)}
				className="mb-3"
			  >
				<Tab eventKey="upload" title="Upload">
				  <p>Uploading Documents will be added at a future date</p>
				</Tab>
				<Tab eventKey="text" title="Text">
				  <TextControlsExample />
				</Tab>
			  </Tabs>
			</Modal.Body>
	
			<Modal.Footer>
			  <Button variant="primary" onClick={handleSubmitModal} className="no-hover-effect">
				Submit
			  </Button>
			  <Button variant="secondary" onClick={handleCloseModal}>
				Close
			  </Button>
			</Modal.Footer>
		  </Modal>
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
