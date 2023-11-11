import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AssignmentListPage } from "./AssignmentListPage";
import { AssignmentPage } from "./AssignmentPage";
import { CourseLayout } from "./CourseLayout";
import "./global.css";
import { HomePage } from "./HomePage";
import { getAllCourses, getCourseAssignments, getCourseData, getCourseModules, getPageContent } from "./mock-database/mock-database";
import { Shell } from "./Shell";

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
        loader: ({ params }) => getCourseAssignments(params.courseId),
        element: <CourseLayout />,
        children: [
          {
            path: "/:courseId",
            index: true,
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <HomePage />
          },
          {
            path: "/:courseId/assignments",
            loader: ({ params }) => getCourseAssignments(params.courseId),
            element: <AssignmentListPage />
          },
          {
            path: "/:courseId/assignments/:assignmentName",
            loader: ({ params }) => getPageContent(params.courseId, params.assignmentName),
            element: <AssignmentPage />
          },
          {
            path: "/:courseId/pages/:pageName",
            loader: ({ params }) => getPageContent(params.courseId, params.pageName),
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
