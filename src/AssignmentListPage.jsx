import React from "react"
import { useLoaderData, Link, useParams } from "react-router-dom"
import { getCourseAssignments } from "./mock-database/mock-database"
import { useMyStoreState } from "./store"
import { Accordion, ListGroup } from "react-bootstrap"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

function compareAssignments(a, b) {
	const dateA = dayjs(a.end_or_due, "M/D/YYYY")
	const dateB = dayjs(b.end_or_due, "M/D/YYYY")

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
	const currentDate = useMyStoreState((state) => state.currentDate)
	const { courseId } = useParams()

	if (typeof courseId !== "string") {
		return null
	}

	if (assignments.length === 0) {
		return <div>No assignments</div>
	}

	console.log("AS", assignments)

	const submittedAssignments = assignments.filter(
		(a) => user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(a.name),
	)

	const unSubmittedAssignments = assignments.filter(
		(a) => !user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(a.name),
	)

	const upcomingAssignments = unSubmittedAssignments.filter((a) => dayjs(a.end_or_due, "M/D/YYYY") >= currentDate)

	const overDueAssignments = unSubmittedAssignments.filter((a) => dayjs(a.end_or_due, "M/D/YYYY") < currentDate)

	return (
		<>
			<Accordion defaultActiveKey={["0"]}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Upcoming assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{upcomingAssignments.sort(compareAssignments).map((assignment) => (
								<ListGroup.Item key={assignment.name}>
									<AssignmentListItem assignment={assignment} />
								</ListGroup.Item>
							))}
						</ListGroup>
					</AccordionBody>
				</Accordion.Item>
			</Accordion>

			<Accordion defaultActiveKey={["0"]} alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Overdue assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{overDueAssignments.sort(compareAssignments).map((assignment) => (
								<ListGroup.Item key={assignment.name}>
									<AssignmentListItem assignment={assignment} />
								</ListGroup.Item>
							))}
						</ListGroup>
					</AccordionBody>
				</Accordion.Item>
			</Accordion>

			<Accordion defaultActiveKey={["0"]}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Submitted assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{submittedAssignments.sort(compareAssignments).map((assignment) => (
								<ListGroup.Item key={assignment.name}>
									<AssignmentListItem assignment={assignment} />
								</ListGroup.Item>
							))}
						</ListGroup>
					</AccordionBody>
				</Accordion.Item>
			</Accordion>
		</>
	)
}

/**
 * @typedef {Object} AssignmentListItemProps
 * @property {import("./mock-database/mock-database").AssignmentItem} assignment
 */

/**
 * @param {AssignmentListItemProps} props
 */
const AssignmentListItem = ({ assignment }) => {
	return (
		<>
			<Link to={`${assignment.name}`} className="relative text-xl font-bold">
				{assignment.type === "exams" ? "🎓" : "✏️"} {assignment.title}
			</Link>
			<p className="absolute right-3 top-2 rounded-2xl border-2 border-orange-600 px-2 py-1 text-xs text-orange-600">Graded</p>
			<p>Due at: {assignment.end_or_due}</p>
		</>
	)
}
