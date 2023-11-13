import React from "react"
import { useLoaderData, Link, useParams } from "react-router-dom"
import { getCourseAssignments } from "./mock-database/mock-database"
import { useMyStoreState } from "./store"
import { Accordion, ListGroup } from "react-bootstrap"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

/**
 *
 * @param {import("./mock-database/mock-database").AssignmentItem} a
 * @param {import("./mock-database/mock-database").AssignmentItem} b
 */
function compareAssignments(a, b) {
	const dateA = dayjs(a.end_or_due, "M/D/YYYY");
  const dateB = dayjs(b.end_or_due, "M/D/YYYY");

	// Compare by date first
	if (dateA < dateB) {
		return -1
	} else if (dateA > dateB) {
		return 1
	} else {
		// If end_or_due is equal, compare by title
		if (a.title < b.title) {
			return -1
		} else if (a.title > b.title) {
			return 1
		} else {
			return 0 // Objects are equal
		}
	}
}

/**
 * @satisfies {import("react-router-dom").LoaderFunction}
 */
export const loader = ({ params }) => {
	if (!params.courseId) {
		return /**@type {import("./mock-database/mock-database").AssignmentItem[]} */ ([])
	}
	return getCourseAssignments(params.courseId)
}

export const AssignmentListPage = () => {
	const assignments = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	const user = useMyStoreState((state) => state.user)
	const { courseId } = useParams()

	if (typeof courseId !== "string") {
		return null
	}

	if (assignments.length === 0) {
		return <div>No assignments</div>
	}

	const submittedAssignments = assignments.filter((a) =>
		user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(a.name),
	)
	const unSubmittedAssignments = assignments.filter(
		(a) => !user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(a.name),
	)

	return (
		<>
			<Accordion defaultActiveKey={["0"]} alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Upcoming assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{unSubmittedAssignments.sort(compareAssignments).map((assignment) => (
								<ListGroup.Item key={assignment.name}>
									<Link to={`${assignment.name}`} className="text-xl font-bold">
										{assignment.title}
									</Link>
									<p>Due at: {assignment.end_or_due}</p>
								</ListGroup.Item>
							))}
						</ListGroup>
					</AccordionBody>
				</Accordion.Item>
			</Accordion>

			<Accordion defaultActiveKey={["0"]} alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Submitted assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{submittedAssignments
								.sort(compareAssignments)
								.map((assignment) => (
									<ListGroup.Item key={assignment.name}>
										<Link to={`${assignment.name}`} className="text-xl font-bold">
											{assignment.title}
										</Link>
										<p>Due at: {assignment.end_or_due}</p>
									</ListGroup.Item>
								))}
						</ListGroup>
					</AccordionBody>
				</Accordion.Item>
			</Accordion>
		</>
	)
}
