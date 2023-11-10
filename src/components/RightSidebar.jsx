import { Link } from "react-router-dom";

export const RightSidebar = ({ assignmentList }) => {
  return (
    <aside className="py-6 border-2 border-orange-700 w-72">
      <ul>
        {assignmentList.map((assignment) => (
          <li className="h-16">
            <Link to={`assignments/${assignment.slug}`}>{assignment.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
