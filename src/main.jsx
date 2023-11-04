import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Shell } from "./Shell";
import "./global.css";
import { HomagePage } from "./HomePage";
import { getAllCourses, getCourseData } from "./mock-database/mock-database";

const homePageLoader = (courseId) => {
  const data = getCourseData(courseId)
  return {modules: data.modules, assignments: data.assignments}
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    loader: () => getAllCourses(),
    children: [
      {
        path: "/",
        index: true,
        element: <div className="text-center p-8">Please select a course on the navbar to get started</div>
      },
      {
        path: "/:courseId",
        loader: ({params}) => homePageLoader(params.courseId),
        element: <HomagePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
