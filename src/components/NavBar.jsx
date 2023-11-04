import { Link } from "react-router-dom";

export const NavBar = ({ courseList }) => {
  return (
    <nav className="h-full flex flex-1 justify-center border-2 border-purple-500">
      <ul className="flex gap-3 items-center">
        {courseList.map((course) => (
          <li className="border-2 border-rose-400 p-6">
            <Link to={`${course.courseId}`}>{course.pet}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
