import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./GlobalContent";
import { AssignmentListPage } from "./AssignmentListPage";
import { Zoom } from "./Zoom";
import { Syllabus } from "./Syllabus";
import { Grades } from "./Grades";
import { Announcements } from "./Announcements";
import { AssignmentPage } from "./AssignmentPage";
import { CourseLayout } from "./CourseLayout";
import "./global.css";
import { HomePage } from "./HomePage";
import { getAllCourses, getCourseAssignments, getCourseModules, getPageContent } from "./mock-database/mock-database";
import { Shell } from "./Shell";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalProvider> {/* Wrap your main component with the GlobalProvider */}
        <Shell />
      </GlobalProvider>
    ),
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
            path: "/:courseId/Announcements",
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <Announcements />
          },
          {
            path: "/:courseId/zoom",
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <Zoom />
          },
          {
            path: "/:courseId/grades",
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <Grades />
          },
          {
            path: "/:courseId/syllabus",
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <Syllabus />
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
