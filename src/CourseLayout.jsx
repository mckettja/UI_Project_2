import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";

export const CourseLayout = () => {
  const { assignments } = useLoaderData();

  return (
    <main className="grid grid-cols-[7%_1fr_20%] px-8 gap-12">
      <nav>
        <ul className="flex flex-col gap-3 py-6">
          {["Home", "Groups", "Inbox", "Assignments", "Grades", "Syllabus"].map((tabName) => (
            <li className="hover:font-bold hover:underline">
              <NavLink
                to={`${tabName === "Home" ? "" : tabName.toLowerCase()}`}
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
      <aside className="py-6 border-2 border-orange-700">
        <ul>
          {assignments.map((assignment) => (
            <li className="h-16">
              <Link to="">{assignment.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
};
