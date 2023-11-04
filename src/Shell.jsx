import { Link, Outlet, useLoaderData } from "react-router-dom";

export function Shell() {
  const allCourses = useLoaderData()

  return (
    <>
      <header className="h-20 border-2 border-red-300 flex justify-between items-center px-8">
        <Link to="/">Profile</Link>
        <nav className="h-full flex flex-1 justify-center">
          <ul className="flex gap-3 items-center">
            {allCourses.map((course) => (
              <li className="border-2 border-rose-400 p-6">
                <Link to={`${course.courseId}`}>{course.pet}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
