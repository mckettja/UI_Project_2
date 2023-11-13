import { Link, Outlet, useLoaderData } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export function Shell() {
  const allCourses = useLoaderData()

  return (
    <>
      <header className="flex justify-between items-center px-8">
        <Link to="/">Profile</Link>
        <NavBar courseList={allCourses} />
      </header>
      <Outlet />
    </>
  );
}
