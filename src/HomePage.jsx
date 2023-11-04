import { Link, useLoaderData } from "react-router-dom";

export const HomagePage = () => {
  const { modules, assignments } = useLoaderData();

  return (
    <main className="grid grid-cols-[7%_1fr_20%] px-8">
      <nav>
        <ul className="flex flex-col gap-3 py-6">
          {["Home", "Groups", "Inbox", "Assignments", "Grades", "Syllabus"].map((tabName) => (
            <li className="hover:font-bold hover:underline">
              <Link to={`${""}`}>{tabName}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div></div>
      <aside className="border-2 border-orange-700">
        <ul>
          <li className="h-16">
            <Link to="">Homework Item</Link>
          </li>
          <li className="h-16">
            <Link to="">Homework Item</Link>
          </li>
          <li className="h-16">
            <Link to="">Homework Item</Link>
          </li>
        </ul>
      </aside>
    </main>
  );
};
