import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Shell } from "./Shell";
import "./global.css";
import { HomePage } from "./HomePage";
import { getAllCourses, getCourseData } from "./mock-database/mock-database";
import { CourseLayout } from "./CourseLayout";
import { AssignmentListPage } from "./AssignmentListPage";
import { AssignmentPage } from "./AssignmentPage";

const courseInfoLoader = (courseId, tabName) => {
  const data = getCourseData(courseId);
  if (!data) return null;
  return { [tabName]: data[tabName] };
};

const assignmentLoader = (courseId, assignmentSlug) => {
  const data = getCourseData(courseId);
  if (!data) return null;
  return data.assignments.filter((as) => as.slug === assignmentSlug)[0] ?? null;
};

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
        loader: ({ params }) => courseInfoLoader(params.courseId, "assignments"),
        element: <CourseLayout />,
        children: [
          {
            path: "/:courseId",
            index: true,
            loader: ({ params }) => courseInfoLoader(params.courseId, "modules"),
            element: <HomePage />
          },
          {
            path: "/:courseId/assignments",
            loader: ({ params }) => courseInfoLoader(params.courseId, "assignments"),
            element: <AssignmentListPage />
          },
          {
            path: "/:courseId/assignments/:assignmentSlug",
            loader: ({ params }) => assignmentLoader(params.courseId, params.assignmentSlug),
            element: <AssignmentPage />
          },
          {
            path: "/:courseId/pages/:pageId",
            element: <div>This is a page from module</div>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
