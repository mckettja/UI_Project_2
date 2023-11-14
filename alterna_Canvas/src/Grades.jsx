import React from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { getCourseAssignments } from "./mock-database/mock-database";
import { useMyStoreState } from "./store";

/**
 * @satisfies {import("react-router-dom").LoaderFunction}
 */
export const loader = ({ params }) => {
	if (!params.courseId) {
		return /**@type {import("./mock-database/mock-database").AssignmentItem[]} */ ([]);
	}
	return getCourseAssignments(params.courseId);
};

export const Grades = () => {
	const assignments = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	const user = useMyStoreState((state) => state.user);
	const { courseId } = useParams();

	if (typeof courseId !== "string") {
		return null;
	}

	if (assignments.length === 0) {
		return <div>No assignments</div>;
	}

	const unsubmittedAssignments = assignments.filter(
		(a) => !user.courseData[courseId].assignmentSubmissions.map((s) => s.name).includes(a.name),
	);

	return (
		<>
			<div>
				<p className="mb-2 text-2xl font-bold">Submited Assignments</p>
				<ListGroup>
					{user.courseData[courseId].assignmentSubmissions.map((submission) => (
						<ListGroup.Item key={submission.name}>
							<Link to={`../assignments/${submission.name}`} className="text-xl font-bold">
								{submission.title}
							</Link>
							<p className="float-right">
								Grade: {submission.grade || "_"} / {submission.points}
							</p>
							<p>Due at: {submission.dueDate}</p>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>

			<div>
				<p className="mb-2 text-2xl font-bold">Unsubmitted Assignments</p>
				<ListGroup>
					{unsubmittedAssignments.map((assignment) => (
						<ListGroup.Item key={assignment.name}>
							<Link to={`../assignments/${assignment.name}`} className="text-xl font-bold">
								{assignment.title}
							</Link>
							<p>Due at: {assignment.end_or_due}</p>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
		</>
	);
};
