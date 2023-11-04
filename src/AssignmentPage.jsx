import { useLoaderData } from "react-router-dom";

export const AssignmentPage = () => {
  const assignment = useLoaderData();

  return (
    <div>
      <p className="text-xl font-bold">{assignment.title}</p>
      {assignment.description.split("\n").map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      <p>Due at: {assignment.dueDate}</p>
      <form>
        <button className="border-0 px-4 py-2 bg-red-200 rounded-md">Submit</button>
      </form>
    </div>
  );
};
