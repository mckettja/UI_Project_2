import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { RightSidebar } from "./components/RightSidebar";

export const CourseLayout = () => {
  const { assignments } = useLoaderData();

  return (
    <main className="grid grid-cols-[7%_1fr_auto] px-8 gap-12">
      <nav>
        <ul className="flex flex-col gap-3 py-6">
          {["Modules", "Assignments", "Syllabus", "Grades", "Zoom", "Announcements"].map((tabName) => (
            <li className="hover:font-bold hover:underline">
              <NavLink
                end
                to={`${tabName === "Modules" ? "" : tabName.toLowerCase()}`}
                className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
              >
                {tabName}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-24 py-6 flex gap-6 flex-col">
        <Outlet />
      </div>
      <RightSidebar assignmentList={assignments} />
    </main>
  );
};
