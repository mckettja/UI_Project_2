import { useLoaderData, Link } from "react-router-dom";

export const AssignmentListPage = () => {
  const { assignments } = useLoaderData();

  console.log("fas", assignments)

  return (
    <>
      {assignments
        .toSorted((a, b) => (a.dueDate > b.dueDate ? 1 : a.title <= b.title ? -1 : 0))
        .map((assignment) => (
          <div>
            <Link to={`${assignment.slug}`} className="text-xl font-bold">{assignment.title}</Link>
            {assignment.description.split("\n").map((paragraph) => (
              <p>{paragraph}</p>
            ))}
            <p>Due at: {assignment.dueDate}</p>
          </div>
        ))}
    </>
  );
};
