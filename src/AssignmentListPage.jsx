import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getCourseAssignments } from "./mock-database/mock-database";
import { useMyStoreState } from "./store";
import { Accordion, ListGroup } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

/**
 * @satisfies {import("react-router-dom").LoaderFunction}
 */
export const loader = ({ params }) => {
	if (!params.courseId) {
		return /**@type {import("./mock-database/mock-database").AssignmentItem[]} */ ([]);
	}
	return getCourseAssignments(params.courseId);
};

export const AssignmentListPage = () => {
	const assignments = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	const user = useMyStoreState((state) => state.user);

	if (assignments.length === 0) {
		return <div>No assignments</div>;
	}

	const submittedAssignments = assignments.filter((a) => user.assignmentSubmissions.map((s) => s.name).includes(a.name));
	const unSubmittedAssignments = assignments.filter((a) => !user.assignmentSubmissions.map((s) => s.name).includes(a.name));

	return (
		<>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Upcoming assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{unSubmittedAssignments
								.sort((a, b) => (a.end_or_due > b.end_or_due ? 1 : a.title <= b.title ? -1 : 0))
								.map((assignment) => (
									<ListGroup.Item>
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

      <Accordion defaultActiveKey={['0']} alwaysOpen>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Submitted assignments</Accordion.Header>
					<AccordionBody>
						<ListGroup>
							{submittedAssignments
								.sort((a, b) => (a.end_or_due > b.end_or_due ? 1 : a.title <= b.title ? -1 : 0))
								.map((assignment) => (
									<ListGroup.Item>
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
	);
};

