import { useLoaderData } from "react-router-dom";

export const AssignmentPage = () => {
  const { assignments } = useLoaderData();

  return (
    <>
      {assignments
        .toSorted((a, b) => (a.dueDate > b.dueDate ? 1 : a.title <= b.title ? -1 : 0))
        .map((assignment) => (
          <div>
            <p className="text-xl font-bold">{assignment.title}</p>
            {assignment.description.split("\n").map((paragraph) => (
              <p>{paragraph}</p>
            ))}
            <p>Due at: {assignment.dueDate}</p>
          </div>
        ))}
    </>
  );
};
