import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { useLoaderData, useParams } from "react-router-dom"
import { getPageContent } from "./mock-database/mock-database"

import { useMyStoreActions, useMyStoreState } from "./store"
import dayjs from "dayjs"

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.assignmentName) {
		return null
	}

	return getPageContent(params.courseId, params.assignmentName)
}

export const AssignmentPage = () => {
	const data = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	const submitAssignment = useMyStoreActions((actions) => actions.submitAssignment)
	const user = useMyStoreState((state) => state.user)
	const currentDate = useMyStoreState((state) => state.currentDate)
	const changeTreat = useMyStoreActions((actions) => actions.changeTreat)
	const [showModal, setShowModal] = useState(false)
	const [activeTab, setActiveTab] = useState("upload")
	const [textSubmission, setTextSubmission] = useState("")
	const { courseId } = useParams()

	if (!data || !courseId) {
		return null
	}

	const isAssignmentSubmitted = user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(data.item.name)

	const handleSubmitAssignment = () => {
		const assignmentItem = /** @type {import("./store").AssignmentItem} */ (data.item)
		submitAssignment({
			assignment: assignmentItem,
			content: [textSubmission],
			courseId: courseId,
		})
		const earlyBonus =
			dayjs(assignmentItem.end_or_due) > currentDate ? dayjs(assignmentItem.end_or_due).diff(currentDate, "day") : 0
		const overdueCompensation =
			dayjs(assignmentItem.end_or_due) < currentDate ? Math.floor(currentDate.diff(assignmentItem.end_or_due, "day") / 2) : 0
		changeTreat({ courseId: courseId, changeFunction: (t) => Math.min(t + 5 + earlyBonus + overdueCompensation, 100) })
		setShowModal(false)
	}

	return (
		<div>
			<h2 className="font-bold text-2xl mb-4">{data.item.title}</h2>
			{!isAssignmentSubmitted && (
				<>
					<button type="button" className="rounded-md border-0 bg-red-200 px-4 py-2" onClick={() => setShowModal(true)}>
						Start Submission
					</button>
					<Modal show={showModal} onHide={() => setShowModal(false)}>
						<Modal.Header closeButton>
							<Modal.Title>Submission Page</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Tabs
								defaultActiveKey={activeTab}
								id="assignment-tabs"
								onSelect={(key) => setActiveTab(key || "text")}
								className="mb-3"
							>
								<Tab eventKey="upload" title="Upload">
									<p>Uploading Documents will be added at a future date</p>
								</Tab>
								<Tab eventKey="text" title="Text">
									<Form>
										<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
											<Form.Label>Text Submission</Form.Label>
											<Form.Control
												as="textarea"
												rows={3}
												value={textSubmission}
												onChange={(e) => setTextSubmission(e.target.value)}
											/>
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
	)
}
