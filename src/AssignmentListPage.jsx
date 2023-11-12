import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getCourseAssignments } from "./mock-database/mock-database";

/**
 * @satisfies {import("react-router-dom").LoaderFunction}
 */
export const loader = ({params}) => {
  if (!params.courseId) {
    return /**@type {import("./mock-database/mock-database").AssignmentItem[]} */ ([])
  }
  return getCourseAssignments(params.courseId)
}

export const AssignmentListPage = () => {
  const assignments = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())

  if (assignments.length === 0) {
    return <div>No assignments</div>
  }

  return (
    <>
      {assignments
        .sort((a, b) => (a.end_or_due > b.end_or_due ? 1 : a.title <= b.title ? -1 : 0))
        .map((assignment) => (
          <div>
            <Link to={`${assignment.name}`} className="text-xl font-bold">{assignment.title}</Link>
            <p>Due at: {assignment.end_or_due}</p>
          </div>
        ))}
    </>
  );
};
